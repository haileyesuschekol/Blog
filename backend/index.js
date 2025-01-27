import express from "express"
import connectToDb from "./lib/connectDb.js"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"

const app = express()
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  connectToDb()
  console.log(`Server is listening in port ${port}`)
})
