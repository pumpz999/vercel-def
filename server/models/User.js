import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  portfolioValue: {
    type: Number,
    default: 0
  },
  investments: [{
    token: String,
    amount: Number,
    value: Number
  }]
}, { timestamps: true })

export default mongoose.model('User', UserSchema)
