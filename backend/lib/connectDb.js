import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("Connected to DB")
  } catch (error) {
    console.log("error while connecting to DB", error)
  }
}

export default connectToDb
