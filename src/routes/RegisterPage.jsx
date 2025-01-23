import { SignUp } from "@clerk/clerk-react"

const RegisterPage = () => {
  return (
    <div className=" flex items-center justify-center h-[clac(100vh - 80px)]">
      <SignUp signInUrl="/login" />
    </div>
  )
}

export default RegisterPage
