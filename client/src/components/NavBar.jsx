import { useEffect, useMemo, useRef, useState } from "react"
import { HiLogin } from "react-icons/hi"
import { RxCross1, RxHamburgerMenu } from "react-icons/rx"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Image from "./Image"
import { CgProfile } from "react-icons/cg"
import { IoSettingsOutline } from "react-icons/io5"
import { MdLogout } from "react-icons/md"
import useUser from "../hook/useFetchUser"
import useLogoutUser from "../hook/useLogoutUser"
import getRandomColor from "../utils/generateRandomColor"

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  //logout mutator
  const logout = useLogoutUser()

  //getuser
  const { data: userData } = useUser()
  console.log("user data", userData?.user)

  //logout handler
  const handleLogout = () => {
    logout.mutate()
  }

  //generate random color
  getRandomColor()
  const bgColor = useMemo(() => getRandomColor(), [])
  const newName = userData?.user?.name.slice(0, 1).toUpperCase()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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

        {userData ? (
          // <UserProfileImg name={userData?.user?.name} />
          <div
            className="flex flex-col relative items-center justify-center"
            ref={dropdownRef}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" rounded-full border-2 border-green-400 w-12 h-12  flex flex-row justify-center items-center"
              style={{ backgroundColor: bgColor }}
            >
              <h2 className="text-lg font-bold  text-white ">{newName}</h2>
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden w-32 bg-white rounded-lg shadow-lg"
            >
              <div
                className="p-6 mt-1 text-center absolute left-3 z-10 bg-white rounded-lg flex flex-col justify-center items-start gap-2"
                // style={{ backgroundColor: bgColor }}
              >
                <p className=" text-gray-800 flex flex-row gap-3 items-center">
                  <CgProfile /> Profile
                </p>
                <p className="text-gray-800 flex flex-row gap-3 items-center">
                  <IoSettingsOutline />
                  Setting
                </p>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 flex flex-row gap-3 items-center"
                >
                  <MdLogout />
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
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
