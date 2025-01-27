import mongoose from "mongoose"
import { Schema } from "mongoose"

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    img: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
    },

    content: {
      type: string,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Post", postSchema)
