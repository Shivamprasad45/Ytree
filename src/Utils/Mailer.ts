import Signup from "@/Models/SignupModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
const transport = nodemailer.createTransport({
  service: "gmail",
  port: 2525,
  auth: {
    user: "codewithharry35434@gmail.com",
    pass: "jphx akne ccrt twoo",
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
    from: '"Xplant 👻" <codewithharry35434@gmail.com>',
    to: Email,
    subject:
        Emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
    text:
        Emailtype === "VERIFY"
            ? "Please verify your email using the following code or link"
            : "Please reset your password using the following link",
    html: `
   <section style="max-width: 640px; padding: 24px; margin: 0 auto; background-color: white;">
    <header>
        <a href="#">
            <img style="width: auto; height: 28px;" src="https://merakiui.com/images/full-logo.svg" alt="Xplant Logo">
        </a>
    </header>

    <main style="margin-top: 32px;">
        <h2 style="color: #4B5563;">Hi there,</h2>

        <p style="margin-top: 8px; line-height: 1.75; color: #4B5563;">
            ${
              Emailtype === "VERIFY"
                ? `This is your verification link:`
                : `Click the button below to reset your password:`
            }
        </p>

        ${
          Emailtype === "VERIFY"
            ? `
        <p style="margin-top: 16px; line-height: 1.75; color: #4B5563;">
            This code will only be valid for the next 60 minutes. If the code does not work, you can use this login verification link:
        </p>
        <a href="https://greenfatuer.vercel.app/api/auth/verify?token=${hashToken}">
            <button style="padding: 8px 24px; margin-top: 24px; font-size: 14px; font-weight: 500; text-transform: capitalize; color: white; background-color: #2563EB; border-radius: 8px; border: none; cursor: pointer;">
                Verify email
            </button>
        </a>`
            : `
        <a href="https://greenfatuer.vercel.app/api/auth/reset?token=${hashToken}">
            <button style="padding: 8px 24px; margin-top: 24px; font-size: 14px; font-weight: 500; text-transform: capitalize; color: white; background-color: #2563EB; border-radius: 8px; border: none; cursor: pointer;">
                Reset Password
            </button>
        </a>`
        }

        <p style="margin-top: 32px; color: #4B5563;">
            Thanks, <br>
            Xplant team
        </p>
    </main>
    
    <footer style="margin-top: 32px;">
        <p style="color: #6B7280;">
            This email was sent to <a href="#" style="color: #2563EB; text-decoration: underline;" target="_blank">${Email}</a>. 
            If you'd rather not receive this kind of email, you can <a href="#" style="color: #2563EB; text-decoration: underline;">unsubscribe</a> or <a href="#" style="color: #2563EB; text-decoration: underline;">manage your email preferences</a>.
        </p>

        <p style="margin-top: 12px; color: #6B7280;">© ${new Date().getFullYear()} Xplant. All Rights Reserved.</p>
    </footer>
</section>

    `,
};

  const info = await transport.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
