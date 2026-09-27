import express from 'express'
import connectDB from './db/db.js'
import router from './routes/auth.routes.js'
import productRouter from './routes/product.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
connectDB()

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
  "http://localhost:5173",
  "https://shopkaro-snowy-xi.vercel.app"
]

app.use(cors({
  origin:allowedOrigins,
  credentials:true
}))

app.use('/uploads', express.static('uploads'))

app.use('/api/auth',router)
app.use('/api',productRouter)

export default app