import mongoose from "mongoose"

// https://www.slingacademy.com/article/how-to-create-auto-incrementing-field-in-mongoose/

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
        required: true,
        unique: true
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
        required: true
    },
    thumbnail: {
        type: Array,
        default: ""
    }
})

export const Product = mongoose.model("Product", productSchema)