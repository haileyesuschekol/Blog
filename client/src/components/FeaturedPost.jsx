import Image from "./Image"
import { Link } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/posts?featured=true`,
    {
      withCredentials: true,
    }
  )
  return res.data
}
const FeaturedPost = () => {
  const { data: featuredPost } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  })

  console.log(featuredPost)

  if (!featuredPost || featuredPost.length === 0) {
    return
  }

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* first */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Image */}
        <img
          src={`${featuredPost[0]?.image}`}
          alt="Freatured post"
          className="rounded-3xl object-cover w-[885]"
        />
        {/* details  */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-green-500 lg:text-lg">
            {featuredPost[0]?.category}
          </Link>
          <span className="text-gray-500">{featuredPost[0]?.createdAt}</span>
        </div>
        {/* title  */}
        <Link
          to={`/${featuredPost[0]?.slug}`}
          className="text-xl lg:text-2xl font-semibold lg:font-bold"
        >
          {featuredPost[0]?.title}
        </Link>
      </div>

      {/* others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* second */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <img
              src={featuredPost[1]?.image}
              alt="featured posts"
              className="rounded-3xl object-cover w-full h-full"
            />
          </div>
          {/* details and title  */}
          <div className="w-2/3">
            {/* details  */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-green-500">
                {featuredPost[1]?.category}
              </Link>
              <span className="text-gray-5000 text-sm">
                {featuredPost[1]?.createdAt}
              </span>
            </div>
            {/* title  */}
            <Link
              to={`/${featuredPost[1]?.slug}`}
              className="
              text-base sm:text-lg md:text-xl lg:text-xl xl:text-md font-medium text-gray-900
              "
            >
              {featuredPost[1]?.title}
            </Link>
          </div>
        </div>

        {/* third */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <img
              src={featuredPost[2]?.image}
              alt="featured posts"
              className="rounded-3xl object-cover w-full h-full"
              // w="298"
            />
          </div>
          {/* details and title  */}
          <div className="w-2/3">
            {/* details  */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">03.</h1>
              <Link className="text-green-500">
                {featuredPost[2]?.category}
              </Link>
              <span className="text-gray-5000 text-sm">
                {featuredPost[2]?.createdAt}
              </span>
            </div>
            {/* title  */}
            <Link
              to={`/${featuredPost[2]?.slug}`}
              className="
              text-base sm:text-lg md:text-2xl lg:text-xl xl:text-md font-medium text-gray-900
              "
            >
              {featuredPost[2]?.title}
            </Link>
          </div>
        </div>

        {/* fourth */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <img
              src={featuredPost[3]?.image}
              alt="featured posts"
              className="rounded-3xl object-cover w-full h-full"
              // w="298"
            />
          </div>
          {/* details and title  */}
          <div className="w-2/3">
            {/* details  */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">04.</h1>
              <Link className="text-green-500">
                {featuredPost[3]?.category}
              </Link>
              <span className="text-gray-5000 text-sm">
                {featuredPost[3]?.createdAt}
              </span>
            </div>
            {/* title  */}
            <Link
              to={`/${featuredPost[3]?.slug}`}
              className="
              text-base sm:text-lg md:text-2xl lg:text-xl xl:text-md font-medium text-gray-900
              "
            >
              {featuredPost[3]?.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPost
