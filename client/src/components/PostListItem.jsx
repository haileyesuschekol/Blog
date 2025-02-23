import { Link } from "react-router-dom"
// import { format } from "timeago.js"

const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      {post?.image && (
        <div className="md:hidden xl:block xl:w-1/3">
          <img
            src={`${post.image}`}
            className="rounded-2xl object-cover w-full"
            alt="Post"
          />
        </div>
      )}
      {/* details  */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={post.slug} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>Written by</span>
          <Link
            to={`/posts?author=${post.user.name}`}
            className="text-green-500"
          >
            {post.user.name}
          </Link>
          <span>on</span>
          <Link className="text-green-500">{post.category}</Link>
          <span>{post.createdAt}</span>
        </div>
        <p className="text-justify">{post.desc}</p>
        <Link to="/" className="underline text-green-500 text-sm">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default PostListItem
