import { Link } from "react-router-dom"
import Search from "./Search"

const SideMenu = () => {
  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-3 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-4 mb-3 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="newest"
            className="appearance-none w-4 h-4 border-[1.15px] border-black cursor-pointer rounded-sm checked:bg-green-500 checked:border-green-500"
          />
          Newest
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="trending"
            className="appearance-none w-4 h-4 border-[1.15px] border-black cursor-pointer rounded-sm checked:bg-green-500 checked:border-green-500"
          />
          Trending
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="popular"
            className="appearance-none w-4 h-4 border-[1.15px] border-black cursor-pointer rounded-sm checked:bg-green-500 checked:border-green-500 "
          />
          Most Popular
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.15px] border-black cursor-pointer rounded-sm checked:bg-green-500 checked:border-green-500 "
          />
          Olders
        </label>
      </div>
      <h1 className="mt-4 mb-3 text-sm font-medium">Catagories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <div>
          <Link className="underline" to="/posts">
            All
          </Link>
        </div>
        <div>
          <Link className="underline" to="/posts?cat=web-design">
            Web Design
          </Link>
        </div>
        <div>
          <Link className="underline" to="/posts?cat=development">
            Development
          </Link>
        </div>
        <div>
          <Link className="underline" to="/posts?cat=databases">
            Database
          </Link>
        </div>
        <div>
          <Link className="underline" to="/posts?cat=seo">
            Search Engine
          </Link>
        </div>
        <div>
          <Link className="underline" to="/posts?cat=marketing">
            Marketing
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
