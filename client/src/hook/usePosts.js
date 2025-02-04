import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchPost = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
    withCredentials: true,
  })
  return res.data
}

const PostList = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPost(),
  })
}

export default PostList
