import express from "express"
import {
  addComment,
  deleteComment,
  getPostComments,
} from "../controllers/comment.controller.js"
import { isUserAuth } from "../middleware/auth.js"
const router = express.Router()

router.post("/:postId", isUserAuth, addComment)
router.get("/:postId", getPostComments)
router.delete("/:id", isUserAuth, deleteComment)

export default router
