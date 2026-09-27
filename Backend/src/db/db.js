import mongoose from 'mongoose'
import config from '../config/config.js'

const connectDB = async() => {
    try{
        await mongoose.connect(config.MONGO_URI)
        console.log("Connection Established with Database Successfully")
    }catch(error){
        console.log("Error in Connecting with Database",error)
    }
}

export default connectDB