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

export const savePost = async (req, res) => {}
