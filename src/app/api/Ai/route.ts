// // pages/api/chat.js
// import { NextApiRequest, NextApiResponse } from "next";
// import { OpenAI } from "openai";

// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });
// const openai = new OpenAI();

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { message } = req.body;

//   if (req.method !== "POST") {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//     return;
//   }

//   if (!message) {
//     res.status(400).json({ error: "Message is required" });
//     return;
//   }

//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: "You are a helpful assistant." }],
//       model: "gpt-3.5-turbo",
//     });

//     console.log(completion.choices[0]);

//     res.status(200).json({ message: "hi" });
//   } catch (error: any) {
//     res.json({ error: error.message });
//   }
// }
