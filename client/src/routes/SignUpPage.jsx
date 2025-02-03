import { motion } from "framer-motion"
import { toast } from "react-toastify"
import axios from "axios"
import { Lock, Mail, User } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import PasswordStrength from "../components/PasswordStrength"
import { useMutation } from "@tanstack/react-query"

const SignupPage = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (userData) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
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
      toast.success(message, {
        autoClose: 2000,
        position: "top-right",
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "colored",
      })
      navigate("/verify-email")
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name,
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
      className=" max-w-md w-full mt-2 mx-auto rounded-zxl shadow-xl overflow-hidden mb-5"
    >
      <div className="p-5">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          {/* password strength Checker */}
          <PasswordStrength password={password} />

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-green-500 text-white
          font-bold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none
        transition duration-200"
            whileHover={{ Scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing up" : "Sign up"}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-lime-200 bg-opacity-50 flex justify-center">
        <p className="text-base text-gray-900">Already have an account?</p>
        <Link
          to={"/login"}
          className="text-base ml-1 text-gray-900 hover:underline"
        >
          Login
        </Link>
      </div>
    </motion.div>
  )
}

export default SignupPage
