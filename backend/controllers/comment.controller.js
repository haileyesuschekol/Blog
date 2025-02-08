import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"

export const getPostComments = async (req, res) => {
  const comment = await Comment.find({ post: req.params.postId })
    .populate("user", "name")
    .sort({ createdAt: -1 })
  res.status(200).json(comment)
}

export const addComment = async (req, res) => {
  //save userId form cookie
  const userId = req.userId
  const postId = req.params.postId
  console.log(req.body)
  const { desc } = req.body
  //   const desc = "asdf"
  const user = await User.findOne({ userId })

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Not authenticated!" })
  }

  const newComment = new Comment({
    desc,
    user: user._id,
    post: postId,
  })
  const savedComment = await newComment.save()
  res.status(201).json({ savedComment })
}

export const deleteComment = async (req, res) => {
  //save userId form cookie
  const userId = req.userId
  const postId = req.params.postId

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Not authenticated!" })
  }

  const user = await User.findOne({ userId })

  const deletedComment = await Comment.findOneAndDelete({
    _id: postId,
    user: user._id,
  })

  if (!deleteComment) {
    return res.json({
      success: false,
      message: "You can't delete others comment!",
    })
  }

  res.status(200).json("Comment deleted")
}
