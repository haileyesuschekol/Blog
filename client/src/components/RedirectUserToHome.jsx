import { Navigate } from "react-router-dom"
import useUser from "../hook/useFetchUser"

// redirect authenticated users to the home page
const RedirectAuthUserToHome = ({ children }) => {
  const { data } = useUser()

  if (data && data?.user?.isVerified) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RedirectAuthUserToHome
