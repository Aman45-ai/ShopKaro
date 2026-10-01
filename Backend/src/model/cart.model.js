import mongoose from "mongoose"

const cartModel = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: {
            value: true,
            message:"ProductId is required!"
        },
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: {
            value: true,
            message:"UserId is required!"
        },
    },
    quantity:{
        type: Number,
        required:{
            value:true,
            message: "Quantity is required!"
        }
    }
})

const cart = mongoose.model("Cart",cartModel)

export default cart