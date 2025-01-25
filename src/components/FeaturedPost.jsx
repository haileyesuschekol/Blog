import Image from "./Image"
import { Link } from "react-router-dom"

const FeaturedPost = () => {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* first */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Image */}
        <Image
          src="featuredpost.jpg"
          alt="Freatured post"
          className="rounded-3xl object-cover"
          w="895"
        />
        {/* details  */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-green-500 lg:text-lg">Web Design</Link>
          <span className="text-gray-500">3 days ago</span>
        </div>
        {/* title  */}
        <Link
          to="/test"
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          Lorem ipsum dolor sit amet consectetur.
        </Link>
      </div>

      {/* others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* second */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <Image
              src="featuredpost2.jpg"
              alt="featured posts"
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>
          {/* details and title  */}
          <div className="w-2/3">
            {/* details  */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-green-500">Web Design</Link>
              <span className="text-gray-5000 text-sm">2 days ago</span>
            </div>
            {/* title  */}
            <Link
              to="/test"
              className="
              text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium
              "
            >
              Lorem ipsum dolor sit amet consectetur.
            </Link>
          </div>
        </div>

        {/* third */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <Image
              src="featuredpost2.jpg"
              alt="featured posts"
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>
          {/* details and title  */}
          <div className="w-2/3">
            {/* details  */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-green-500">Web Design</Link>
              <span className="text-gray-5000 text-sm">2 days ago</span>
            </div>
            {/* title  */}
            <Link
              to="/test"
              className="
              text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium
              "
            >
              Lorem ipsum dolor sit amet consectetur.
            </Link>
          </div>
        </div>

        {/* fourth */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <Image
              src="featuredpost2.jpg"
              alt="featured posts"
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>
          {/* details and title  */}
          <div className="w-2/3">
            {/* details  */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-green-500">Web Design</Link>
              <span className="text-gray-5000 text-sm">2 days ago</span>
            </div>
            {/* title  */}
            <Link
              to="/test"
              className="
              text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium
              "
            >
              Lorem ipsum dolor sit amet consectetur.
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPost
