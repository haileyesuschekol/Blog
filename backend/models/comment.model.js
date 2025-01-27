import mongoose, { model } from "mongoose"
import { Schema } from "mongoose"

const commentSchema = new Schema(
  {
    user: {
      typr: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Post", commentSchema)
