import mongoose from "mongoose"
import isEmail from 'validator/lib/isEmail'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [ isEmail, 'Invalid email format!' ]
    },
    age: {
        type: Number,
        default: 18
    },
    password: {
        type: String,
        required: true
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)