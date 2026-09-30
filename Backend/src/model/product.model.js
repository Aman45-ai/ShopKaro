import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    image:{
        type:String,
        required:[true, "Image is required!"]
    },
    title:{
        type: String,
        required:[true, "Title is required!"],
        minlength:[3, "Title must be of 3 characters!"]
    },
    description:{
        type: String,
        required:[true, "Description is required!"],
        minlength:[20, "Description must be of 20 characters!"]
    },
    price:{
        type:Number,
        required:[true, "Price is required!"],
         min:[1,"Price must be greater than 0"]
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true,"Owner is required!"]
    }
})

const product = mongoose.model("Product",productSchema)

export default product