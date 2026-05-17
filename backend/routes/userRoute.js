import express from 'express';
import { loginUser, registerUser, adminLogin, getAllUsers, approveUser, rejectUser } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

// Admin user management routes
userRouter.get('/list', adminAuth, getAllUsers)
userRouter.post('/approve', adminAuth, approveUser)
userRouter.post('/reject', adminAuth, rejectUser)

export default userRouter;