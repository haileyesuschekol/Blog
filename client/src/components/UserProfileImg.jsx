import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { IoSettingsOutline } from "react-icons/io5"
import { MdLogout } from "react-icons/md"
import { motion } from "framer-motion"
const getRandomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default function UserProfileImg() {
  const dropdownRef = useRef(null)
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

  const [isOpen, setIsOpen] = useState(false)
  const bgColor = useMemo(() => getRandomColor(), [])

  return (
    <div
      className="flex flex-col relative items-center justify-center h-screen z-10"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" rounded-full border-2 border-green-400 w-12 h-12  flex flex-row justify-center items-center"
        style={{ backgroundColor: bgColor }}
      >
        <h2 className="text-lg font-bold  text-white ">N</h2>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden w-32 bg-white rounded-lg shadow-lg"
      >
        <div
          className="p-6 mt-1 text-center absolute left-3 bg-white rounded-lg flex flex-col justify-center items-start gap-2"
          // style={{ backgroundColor: bgColor }}
        >
          <p className=" text-gray-800 flex flex-row gap-3 items-center">
            <CgProfile /> Profile
          </p>
          <p className="text-gray-800 flex flex-row gap-3 items-center">
            <IoSettingsOutline />
            Setting
          </p>
          <p className="text-gray-800 flex flex-row gap-3 items-center">
            <MdLogout />
            Logout
          </p>
        </div>
      </motion.div>
    </div>
  )
}
