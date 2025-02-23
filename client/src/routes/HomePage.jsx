import { Link } from "react-router-dom"
import MainCatagory from "../components/MainCatagory"
import FeaturedPost from "../components/FeaturedPost"
import PostList from "../components/PostList"

const HomePage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* breadcrump */}
      <div className="flex gap-2">
        <Link to="/">Home</Link>
        <span>*</span>
        <span className="text-green-600">Blogs and Articles</span>
      </div>
      {/* introduction */}
      <div className="flex items-center justify-between">
        {/* title*/}
        <div className="">
          <h2 className="text-gray-700 text-2xl md:text-5xl lg:text-5xl font-bold">
            Inspire Innovate Grow Connect Succeed.
          </h2>
          <p className="mt-8 text-md md:text-xl">
            Stay informed with the latest in technology and design.Learn, grow,
            and transform your digital presence.Your go-to resource for
            innovation and growth.
          </p>
        </div>
        {/* animated button */}
        <div className="hidden md:block relative">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin aniatedButton"
          >
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1, 1 150, 0 a 75, 75 0 1,1 -150, 0"
              fill="none"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea
              </textPath>
              <textPath href="#circlePath" startOffset="42%">
                *
              </textPath>
              <textPath href="#circlePath" startOffset="92%">
                *
              </textPath>
            </text>
          </svg>
          <Link to="/write" className="">
            <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      <MainCatagory />
      {/* freature posts */}
      <FeaturedPost />
      {/* post list */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  )
}

export default HomePage
