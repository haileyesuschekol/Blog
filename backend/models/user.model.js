import mongoose, { model } from "mongoose"
import { Schema } from "mongoose"

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    img: {
      type: String,
    },

    savedPosts: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
