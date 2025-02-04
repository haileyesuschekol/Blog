import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"

const useLogoutUser = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newData) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        newData,
        { withCredentials: true } // Include credentials (cookies)
      )
    },

    onError: (error) => {
      const messages = error.response?.data?.message || "Something went wrong"
      toast.error(messages)
    },
    onSuccess: (response) => {
      queryClient.removeQueries(["user"])
      queryClient.invalidateQueries(["user"]) // Refetch fresh data
      const message = response.data?.message || "Operation successful"
      toast.success(message)
      navigate(`/`)
    },
  })
}

export default useLogoutUser
