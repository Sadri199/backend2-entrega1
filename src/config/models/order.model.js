import mongoose from "mongoose"

const orderProductSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, 
        ref: "Product"},
    title: {type: String, 
        required: true},
    productQuantity: {type: Number, 
        required: true, 
        min: 1},
    unitPrice: {type: Number, 
        required: true,
        min: 1}
}, {_id: false})

const orderSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    products: {
        type: [orderProductSchema],
        default: []
    },
    totalPrice: {
        type: Number,
        min: 0,
        default: 0
    },
    status:{
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
        index: true
    }
}, {timestamps: true})

orderSchema.pre("validate", function (){
    const products = Array.isArray(this.products) ? this.products : []
    this.totalPrice = products.reduce((acc, item) => 
    acc + (Number(item.productQuantity || 0) * Number(item.unitPrice || 0))
    , 0)
})

orderSchema.pre("findOneAndUpdate", function (){
    const update = this.getUpdate() || {}
    if(update.products) {
        const products = Array.isArray(update.products) ? update.products : []
        update.totalPrice = products.reduce((acc, item) =>
        acc + (Number(item.productQuantity || 0)) * Number(item.unitPrice || 0)
        ,0)
        this.setUpdate(update)
    }
})

export const Order = mongoose.model("Order", orderSchema)