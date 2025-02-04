import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const fetchUser = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
    {
      withCredentials: true,
    }
  )
  return res.data
}

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  })
}

export default useUser
