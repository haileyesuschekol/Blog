import { useState } from "react"
import { HiLogin } from "react-icons/hi"
import { RxCross1, RxHamburgerMenu } from "react-icons/rx"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Image from "./Image"
import { useQuery } from "@tanstack/react-query"
import UserProfileImg from "./UserProfileImg"
// import UserProfileImg from "./UserProfileImg"

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
    {
      withCredentials: true,
    }
  )
  return res.data
}

const NavBar = () => {
  const [open, setOpen] = useState(false)

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchPost(),
  })
  console.log(userData?.user)
  //
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="logo" w={42} h={42} />
        <span>Daily-Blog</span>
      </Link>
      {/* mobile menu */}
      <div className="md:hidden">
        {/* mobile button */}
        <div
          className="cursor-pointer text-3xl text-gray-900 "
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <RxCross1 /> : <RxHamburgerMenu />}
        </div>
        {/* mobile links */}
        <div
          className={`w-full h-screen flex flex-col items-center gap-8  text-lg font-medium justify-center absolute top-16 bg-[#ceceff] transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="">
            <button className="py-2 px-4 rounded-3xl bg-green-500 text-white flex items-center gap-3">
              <HiLogin className="font-bold text-2xl" />
              Login
            </button>
          </Link>
        </div>
      </div>
      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>

        {userData?.user.isVerified ? (
          <UserProfileImg />
        ) : (
          <header>
            <Link to="/login">
              <button className="py-2 px-3 rounded-xl bg-green-500 text-white flex items-center gap-3">
                <HiLogin className="font-bold text-2xl" />
                Login
              </button>
            </Link>
          </header>
        )}
      </div>
    </div>
  )
}

export default NavBar
