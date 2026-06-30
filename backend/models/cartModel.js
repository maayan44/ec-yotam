import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: { type: Object, default: {} } // { itemId: { size: quantity } }
}, { minimize: false })

const cartModel = mongoose.models.cart || mongoose.model('cart', cartSchema);

export default cartModel