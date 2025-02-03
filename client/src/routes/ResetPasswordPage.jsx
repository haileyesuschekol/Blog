import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../components/Input"

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const { token } = useParams()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (userData) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
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
      navigate("/login")
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    const data = {
      password,
      confirmPassword,
    }
    mutation.mutate(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mt-4 mx-auto  rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-500 ">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error ? <h2 className="text-red-500 p-3">{error}</h2> : null}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-700 transition duration-200"
            type="submit"
          >
            Set New Password
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}
export default ResetPasswordPage
