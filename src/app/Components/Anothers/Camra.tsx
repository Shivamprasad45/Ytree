"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Camera as CameraIcon,
  Download,
  X,
  Image as ImageIcon,
  Repeat,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CapturedImage {
  id: string;
  url: string;
  timestamp: number;
}

interface CameraProps {
  onImageSelected: (url: string) => void;
}

const Camera: React.FC<CameraProps> = ({ onImageSelected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">(
    "environment"
  );
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
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
        setCapturedImages((prev) => [
          {
            id: Date.now().toString(),
            url: imageDataUrl,
            timestamp: Date.now(),
          },
          ...prev,
        ]);
        toast.success("Photo captured!");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setCapturedImages((prev) => [
          {
            id: Date.now().toString(),
            url: imageUrl,
            timestamp: Date.now(),
          },
          ...prev,
        ]);
        toast.success("Image uploaded!");
        setShowUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (imageUrl: string) => {
    try {
      setIsUploading(true);
      const response = await fetch(imageUrl);
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
        setShowGallery(false);
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden bg-black">
      {!showGallery ? (
        <>
          <div className="relative h-64 bg-black">
            {!showUpload ? (
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
              <div className="h-full flex flex-col items-center justify-center gap-4 p-4">
                <Button
                  variant="outline"
                  className="text-white border-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Select Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  className="text-white"
                  onClick={() => setShowUpload(false)}
                >
                  Back to Camera
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center p-4 bg-black/90">
            <div className="flex gap-2">
              <Button
                variant="default"
                size="icon"
                className="rounded-full border-white text-white"
                onClick={() => setShowGallery(true)}
                disabled={capturedImages.length === 0}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="rounded-full border-white text-white"
                onClick={() => setShowUpload(!showUpload)}
              >
                <Upload className="h-5 w-5" />
              </Button>
            </div>

            {!showUpload && (
              <button
                className="h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center"
                onClick={capturePhoto}
              >
                <div className="h-12 w-12 rounded-full border-2 border-gray-600" />
              </button>
            )}

            <div className="flex gap-2">
              {!showUpload && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white text-white"
                  onClick={flipCamera}
                >
                  <Repeat className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="h-64 flex flex-col">
          <div className="flex justify-between items-center p-4 bg-black">
            <h2 className="text-white text-xl font-semibold">Your Photos</h2>
            <Button
              variant="outline"
              className="border-white text-white"
              onClick={() => setShowGallery(false)}
            >
              <CameraIcon className="mr-2 h-4 w-4" />
              Back to Camera
            </Button>
          </div>

          {capturedImages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-white">
              <CameraIcon className="h-16 w-16 opacity-50" />
              <p>No photos available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 p-2 overflow-y-auto flex-1">
              {capturedImages.map((image) => (
                <div
                  key={image.id}
                  className="relative rounded-md overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt="Captured"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 flex justify-around p-2 bg-black/50">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white h-8 w-8"
                      onClick={() => uploadToCloudinary(image.url)}
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white h-8 w-8"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = image.url;
                        link.download = `photo_${image.timestamp}.png`;
                        link.click();
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="default"
                      className="text-white h-8 w-8"
                      onClick={() =>
                        setCapturedImages((prev) =>
                          prev.filter((img) => img.id !== image.id)
                        )
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Camera;
