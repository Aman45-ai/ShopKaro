import { Router } from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import addToCart from "../controller/cart.controller.js"

const cartRouter = Router()

cartRouter.post('/cart:id', authMiddleware, addToCart)

export default cartRouter