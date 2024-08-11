import Signup from "@/Models/SignupModel";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// Define your SMTP credentials in environment variables

const BREVO_SMTP_PORT = 587; // or 465 for SSL

// Configure Nodemailer with Brevo SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: BREVO_SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "7a1a80002@smtp-brevo.com",
    pass: "8jpFKkSmR1Vy4XqL",
  },
  logger: true, // Enable detailed logs
  debug: true, // Include debug output
});

export async function Mail({ Email, Emailtype, UserId }: any) {
  const hashToken = await bcrypt.hash(UserId.toString(), 10);

  // Update the user with the appropriate token
  if (Emailtype === "VERIFY") {
    await Signup.findOneAndUpdate(UserId, {
      verifyToken: hashToken,
      verifyTokenExpiry: Date.now() + 3600000, // 1 hour
    });
  } else if (Emailtype === "RESET") {
    await Signup.findOneAndUpdate(UserId, {
      forgotpasswordToken: hashToken,
      forgotpasswordTokenExpiry: Date.now() + 3600000, // 1 hour
    });
  }

  const emailContent = `
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

    `

  const mailOptions = {
    from: '"Xplant" <codewithharry35434@gmail.com>', // Sender address
    to: Email, // Recipient address
    subject: Emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
    html: emailContent, // Email content in HTML format
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
