import { CiSearch } from "react-icons/ci"
import { Link } from "react-router-dom"
import Search from "./Search"

const MainComponent = () => {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center jc gap-8">
      {/* links */}
      <div className="flex-1 flex items-center justify-self-center flex-wrap ">
        <Link
          to="/posts"
          className="bg-green-500 text-white rounded-full px-4 py-2"
        >
          All posts
        </Link>
        <Link
          to="/posts?cat=web-design"
          className="hover:bg-green-500 rounded-full px-4 py-2"
        >
          Web design
        </Link>
        <Link
          to="/posts?cat=development"
          className="hover:bg-green-500 rounded-full px-4 py-2"
        >
          Development
        </Link>
        <Link
          to="/posts?cat=database"
          className="hover:bg-green-500 rounded-full px-4 py-2"
        >
          Database
        </Link>
        <Link
          to="/posts?cat=seo"
          className="hover:bg-green-500 rounded-full px-4 py-2"
        >
          Search Engines
        </Link>
        <Link
          to="/posts?cat=marketing"
          className="hover:bg-green-500 rounded-full px-4 py-2"
        >
          Marketing
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* search */}
      <Search />
    </div>
  )
}

export default MainComponent
