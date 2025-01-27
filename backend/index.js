import express from "express"
import connectToDb from "./lib/connectDb.js"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/user.route.js"
import commentRouter from "./routes/comment.route.js"

const app = express()

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  connectToDb()
  console.log("Server is listening")
})
