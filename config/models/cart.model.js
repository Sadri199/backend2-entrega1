import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: { 
        type : Array ,
        default : [] }
}, { timestamps: true })

export const Cart = mongoose.model("Cart", cartSchema)