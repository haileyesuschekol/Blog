import express from "express"
import multer from "multer"
import path from "path"
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  featurePost,
} from "../controllers/post.controller.js"
import { isUserAuth } from "../middleware/auth.js"
import { upload } from "../middleware/uploadImage.js"
import { increaseVisit } from "../middleware/increaseVisit.js"
const router = express.Router()

router.get("/", getPosts)
router.get("/:slug", increaseVisit, getPost)
router.post("/", isUserAuth, upload.single("image"), createPost)
router.delete("/:id", isUserAuth, deletePost)
router.patch("/feature", isUserAuth, featurePost)

export default router
