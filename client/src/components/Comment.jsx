import { toast } from "react-toastify"
import useUser from "../hook/useFetchUser"
import Image from "./Image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const Comment = ({ comment, postId }) => {
  const { data: userInfo } = useUser()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comments/${comment._id}`,
        {
          withCredentials: true, // Include credentials (cookies)
        }
      )
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] })
      const message = response.data.message || "Comment deleted"
      toast.success(message)
    },
  })

  return (
    <div className="p-4 bg-slate-200 rounded-xl mb-4">
      <div className="flex items-center gap-4">
        <Image
          src="userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          w="40"
        />
        <span className="font-medium">{comment.user.name}</span>
        <span className="text-sm text-gray-500">{comment.createdAt}</span>
        {userInfo &&
          (comment.user.name === userInfo.user.name ||
            userInfo.user.role === "admin") && (
            <span
              className="text-lg text-red-600 hover:text-red-800 cursor-pointer ml-7"
              onClick={() => mutation.mutate()}
            >
              delete
            </span>
          )}
      </div>
      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  )
}

export default Comment
