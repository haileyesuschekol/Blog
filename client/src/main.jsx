import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "./index.css"

import HomePage from "./routes/HomePage.jsx"
import PostListPage from "./routes/PostListPage.jsx"
import WritePage from "./routes/WritePage.jsx"
import LoginPage from "./routes/LoginPage.jsx"
import SinglePostPage from "./routes/SinglePostPage.jsx"
import MainLayout from "./layouts/MainLayout.jsx"
import SignupPage from "./routes/SignUpPage.jsx"
import ForgotPasswordPage from "./routes/ForgotPasswordPage.jsx"
import EmailVerificationPage from "./routes/EmailVerificationPage.jsx"
import ResetPasswordPage from "./routes/ResetPasswordPage.jsx"
import RedirectAuthUserToHome from "./components/RedirectUserToHome.jsx"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/:slug",
        element: <SinglePostPage />,
      },
      {
        path: "/write",
        element: <WritePage />,
      },
      {
        path: "/login",
        element: (
          <RedirectAuthUserToHome>
            <LoginPage />
          </RedirectAuthUserToHome>
        ),
      },
      {
        path: "/signup",
        element: (
          <RedirectAuthUserToHome>
            <SignupPage />
          </RedirectAuthUserToHome>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <RedirectAuthUserToHome>
            <ForgotPasswordPage />
          </RedirectAuthUserToHome>
        ),
      },

      {
        path: "/verify-email",
        element: (
          <RedirectAuthUserToHome>
            <EmailVerificationPage />
          </RedirectAuthUserToHome>
        ),
      },

      {
        path: "/reset-password/:token",
        element: (
          <RedirectAuthUserToHome>
            <ResetPasswordPage />
          </RedirectAuthUserToHome>
        ),
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar="true"
        pauseOnFocusLoss="false"
        pauseOnHover="false"
        theme="colored"
      />
    </QueryClientProvider>
  </StrictMode>
)
