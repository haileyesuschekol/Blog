import Post from "../models/post.model.js"
import User from "../models/user.model.js"

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "name")
  res.status(200).json(posts)
}

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    "name"
  )
  res.status(200).json(post)
}

export const createPost = async (req, res) => {
  //save userId form cookie
  const userId = req.userId

  const content = req.body

  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No file uploaded or invalid file type" })
  }

  if (!content.title && !content.desc && !content.value) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill the form" })
  }

  const user = User.findOne({ userId })
  if (!user) {
    res.status(403).json({ success: false, message: "unauthenticated" })
  }
  //create a slug
  let slug = req.body.title.replace(/ /g, "-").toLowerCase()
  let existingSlug = await Post.findOne({ slug })
  let counter = 2

  while (existingSlug) {
    slug = `${slug}-${counter}`
    existingSlug = await Post.findOne({ slug })
    counter++
  }

  console.log(req.body)

  //create post and parse to user id
  const newPost = new Post({
    user: userId,
    slug,
    image: `/uploads/${req.file.filename}`,
    content: req.body.value,
    catagory: req.body.category,
    desc: req.body.desc,
    title: req.body.title,
  })
  const post = await newPost.save()
  res.status(200).json({ post, message: "Created!" })
}

export const deletePost = async (req, res) => {
  //save userId form cookie
  const userId = req.userId

  const user = User.findOne({ userId })
  if (!user) {
    res.status(403).json({ success: false, message: "unauthenticated" })
  }

  const deletePost = await Post.findByIdAndDelete({
    _id: req.params.id,
    user: userId,
  })

  if (!deletePost) {
    res.status(403).json("You can delete only your post!")
  }
  res.status(200).json("Post delete successfully")
}
