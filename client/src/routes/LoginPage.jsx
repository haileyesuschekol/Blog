import { motion } from "framer-motion"
import { toast } from "react-toastify"
import axios from "axios"
import { Lock, Mail } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Input from "../components/Input"

const Login = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (userData) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        userData,
        { withCredentials: true } // Include credentials (cookies)
      )
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
      queryClient.invalidateQueries(["user"]) // Refetch user data
      toast.success(message, {
        autoClose: 2000,
        position: "top-right",
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "colored",
      })
      navigate("/")
    },
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = {
      email,
      password,
    }
    mutation.mutate(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" max-w-md w-full mt-4 mx-auto rounded-zxl shadow-xl overflow-hidden "
    >
      <div className="p-5">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Sign in
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center mb-1">
            <Link
              to="/forgot-password"
              className="text-sm text-green-900 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-green-500 text-white
          font-bold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none
        transition duration-200"
            whileHover={{ Scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            onClick={handleLogin}
          >
            Login
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-lime-200 bg-opacity-50 flex justify-center">
        <p className="text-base text-gray-900">Don&apos;t have an account?</p>
        <Link
          to={"/signup"}
          className="text-base ml-1 text-gray-900 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </motion.div>
  )
}

export default Login
