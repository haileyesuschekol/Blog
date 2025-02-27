import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectToDb from "./lib/connectDb.js"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import authRouter from "./routes/auth.route.js"

const app = express()

// Get the current directory path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cookieParser())
app.use(
  cors({
    origin: "https://blog-frontend-65kp.onrender.com", // frontend domain
    credentials: true, // Allow cookies
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // For parsing application/x-www-form-urlencoded

app.use("/uploads", express.static(path.join(__dirname, "uploads"))) // Serve static files (images)

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)

//errror handler
app.use((error, req, res, next) => {
  res.status(error.status || 500)

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  connectToDb()
  console.log(`Server is listening in port ${port}`)
})
