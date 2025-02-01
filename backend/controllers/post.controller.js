import Post from "../models/post.model.js"
import User from "../models/user.model.js"

export const getPosts = async (req, res) => {
  const posts = await Post.find()
  res.status(200).json(posts)
}

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
  res.status(200).json(post)
}

export const createPost = async (req, res) => {
  //save userId form cookie
  const userId = req.userId

  const user = User.findOne({ userId })
  if (!user) {
    res.status(403).json({ success: false, message: "unauthenticated" })
  }

  //create post and parse to user id
  const newPost = new Post({ user: userId, ...req.body })
  const post = await newPost.save()
  res.status(200).json(post)
}

export const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id)
  res.status(200).json("Delete successfully")
}
