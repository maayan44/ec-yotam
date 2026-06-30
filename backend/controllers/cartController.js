import cartModel from "../models/cartModel.js"

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body

        let cart = await cartModel.findOne({ userId })
        if (!cart) {
            cart = new cartModel({ userId, items: {} })
        }

        if (cart.items[itemId]) {
            if (cart.items[itemId][size]) {
                cart.items[itemId][size] += 1
            } else {
                cart.items[itemId][size] = 1
            }
        } else {
            cart.items[itemId] = {}
            cart.items[itemId][size] = 1
        }

        cart.markModified('items')
        await cart.save()

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body

        const cart = await cartModel.findOne({ userId })
        if (!cart) {
            return res.json({ success: false, message: "Cart not found" })
        }

        cart.items[itemId][size] = quantity
        cart.markModified('items')
        await cart.save()

        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.query

        const cart = await cartModel.findOne({ userId })
        res.json({ success: true, cartData: cart ? cart.items : {} })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart }