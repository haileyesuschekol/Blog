import express from "express"
import cookieParser from "cookie-parser"

import connectToDb from "./lib/connectDb.js"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import authRouter from "./routes/auth.route.js"

const app = express()
app.use(express.json())

app.use(cookieParser())

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
