import PostListItem from "./PostListItem"
import usePosts from "../hook/usePosts"

const PostList = () => {
  const { data: postData } = usePosts()
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
