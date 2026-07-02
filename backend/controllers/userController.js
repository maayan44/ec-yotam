import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const GENERIC_ERROR = "אירעה שגיאה, אנא נסה שוב מאוחר יותר"
const LOGIN_FAILED = "אימייל או סיסמה שגויים"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' }) // Every user logout after 30d
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: LOGIN_FAILED })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: LOGIN_FAILED })
        }

        if (!user.isApproved) {
            return res.json({ success: false, message: "בקשת ההצטרפות שלך התקבלה ונמצאת בבדיקה. תוכל להתחבר לאחר אישור הצוות. לבירורים צור קשר איתנו." })
        }

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, businessName, businessAddress, city } = req.body;

        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "משתמש עם אימייל זה כבר קיים במערכת" })
        }

        const phoneExists = await userModel.findOne({ phone })
        if (phoneExists) {
            return res.json({ success: false, message: "מספר טלפון זה כבר רשום במערכת" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "נא להזין כתובת אימייל תקינה" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "הסיסמה חייבת להכיל לפחות 8 תווים" })
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.json({ success: false, message: "מספר הטלפון חייב להכיל בדיוק 10 ספרות" })
        }

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

        res.json({ success: true })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "אימייל או סיסמה שגויים" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

// Get all users (admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password')
        res.json({ success: true, users })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

// Approve user (admin)
const approveUser = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.body.userId, { isApproved: true })
        res.json({ success: true, message: "המשתמש אושר בהצלחה" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

// Reject/delete user (admin)
const rejectUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.body.userId)
        res.json({ success: true, message: "המשתמש נדחה והוסר מהמערכת" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: GENERIC_ERROR })
    }
}

export { loginUser, registerUser, adminLogin, getAllUsers, approveUser, rejectUser }