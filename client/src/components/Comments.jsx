import { toast } from "react-toastify"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Comment from "./Comment"

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/comments/${postId}`,
    {
      withCredentials: true,
    }
  )
  return res.data
}

const Comments = ({ postId }) => {
  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (comment) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments/${postId}`,
        comment,
        {
          withCredentials: true, // Include credentials (cookies)
          headers: { "Content-Type": "application/json" },
        }
      )
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] })
      const message = response.data?.message || "Operation successful"
      toast.success(message)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const desc = formData.get("desc").trim()

    if (!desc) {
      return toast.error("Please add a comment")
    }

    mutation.mutate({ desc }) // Send JSON object
  }

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-3 w-full"
      >
        <textarea
          name="desc"
          placeholder="write a comment ..."
          className="w-full p-4 rounded-xl bg-gray-100"
        ></textarea>
        <button className="bg-green-500 px-6 py-4 text-white font-medium rounded-xl">
          Send
        </button>
      </form>
      {comments?.map((comment) => (
        <Comment key={comment?._id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
