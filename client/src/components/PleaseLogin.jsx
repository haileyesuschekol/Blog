import { Link } from "react-router-dom"
import { TbFaceIdError } from "react-icons/tb"

const PleaseLogin = () => {
  return (
    <div className="mt-10 w-full flex flex-col justify-center items-center">
      <p className="flex flex-row gap-4 text-3xl text-gray-800">
        <TbFaceIdError className="text-4xl" />
        Please Login To Create Contents
      </p>

      <Link className="text-lg p-4 underline" to="/login">
        Login
      </Link>
    </div>
  )
}

export default PleaseLogin
