import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = search
    if (location.pathname === "/posts") {
      setSearchParams({ ...Object.fromEntries(searchParams), search: query })
    } else {
      navigate(`/posts?search=${query}`)
    }
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className=" flex justify-center bg-gray-100 p-2   items-center gap-3">
        <button>
          <CiSearch />
        </button>
        <input
          type="text"
          placeholder="search a post..."
          className="bg-transparent  focus:outline-none "
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>
  )
}

export default Search
