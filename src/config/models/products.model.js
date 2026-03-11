import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        min: [1, "Must be 1 or higher!"],
        required: true
    },
    status:{
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        min: [0, "Must be 0 or higher!"],
        required: true
    },
    category: {
        type: String,
        default: "Parts",
        enum: ["Parts", "Food", "Misc."],
        required: true
    },
    thumbnail: {
        type: Array,
        default: ""
    }
})

export const Product = mongoose.model("Product", productSchema)