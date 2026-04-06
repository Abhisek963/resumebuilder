import express from 'express';
import {
  getUserById,
  loginUser,
  getUserResumes,
  registerUser,
  forgotPassword,
  resetPassword
} from '../controllers/UserController.js';
import protect from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUserById)
userRouter.get('/resumes', protect, getUserResumes)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password', resetPassword)

export default userRouter