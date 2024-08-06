// "use client";
// import { Button } from "@/components/ui/button";
// import React, { useRef, useState } from "react";

// const Page = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       }
//     } catch (err) {
//       console.error("Error accessing camera: ", err);
//     }
//   };

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const context = canvasRef.current.getContext("2d");
//       if (context) {
//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;
//         context.drawImage(
//           videoRef.current,
//           0,
//           0,
//           canvasRef.current.width,
//           canvasRef.current.height
//         );
//         const image = canvasRef.current.toDataURL("image/png");
//         setImageSrc(image);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="text-center mb-6">
//         <h1 className="text-black text-3xl font-bold">
//           take a picture with your pants place with plant
//         </h1>
//         <p className="text-red-500 text-xl font-bold">
//           warning: please take pic with your plant and at this place
//         </p>
//       </div>
//       <div className="flex flex-col items-center mb-6">
//         <div className="border-2 border-black w-64 h-64 flex items-center justify-center bg-gray-200">
//           {imageSrc ? (
//             <img src={imageSrc} className="w-full h-full object-cover" />
//           ) : (
//             <video ref={videoRef} className="w-full h-full" />
//           )}
//           <canvas ref={canvasRef} style={{ display: "none" }} />
//         </div>
//       </div>
//       <Button onClick={startCamera} className="mb-2">
//         Open Camera
//       </Button>
//       <Button onClick={captureImage}>Take Picture</Button>
//     </div>
//   );
// };

// export default Page;
