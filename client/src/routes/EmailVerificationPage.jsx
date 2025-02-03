import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const EmailVerificationPage = () => {
  const [code, setCode] = useState("")

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (userData) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-email`,
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
      navigate("/")
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      code,
    }
    mutation.mutate(data)
  }

  return (
    <div className="max-w-md w-full  mt-2 mx-auto  rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="  rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-green-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-900 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            maxLength="6"
            onChange={(e) => setCode(e.target.value)}
            className="w-full text-3xl text-gray-700 text-center border-green-500 border-2 focus:outline-none focus:border-green-800 m-2 p-3 "
            placeholder="Enter Verification Code"
            value={code}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full  bg-green-500  text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            Verify Email
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
export default EmailVerificationPage
