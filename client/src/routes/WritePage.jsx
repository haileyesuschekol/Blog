import { useUser } from "@clerk/clerk-react"
import { CiImageOn } from "react-icons/ci"
import { TbFaceIdError } from "react-icons/tb"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"

const WritePage = () => {
  // check auth from clerk
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return <div className="">Loading ...</div>
  }

  if (isLoaded && !isSignedIn) {
    return (
      <div className="text-red-500 bg-red-200 w-96 border-2 rounded-lg p-4 border-red-700 my-5 text-xl flex flex-row gap-4 m-auto items-center justify-center">
        <TbFaceIdError />
        Please Login or Create an account for free!
      </div>
    )
  }

  return (
    <div className=" h-[clac(100vh-64px)] md:[calc(100vh-80px)] flex flex-col gap-3">
      <h1 className="text-xl font-light">Create new Post</h1>
      <form className="flex flex-col gap-4 mb-3">
        <button className="flex items-center justify-center gap-2 w-max p-2 bg-slate-50 shadow-md rounded-md text-sm text-gray-500">
          <CiImageOn className="w-5 h-5" />
          Add a cover image
        </button>
        <input
          type="text"
          className="text-3xl font-semibold bg-transparent outline-none"
          placeholder="Title"
        />
        <div className="flex items-center gap-4 ">
          <label htmlFor="" className="tezt-sm ">
            Choose a catagory
          </label>
          <select
            name="cat"
            id=""
            className="p-2 bg-white shadow-md focus:outline-none"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="database">Database</option>
            <option value="seo">Search Engine</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          name="desc"
          placeholder="Write a short description"
          className="p-2 rounded-xl bg-slate-50 shadow-md"
        />
        <ReactQuill
          theme="snow"
          className="flex-1 rounded-xl bg-slate-50 shadow-md 
          "
        />
        <button className="bg-green-500 text-white font-medium rounded-md mt-2 p-2 w-36">
          Post
        </button>
      </form>
    </div>
  )
}

export default WritePage
