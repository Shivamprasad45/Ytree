// import { NextApiRequest, NextApiResponse } from "next";

// import { Image } from "@/models/Image"; // Adjust path based on your project structure
// import connectToDatabase from "@/lib/mongoose"; // Function to connect to MongoDB

// export default async function handler(
//   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   if (req.method === "POST") {
// //     try {
// //       await connectToDatabase();

// //       const { file } = req.body; // Expecting base64 image string
// //       const uploadResponse = await cloudinary.uploader.upload(file, {
// //         folder: "your_folder_name", // Replace with your folder name
// //       });

// //       // Save the URL to the database
// //       const newImage = await Image.create({ url: uploadResponse.secure_url });

// //       res.status(200).json({ success: true, image: newImage });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Image upload failed" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
