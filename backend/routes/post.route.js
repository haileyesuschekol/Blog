import express from "express"
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
} from "../controllers/post.controller.js"
import { isUserAuth } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/:slug", getPost)
router.post("/", isUserAuth, createPost)
router.delete("/:id", isUserAuth, deletePost)

export default router
