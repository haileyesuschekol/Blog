import jwt from "jsonwebtoken"

export const generateJwtAndParseToCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })

  res.cookie("token", token, {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "strict",
    maxAge: 7 * 12 * 60 * 1000, //7days
  })

  return token
}
