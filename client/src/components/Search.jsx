import { CiSearch } from "react-icons/ci"

const Search = () => {
  return (
    <div className=" flex justify-center bg-gray-100 p-2   items-center gap-3">
      <button>
        <CiSearch />
      </button>
      <input
        type="text"
        placeholder="search a post..."
        className="bg-transparent  focus:outline-none "
      />
    </div>
  )
}

export default Search
