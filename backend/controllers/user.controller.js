import User from "../models/user.model.js"

export const getUserSavedPost = async (req, res) => {
  const userId = req.userId

  if (!userId) {
    return res
      .status(403)
      .json({ success: false, message: "Not authenticated!" })
  }

  const user = await User.findOne({ userId })
  res.status(200).json(user.savedPost)
}

export const savePost = async (req, res) => {
  const userId = req.userId
  const { postId } = req.body

  if (!userId) {
    return res
      .status(403)
      .json({ success: false, message: "Not authenticated!" })
  }

  const user = await User.findOne({ userId })

  const isSaved = user.savedPost.some((p) => p === postId)

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, { $push: { savedPost: postId } })
  } else {
    await User.findByIdAndUpdate(user._id, { $pull: { savedPost: postId } })
  }

  res
    .status(200)
    .json({ message: `${isSaved} ? "Post unsaved" : "Post saved"` })
}
