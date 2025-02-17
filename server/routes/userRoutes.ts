import express from 'express'
import { registerUser } from '../controllers/userController'
import authMiddleware from '../middleware/authMiddleware'
import User from '../models/User'

const router = express.Router()

router.post('/register', registerUser)
router.get('/profile', authMiddleware, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
