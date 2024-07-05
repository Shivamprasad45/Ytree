import Signup from "@/Models/SignupModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "31ce8d9f577599",
    pass: "d3ce8a10c77d50",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function Mail({ Email, Emailtype, UserId }: any) {
  const hashToken = await bcrypt.hash(UserId.toString(), 10);
  if (Emailtype === "VERIFY") {
    await Signup.findOneAndUpdate(UserId, {
      verifyToken: hashToken,
      verifyTokenExpiry: Date.now() + 3600000,
    });
  }
  if (Emailtype === "RESET") {
    await Signup.findOneAndUpdate(UserId, {
      forgotpasswordToken: hashToken,
      forgotpasswordTokenExpiry: Date.now() + 3600000,
    });
  }
  // send mail with defined transport object
  const mailOptions = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: Email,
    subject:
      Emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
    text:
      Emailtype === "VERIFY"
        ? "Please verify your email using the following link"
        : "Please reset your password using the following link",
    html:
      Emailtype === "VERIFY"
        ? `<b>Verify your email</b><br><a href="https://greenfatuer.vercel.app/api/auth/verify?token=${hashToken}">Verify</a>`
        : `<b>Reset your password</b><br><a href="https://greenfatuer.vercel.app/api/auth?reset?token=${hashToken}">Reset</a>`,
  };
  const info = await transport.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
