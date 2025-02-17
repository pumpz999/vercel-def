import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  const { walletAddress, email } = req.body

  try {
    let user = await User.findOne({ walletAddress })
    
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new User({ walletAddress, email })
    await user.save()

    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(201).json({ token, user })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
