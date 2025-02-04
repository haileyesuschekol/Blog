import { Navigate } from "react-router-dom"
import useUser from "../hook/useFetchUser"

const ProtectedRoute = ({ children }) => {
  const { data } = useUser()

  if (!data.user) {
    return <Navigate to="/login" replace />
  }

  if (!data.user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children
}

export default ProtectedRoute
