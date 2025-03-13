import User from "@/Models/Free_tree";
import DbConnect from "@/Utils/mongooesConnect";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); // Set API Key from .env

export async function POST(req: NextRequest) {
  try {
    await DbConnect();

    const { address, email, late, long, reason, mobil_number, name } =
      await req.json();

    const verify = await User.findOne({ email });

    if (verify) {
      return NextResponse.json({
        message: "You have already claimed one. Please buy instead.",
        error: "conflict",
      });
    } else {
      await User.create({
        email,
        address,
        late,
        long,
        reason,
        mobil_number,
        name,
      });

      // Send Email Notification using Resend
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev", // Must be a verified sender
        to: "codewithharry35434@gmail.com", // Your admin email
        subject: "New Free Tree Claimed!",
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; }
        .header { background: #2c5f2d; padding: 30px; text-align: center; }
        .logo { max-width: 150px; height: auto; }
        .content { padding: 30px; color: #444; }
        .detail-item { margin: 15px 0; padding: 10px; background: #f8f8f8; border-radius: 5px; }
        .map-button { 
            display: inline-block; 
            padding: 10px 20px; 
            background: #2c5f2d; 
            color: white !important; 
            text-decoration: none; 
            border-radius: 5px; 
            margin-top: 10px;
        }
        .footer { 
            text-align: center; 
            padding: 20px; 
            background: #e8f5e9; 
            color: #666; 
            font-size: 12px;
        }
        .icon { 
            width: 18px; 
            height: 18px; 
            vertical-align: middle; 
            margin-right: 8px; 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://example.com/logo.png" class="logo" alt="Tree Planting Logo">
        </div>
        
        <div class="content">
            <h2 style="color: #2c5f2d; margin-top: 0;">New Tree Planting Request 🌱</h2>
            
            <div class="detail-item">
                <img src="https://img.icons8.com/fluency/48/user.png" class="icon" alt="User">
                <strong>Name:</strong> ${name}
            </div>
            
            <div class="detail-item">
                <img src="https://img.icons8.com/color/48/email.png" class="icon" alt="Email">
                <strong>Email:</strong> ${email}
            </div>
            
            <div class="detail-item">
                <img src="https://img.icons8.com/color/48/phone.png" class="icon" alt="Phone">
                <strong>Phone:</strong> ${mobil_number}
            </div>
            
            <div class="detail-item">
                <img src="https://img.icons8.com/color/48/address.png" class="icon" alt="Address">
                <strong>Address:</strong> ${address}
            </div>
            
            <div class="detail-item">
                <img src="https://img.icons8.com/color/48/idea.png" class="icon" alt="Reason">
                <strong>Planting Reason:</strong> ${reason}
            </div>
            
            <h3 style="margin-top: 25px; color: #2c5f2d;">Planting Location 🌍</h3>
            <p>Coordinates: (${late}, ${long})</p>
            <a href="https://www.google.com/maps?q=${late},${long}" 
               class="map-button">
                View on Google Maps
            </a>
        </div>
        
        <div class="footer">
            <p>This is an automated notification - please do not reply</p>
            <p>© ${new Date().getFullYear()} Green Initiative Program</p>
            <p style="margin-top: 10px;">
                <a href="https://twitter.com/greeninitiative" style="color: #2c5f2d; text-decoration: none;">Twitter</a> | 
                <a href="https://facebook.com/greeninitiative" style="color: #2c5f2d; text-decoration: none;">Facebook</a>
            </p>
        </div>
    </div>
</body>
</html>
`,
      });

      if (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
          { message: "User created, but email notification failed" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Free tree claimed successfully! Notification sent.",
        success: true,
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
