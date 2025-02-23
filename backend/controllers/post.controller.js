import Post from "../models/post.model.js"
import User from "../models/user.model.js"

export const getPosts = async (req, res) => {
  const query = {}

  const cat = req.query.cat
  const author = req.query.author
  const searchQuery = req.query.search
  const sortQuery = req.query.sort
  const featured = req.query.featured

  if (cat) {
    query.category = cat
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $option: "i" }
  }

  if (author) {
    const user = await User.findOne({ name: author }).select("_id")
    if (!user) {
      return res.status(404).json({ success: false, message: "No post found!" })
    }
    query.user = user._id
  }

  if (cat) {
    query.category = cat
  }

  let sortObj = { createdAt: -1 }

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 }
        break
      case "oldest":
        sortObj = { createdAt: 1 }
        break
      case "popular":
        sortObj = { visit: -1 }
        break
      case "trending":
        sortObj = { visit: -1 }
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        }
        break

      default:
        break
    }
  }
  console.log(query)
  const posts = await Post.find(query).populate("user", "name").sort(sortObj)
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

  //create post and parse to user id
  const newPost = new Post({
    user: userId,
    slug,
    image: `/uploads/${req.file.filename}`,
    content: req.body.value,
    category: req.body.category,
    desc: req.body.desc,
    title: req.body.title,
  })
  const post = await newPost.save()
  res.status(200).json({ post, message: "Created!" })
}

export const deletePost = async (req, res) => {
  //save userId form cookie
  const userId = req.userId

  const user = await User.findOne({ _id: userId })
  if (!user) {
    return res.status(403).json({ success: false, message: "unauthenticated" })
  }

  if (user.role === "admin") {
    await Post.findByIdAndDelete(req.params.id)
    return res
      .status(200)
      .json({ success: true, message: "Post has been deleted!" })
  }

  const deleted = await Post.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  })

  if (!deleted) {
    res
      .status(400)
      .json({ success: false, message: "cant delete others post!" })
  }

  await Post.findByIdAndDelete(req.params.id)
  res.status(200).json({ success: true, message: "Post delete successfully" })
}

export const featurePost = async (req, res) => {
  //save userId form cookie
  const userId = req.userId
  const { postId } = req.body

  if (!userId) {
    return res.status(403).json({ success: false, message: "unauthenticated" })
  }

  const user = await User.findOne({ _id: userId })
  if (!user && user.role !== "admin") {
    return res.status(403).json({ success: false, message: "unauthorized!" })
  }

  const post = await Post.findById(postId)

  if (!post) {
    return res.status(400).json({ success: false, message: "post not found!" })
  }

  const isFeatured = post.isFeatured

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { isFeatured: !isFeatured },
    { new: true }
  )
  return res.status(200).json(updatedPost)
}
