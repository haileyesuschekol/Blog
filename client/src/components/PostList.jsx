import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import PostListItem from "./PostListItem"

const fetchPost = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`)
  return res.data
}

const PostList = () => {
  const {
    data: postData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPost(),
  })

  console.log(postData)

  return (
    <div className="flex flex-col gap-12 mb-8">
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </div>
  )
}

export default PostList
