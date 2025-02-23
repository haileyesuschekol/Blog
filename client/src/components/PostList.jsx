import PostListItem from "./PostListItem"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

const fetchPost = async (searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams])
  console.log(searchParamsObj)
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
    withCredentials: true,
    params: { searchParamsObj },
  })
  return res.data
}

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: postData } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPost(searchParams),
  })
  // const { data: postData } = usePosts()
  console.log(postData ?? null)
  return (
    <div className="flex flex-col gap-12 mb-8">
      {postData?.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </div>
  )
}

export default PostList
