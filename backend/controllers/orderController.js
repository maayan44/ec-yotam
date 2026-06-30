import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import sendOrderEmail from "../utils/sendEmail.js";

// Place Order
// Called when a user submits an order from the frontend.
// Saves the order, clears the user's cart, and sends an email notification to admin.
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        await sendOrderEmail({ items, amount, address })

        res.json({ success: true, message: "ההזמנה התקבלה בהצלחה" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// All Orders (Admin)
// Returns all orders in the system. Used by the admin panel Orders page.
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// User Orders (Frontend)
// Returns all orders belonging to the logged-in user. Used by the Orders page.
const userOrders = async (req, res) => {
    try {
        const { userId } = req.query
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update Order Status (Admin)
// Updates the delivery status of an order. Called from the admin Orders page dropdown.
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Delete Order (Admin)
// Permanently removes an order from the database. Called from the admin Orders page.
const deleteOrder = async (req, res) => {
    try {
        await orderModel.findByIdAndDelete(req.body.orderId)
        res.json({ success: true, message: "ההזמנה בוטלה בהצלחה" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, allOrders, userOrders, updateStatus, deleteOrder }