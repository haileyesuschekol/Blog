import crypto from "crypto"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateVerificationCode } from "../utils/verificationCode.js"
import { generateJwtAndParseToCookie } from "../utils/generateJwtAndParseToCookie.js"
import { sendVerificationEmail } from "../mail/sendEmails.js"
import { sendResetPassword } from "../mail/sendEmails.js"

//sign up
export const signup = async (req, res) => {
  const { email, password, name } = req.body

  try {
    //check the fields {email, password, name}
    if (!email || !password || !name) {
      throw new Error("Please fill the form!")
    }

    const userAlreadyExist = await User.findOne({ email })

    //check if user exist
    if (userAlreadyExist) {
      throw new Error("User already exists!")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    //get verification code
    const verificationCode = generateVerificationCode()

    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken: verificationCode,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24hr
    })

    await user.save()

    //generate jwt and parse to cookie
    generateJwtAndParseToCookie(res, user._id)

    //send verification code via email
    // await sendVerificationEmail(user.email, verificationCode)

    //response except password
    res.status(201).json({
      message: "User created! Please verify your email",
      status: "success",
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

//verify-email
export const verifyEmail = async (req, res) => {
  const { code } = req.body
  try {
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Please Enter your verification code",
      })
    }
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code!",
      })
    }

    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    user.isVerified = true

    await user.save()

    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong! Please try later",
    })
  }
}

//login
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    //check if user missed user and password
    if (!email || !password) {
      throw new Error("Please provide email and password")
    }

    //find user form DB
    const user = await User.findOne({ email })

    //check if user exist in the DB
    if (!user) {
      throw new Error("Invalid credintial")
    }

    //check if the password is valid
    const verifyPassword = await bcrypt.compare(password, user.password)
    if (!verifyPassword) {
      throw new Error("Invalid credintials")
    }
    //generate jwt and sign to cookie
    generateJwtAndParseToCookie(res, user._id)

    //update last login
    user.lastLogin = new Date()

    //save user data to DB
    await user.save()

    //response if success
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    //response if failed
    res.status(400).json({ success: false, message: error.message })
  }
}

//logout
export const logout = async (req, res) => {
  console.log(req.userId, res.userId)
  res.clearCookie("token")
  res.status(200).json({ success: true, message: "Logged out successfully!" })
}

//forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    //find if user exists
    if (!user) {
      throw new Error("User not found, invalid email address")
    }

    //generate token
    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 //1hr

    //save password reset data to DB
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = resetTokenExpiresAt

    await user.save()

    //send email and url
    await sendResetPassword(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    )

    //send response if success
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    })
  } catch (error) {
    //send response if failed
    res.status(404).json({ success: false, message: error.message })
  }
}

//reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  try {
    //check if password is provided
    if (!password) {
      throw new Error("Please provide a password")
    }
    //get user have a correct token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    })

    //if user not found
    if (!user) {
      throw new Error("Invalid or expired reset token")
    }

    //update password
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined

    //save to DB
    await user.save()

    //response if success
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    //response if fail
    res.status(404).json({ success: false, message: error.message })
  }
}

//check auth
export const checkAuth = async (req, res) => {
  try {
    //find user in the given id
    const user = await User.findById(req.userId).select("-password")

    // check if the user exist
    if (!user) {
      throw new Error("User not found")
    }

    //response if success
    res.status(200).json({ success: true, user })
  } catch (error) {
    //response if failed
    res.status(400).json({ success: false, message: error.message })
  }
}
