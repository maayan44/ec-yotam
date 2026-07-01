import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'
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

// Permissions Policy
app.use((req, res, next) => {
    res.setHeader(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), payment=()'
    )
    next()
})

// CORS
const allowedOrigins = [
    'https://interproduct.co.il',
    'https://www.interproduct.co.il',
    'https://admin.interproduct.co.il',
    process.env.DEV_ORIGIN,
].filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}))

// Body Parser
app.use(express.json({ limit: '10kb' }))

// Rate Limiters
// Strict limiter for auth endpoints — prevents brute-force and registration spam
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                   // 10 attempts per window
    message: { success: false, message: 'יותר מדי ניסיונות, נסה שוב בעוד 15 דקות' },
    standardHeaders: true,
    legacyHeaders: false,
})

// Moderate limiter for order placement — prevents order flooding
const orderLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 4,                   // 4 orders per hour per IP
    message: { success: false, message: 'יותר מדי הזמנות, נסה שוב מאוחר יותר' },
    standardHeaders: true,
    legacyHeaders: false,
})

// API Routes
app.use('/api/user', authLimiter, userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order/place', orderLimiter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

// Start Server
app.listen(port, () => console.log('Server started on PORT : ' + port))