import bcrypt from "bcryptjs"
import User from "../models/user.model"

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
    await sendVerificationEmail(user.email, verificationCode)

    //response except password
    res.status(201).json({
      message: "User created successfully!",
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
      throw new Error("Please send your verification code")
    }
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    })

    if (!user) {
      throw new Error("Invalid or expired verification code!")
    }

    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    user.isVerified = true

    await user.save()

    res
      .status(200)
      .json({ success: true, message: "email verified successfully" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export const login = (req, res) => {}
export const forgotPassword = (req, res) => {}
export const resetPassword = (req, res) => {}
export const logout = (req, res) => {}
export const checkAuth = (req, res) => {}
