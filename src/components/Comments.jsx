import Comment from "./Comment"

const Comments = () => {
  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <div className="flex items-center justify-between gap-3 w-full">
        <textarea
          placeholder="write a comment ..."
          className="w-full p-4 rounded-xl bg-gray-100"
        ></textarea>
        <button className="bg-green-500 px-6 py-4 text-white font-medium rounded-xl">
          Send
        </button>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
}

export default Comments
