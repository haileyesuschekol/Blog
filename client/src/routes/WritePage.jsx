import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { CiImageOn } from "react-icons/ci"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import PleaseLogin from "../components/PleaseLogin"

const fetchUser = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
    {
      withCredentials: true,
    }
  )
  return res.data
}

const WritePage = () => {
  const [value, setValue] = useState("")
  const [nullError, setNullError] = useState(false)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [desc, setDesc] = useState("")

  const navigate = useNavigate()

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
    // retry: false,
  })

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, newPost, {
        withCredentials: true, // Include credentials (cookies)
        headers: { "Content-Type": "multipart/form-data" },
      })
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong"

      toast.error(message, {
        autoClose: 2000,
        position: "top-right",
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "colored",
      })
    },
    onSuccess: (response) => {
      const message = response.data?.message || "Operation successful"
      toast.success(message, {
        autoClose: 2000,
        position: "top-right",
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "colored",
      })
      navigate(`/${response.data.post.slug}`)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("title", title)
    formData.append("desc", desc)
    formData.append("category", category)
    formData.append("value", value)
    // formData.append("data", JSON.stringify(postData))
    formData.append("image", image)

    if (!value && !title && !desc) {
      setNullError(true)
      toast.error("Please enter your content!")

      return
    }
    mutation.mutate(formData)
  }

  if (!userData) {
    return <PleaseLogin />
  }

  return (
    <div className=" h-[clac(100vh-64px)] md:[calc(100vh-80px)] flex flex-col gap-3">
      <h1 className="text-xl font-light">Create new Post</h1>
      <form className="flex flex-col gap-4 mb-3" onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="flex items-center justify-center gap-2 w-max p-2 bg-slate-50 shadow-md rounded-md text-sm text-gray-500"
        />
        <CiImageOn className="w-5 h-5" />
        Add a cover image
        {/* </input> */}
        <input
          type="text"
          className="text-3xl font-semibold bg-transparent outline-none"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-4 ">
          <label htmlFor="" className="tezt-sm ">
            Choose a catagory
          </label>
          <select
            name="category"
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
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
