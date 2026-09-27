import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Email is required!"],
        minlength: [3, "Name must be of atleast 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email already exists."],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valide email"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    refreshToken: {
        type: String
    }
})

const user = mongoose.model("User", userSchema)

export default user