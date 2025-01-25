import { Link } from "react-router-dom"
import Image from "./Image"
const PostListItem = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      <div className="md:hidden xl:block xl:w-1/3">
        <Image
          src="postImg.jpeg"
          className="rounded-2xl object-cover"
          w="735"
        />
      </div>
      {/* details  */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
          illum?
        </Link>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>Written by</span>
          <Link className="text-green-500">John Doe</Link>
          <span>on</span>
          <Link className="text-green-500">Web Design</Link>
          <span>2 days ago</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
          repudiandae? Excepturi ab magni laborum! Dignissimos voluptatem autem
          esse culpa maxime corrupti dolor, distinctio magnam optio.
        </p>
        <Link to="/" className="underline text-green-500 text-sm">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default PostListItem
