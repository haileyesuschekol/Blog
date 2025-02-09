import Image from "../components/Image"
import { Link, useParams } from "react-router-dom"
import PostMenuActions from "../components/PostMenuActions"
import Search from "../components/Search"
import Comments from "../components/Comments"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchPost = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/posts/${slug}`,
    {
      withCredentials: true,
    }
  )
  return res.data
}

const SinglePostPage = () => {
  const { slug } = useParams()
  const { data: singlePost } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => fetchPost(slug),
  })
  return (
    <div className="flex flex-col gap-8">
      {/* details  */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {singlePost?.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Written by</span>
            <Link className="text-green-500">{singlePost?.user.name}</Link>
            <span>on</span>
            <Link className="text-green-500">{singlePost?.category}</Link>
            <span>{singlePost?.createdAt}</span>
          </div>
          <p className="text-gray-500 font-medium">{singlePost?.desc}</p>
        </div>

        {singlePost?.img && (
          <div className="hidden lg:block w-2/5">
            <Image src="postImg.jpeg" w="600" className="rounded-2xl" />
          </div>
        )}
      </div>

      {/* content  */}
      <div className=" flex flex-col md:flex-row gap-12">
        {/* text  */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          {singlePost?.content}
        </div>

        {/* menu  */}
        <div className="px-4 h-max sticky top-8">
          <h1 className=" mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-2">
            <Image
              src="userImg.jpeg"
              className="w-13 h-12 rounded-full object-cover"
              w="48"
              h="48"
            />
            <Link className="text-green-500">{singlePost?.user.name}</Link>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>

          <PostMenuActions post={singlePost} />

          <h1 className="mt-4 mb-2 text-sm font-medium">catagories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <div>
              <Link className="underline">All</Link>
            </div>
            <div>
              <Link className="underline" to="/">
                Web Design
              </Link>
            </div>
            <div>
              <Link className="underline" to="/">
                Development
              </Link>
            </div>
            <div>
              <Link className="underline" to="/">
                Databases
              </Link>
            </div>
            <div>
              <Link className="underline" to="/">
                Search Engines
              </Link>
            </div>
            <div>
              <Link className="underline" to="/">
                Marketing
              </Link>
            </div>
          </div>

          {/* search  */}
          <div className="mt-2 mb-4 text-sm font-medium">
            <Search />
          </div>
        </div>
      </div>
      <Comments postId={singlePost?._id} />
    </div>
  )
}

export default SinglePostPage
