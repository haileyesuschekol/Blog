import {
  VERIFICATION_EMAIL_TEMPLET,
  PASSWORD_RESET_REQUEST_TEMPLET,
} from "./emailTemplet.js"
import { client, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }]

  try {
    if (email) {
      const response = await client.send({
        from: sender,
        to: recipient,
        subject: "Verifiy your email",
        html: VERIFICATION_EMAIL_TEMPLET.replace(
          "{verificationCode}",
          verificationCode
        ),
        category: "verify email",
      })
    } else {
      throw new Error("Error while sending verification email")
    }
  } catch (error) {
    console.log("error happening while sending verification email", error)
  }
}

export const sendResetPassword = async (email, resetUrl) => {
  const recipient = [{ email }]

  try {
    if (email) {
      const response = await client.send({
        from: sender,
        to: recipient,
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLET.replace("{resetURL}", resetUrl),
        category: "password reset success",
      })
    } else {
      throw new Error("Error while sending welcome email")
    }
  } catch (error) {
    console.log(error)
  }
}
