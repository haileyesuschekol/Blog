import express from "express"

import { savePost, getUserSavedPost } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/saved", getUserSavedPost)
router.patch("/saved", savePost)

export default router
