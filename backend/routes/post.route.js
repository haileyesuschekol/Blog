import express from "express"
import multer from "multer"
import path from "path"
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
} from "../controllers/post.controller.js"
import { isUserAuth } from "../middleware/auth.js"
import { upload } from "../middleware/uploadImage.js"
const router = express.Router()

router.get("/", getPosts)
router.get("/:slug", getPost)
router.post("/", isUserAuth, upload.single("image"), createPost)
router.delete("/:id", isUserAuth, deletePost)

export default router
