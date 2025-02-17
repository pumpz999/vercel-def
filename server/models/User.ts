import mongoose from 'mongoose'

interface IUser extends mongoose.Document {
  walletAddress: string;
  email?: string;
  portfolioValue: number;
  investments: Array<{
    token: string;
    amount: number;
    value: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
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
}, { 
  timestamps: true 
})

export default mongoose.model<IUser>('User', UserSchema)
