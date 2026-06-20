import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'
import { connect } from 'mongoose'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Security Headers
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'none'"],
                frameAncestors: ["'none'"],
            },
        },
        referrerPolicy: { policy: 'no-referrer' },
        strictTransportSecurity: {
            maxAge: 31536000,
            includeSubDomains: true,
        },
        xFrameOptions: { action: 'deny' },
    })
)

// Permissions-Policy (not included in Helmet by default — set manually)
app.use((req, res, next) => {
    res.setHeader(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), payment=()'
    )
    next()
})

// Middlewares
app.use(express.json())
app.use(cors())

// Api Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log('Server started on PORT : ' + port))