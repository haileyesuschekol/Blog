import { Link, useSearchParams } from "react-router-dom"
import Search from "./Search"

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      })
    }
  }
  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      })
    }
  }

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
            onChange={handleFilterChange}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.15px] border-black cursor-pointer rounded-sm checked:bg-green-500 checked:border-green-500"
          />
          Newest
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.15px] border-black cursor-pointer rounded-sm checked:bg-green-500 checked:border-green-500"
          />
          Trending
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className="appearance-none w-4 h-4 border-[1.15px] border-black cursor-pointer rounded-sm checked:bg-green-500 checked:border-green-500 "
          />
          Most Popular
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.15px] border-black cursor-pointer rounded-sm checked:bg-green-500 checked:border-green-500 "
          />
          Olders
        </label>
      </div>
      <h1 className="mt-4 mb-3 text-sm font-medium">Catagories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <div>
          <span
            className="underline cursor-pointer"
            onClick={() => handleCategoryChange("general")}
          >
            All
          </span>
        </div>
        <div>
          <span
            className="underline  cursor-pointer "
            onClick={() => handleCategoryChange("web-design")}
          >
            Web Design
          </span>
        </div>
        <div>
          <span
            className="underline cursor-pointer "
            onClick={() => handleCategoryChange("development")}
          >
            Development
          </span>
        </div>
        <div>
          <span
            className="underline cursor-pointer "
            onClick={() => handleCategoryChange("database")}
          >
            Database
          </span>
        </div>
        <div>
          <span
            className="underline cursor-pointer "
            onClick={() => handleCategoryChange("seo")}
          >
            Search Engine
          </span>
        </div>
        <div>
          <span
            className="underline cursor-pointer "
            onClick={() => handleCategoryChange("marketing")}
          >
            Marketing
          </span>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
