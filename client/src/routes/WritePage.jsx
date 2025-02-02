import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { CiImageOn } from "react-icons/ci"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import axios from "axios"
const WritePage = () => {
  const [value, setValue] = useState("")

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, newPost)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
      user: "679e54cb3e31eb3cc5f78910",
    }
    mutation.mutate(data)
  }

  return (
    <div className=" h-[clac(100vh-64px)] md:[calc(100vh-80px)] flex flex-col gap-3">
      <h1 className="text-xl font-light">Create new Post</h1>
      <form className="flex flex-col gap-4 mb-3" onSubmit={handleSubmit}>
        <button className="flex items-center justify-center gap-2 w-max p-2 bg-slate-50 shadow-md rounded-md text-sm text-gray-500">
          <CiImageOn className="w-5 h-5" />
          Add a cover image
        </button>
        <input
          type="text"
          className="text-3xl font-semibold bg-transparent outline-none"
          placeholder="Title"
          name="title"
        />
        <div className="flex items-center gap-4 ">
          <label htmlFor="" className="tezt-sm ">
            Choose a catagory
          </label>
          <select
            name="category"
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
          className="flex-1 rounded-xl bg-slate-50 shadow-md"
          value={value}
          onChange={setValue}
        />
        <button
          disabled={mutation.isPending}
          className="bg-green-500 text-white font-medium rounded-md mt-2 p-2 w-36"
        >
          {mutation.isPending ? "Loading ..." : "Post"}
        </button>
      </form>
    </div>
  )
}

export default WritePage
