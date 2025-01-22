import { useState } from "react"
import { CiMenuFries } from "react-icons/ci"
import { RxCross1 } from "react-icons/rx"

const NavBar = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <div className="flex items-center gap-4 text-2xl font-bold">
        <img className="h-10 w-10" src="/logo.png" alt="Logo" />
        <span>Daily-Blog</span>
      </div>
      {/* mobile menu */}
      <div className="md:hidden">
        <div
          className="cursor-pointer text-3xl text-gray-900"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <CiMenuFries /> : <RxCross1 />}
        </div>
      </div>
      {/* desktop menu */}
      <div className="hidden md:flex">D</div>
    </div>
  )
}

export default NavBar
