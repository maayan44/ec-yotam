import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "אימייל או סיסמה שגויים" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "אימייל או סיסמה שגויים" })
        }

        // Check if account is approved
        if (!user.isApproved) {
            return res.json({ success: false, message: "החשבון ממתין לאישור מנהל. נא לנסות שוב מאוחר יותר." })
        }

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, businessName, businessAddress, city } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "משתמש עם אימייל זה כבר קיים" })
        }

        // Check if phone already registered
        const phoneExists = await userModel.findOne({ phone })
        if (phoneExists) {
            return res.json({ success: false, message: "מספר טלפון זה כבר רשום במערכת" })
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "נא להזין כתובת אימייל תקינה" })
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "הסיסמה חייבת להכיל לפחות 8 תווים" })
        }

        // Validate phone — 10 digits only
        if (!/^\d{10}$/.test(phone)) {
            return res.json({ success: false, message: "מספר הטלפון חייב להכיל בדיוק 10 ספרות" })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            businessName,
            businessAddress,
            city,
            isApproved: false
        })

        await newUser.save()

        // Don't return token — user must wait for approval
        res.json({ success: true, message: "ההרשמה הושלמה! החשבון ממתין לאישור מנהל." })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "אימייל או סיסמה שגויים" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Get all users (admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password')
        res.json({ success: true, users })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Approve user (admin)
const approveUser = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.body.userId, { isApproved: true })
        res.json({ success: true, message: "המשתמש אושר בהצלחה" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Reject/delete user (admin)
const rejectUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.body.userId)
        res.json({ success: true, message: "המשתמש נדחה והוסר מהמערכת" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, adminLogin, getAllUsers, approveUser, rejectUser }