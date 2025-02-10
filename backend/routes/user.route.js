import express from "express"

import { savePost, getUserSavedPost } from "../controllers/user.controller.js"
import { isUserAuth } from "../middleware/auth.js"

const router = express.Router()

router.get("/saved", isUserAuth, getUserSavedPost)
router.patch("/saved", isUserAuth, savePost)

export default router
