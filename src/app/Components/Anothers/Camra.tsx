"use client";
import React, { useRef, useState, useEffect } from "react";
import { Camera as CameraIcon, Upload, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CameraProps {
  onImageSelected: (url: string) => void;
}

const Camera: React.FC<CameraProps> = ({ onImageSelected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">(
    "environment"
  );
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraFacing]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      console.error("Camera error:", err);
      toast.error("Camera access denied");
    }
  };

  const flipCamera = () => {
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setCameraFacing((prev) => (prev === "user" ? "environment" : "user"));
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        if (cameraFacing === "user") {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL("image/png");
        setCapturedImageUrl(imageDataUrl);
        toast.success("Photo captured!");
      }
    }
  };

  const uploadToCloudinary = async () => {
    if (!capturedImageUrl) return;

    try {
      setIsUploading(true);
      const response = await fetch(capturedImageUrl);
      const blob = await response.blob();
      const formData = new FormData();

      formData.append("file", blob, `photo_${Date.now()}.png`);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET!
      );

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await uploadResponse.json();
      if (data.secure_url) {
        onImageSelected(data.secure_url);
        toast.success("Uploaded to Cloudinary!");
        // Reset to camera view
        setCapturedImageUrl(null);
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const resetCamera = () => {
    setCapturedImageUrl(null);
  };

  return (
    <div className="border rounded-md overflow-hidden bg-black">
      <div className="relative h-64 bg-black">
        {!capturedImageUrl ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{
              transform: cameraFacing === "user" ? "scaleX(-1)" : "none",
            }}
          />
        ) : (
          <img
            src={capturedImageUrl}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex justify-center items-center p-4 bg-black/90">
        {!capturedImageUrl ? (
          <div className="flex justify-between items-center w-full">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white text-white"
              onClick={flipCamera}
            >
              <Repeat className="h-5 w-5" />
            </Button>
            <button
              className="h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center"
              onClick={capturePhoto}
            >
              <div className="h-12 w-12 rounded-full border-2 border-gray-600" />
            </button>
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-white text-white"
              onClick={resetCamera}
            >
              <CameraIcon className="mr-2 h-4 w-4" />
              Retake
            </Button>

            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={uploadToCloudinary}
              disabled={isUploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload to Cloudinary"}
            </Button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Camera;
