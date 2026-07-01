import mongoose from "mongoose";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

    // Ensure indexes on frequently queried fields
    // createIndex is idempotent — safe to run on every startup
    await productModel.collection.createIndex({ category: 1 })
    await productModel.collection.createIndex({ date: -1 })
    await orderModel.collection.createIndex({ userId: 1 })

    console.log("Indexes ensured")
}

export default connectDB;