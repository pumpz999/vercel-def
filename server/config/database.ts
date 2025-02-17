import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB Connected Successfully')
  } catch (error) {
    console.error('MongoDB Connection Error:', error)
    process.exit(1)
  }
}

export default connectDB
