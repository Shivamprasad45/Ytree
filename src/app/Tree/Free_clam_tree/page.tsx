"use client";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Coords_Selector } from "@/app/Featuers/TreeOrder/TreeOrderSlice";
import { useFree_plants_clamMutation } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { toast } from "sonner";
import { UserSelector } from "@/app/Featuers/Auth/AuthSlice";
import { useRouter } from "next/navigation";
import PlantUnlockModal from "@/app/Components/PlantUnlock";
import Camera from "@/app/Components/Anothers/Camra";

const Map = dynamic(() => import("../LogTree/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-80 w-full" />,
});

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  reason: z
    .string()
    .min(10, "Please provide a detailed reason (min 10 characters)"),
  treeType: z.string({
    required_error: "Please select a tree type",
  }),
  imageUrl: z.string({
    required_error: "Please upload a photo as proof",
  }),
});

const TREE_TYPES = [
  {
    id: "tree2",
    name: "Neem Tree",
    image:
      "https://res.cloudinary.com/dn633knvv/image/upload/v1730888001/Neem_tree_3_ei3ww8.jpg",
  },
  {
    id: "tree3",
    name: "Peepal Tree",
    image:
      "https://res.cloudinary.com/dn633knvv/image/upload/v1730888019/518619119_Significance-of-the-Peepal-Tree-in-Hinduism_wc7bmn.jpg",
  },
  {
    id: "tree4",
    name: "Mango Tree",
    image:
      "https://res.cloudinary.com/dn633knvv/image/upload/v1730887982/e24b51c91f9d166061dedd2871f7678e_cvgupl.jpg",
  },

  {
    id: "tree7",
    name: "Gulmohar",
    image:
      "https://res.cloudinary.com/dn633knvv/image/upload/v1730888072/Gen-Gar-3_tjqpwk.png",
  },
];

const Free_clam = () => {
  const Plants_CurrentLocations = useSelector(Coords_Selector);
  const router = useRouter();
  const [getPlant, { data, isLoading, isError }] =
    useFree_plants_clamMutation();

  // Form state
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reason, setReason] = useState("");
  const [treeType, setTreeType] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State for the unlock celebration modal
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockedPlantName, setUnlockedPlantName] = useState("");

  // Handle API response
  useEffect(() => {
    if (data?.error) {
      toast.error(data.message);
    }

    if (data?.success) {
      // Find the selected tree type name
      const selectedTree = TREE_TYPES.find((tree) => tree.id === treeType);
      // Set the unlocked plant name and show the celebration modal
      if (!showUnlockModal) {
        setUnlockedPlantName(selectedTree?.name || "Free Tree");
        setShowUnlockModal(true);
        toast.success(data.message);
      }
    }
  }, [data, treeType, showUnlockModal]);

  // User data is available in form
  const user = useSelector(UserSelector);

  // Handle image selection from camera
  const handleImageSelected = (url: string) => {
    setImageUrl(url);
    // Clear any previous error for imageUrl
    if (errors.imageUrl) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.imageUrl;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name || name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!mobileNumber || mobileNumber.length < 10) {
      newErrors.mobileNumber = "Mobile number must be at least 10 digits";
    } else if (!/^\d+$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must contain only digits";
    }

    if (!reason || reason.length < 10) {
      newErrors.reason = "Please provide a detailed reason (min 10 characters)";
    }

    if (!treeType) {
      newErrors.treeType = "Please select a tree type";
    }

    if (!imageUrl) {
      newErrors.imageUrl = "Please upload a photo as proof";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user?.email) {
      router.push("/login");
      toast.error("Login first");
      return;
    }

    if (
      Plants_CurrentLocations?.late === undefined ||
      Plants_CurrentLocations?.long === undefined
    ) {
      console.error("Plant location coordinates are missing");
      toast.error("Please select a location on the map");
      return;
    }

    await getPlant({
      address: Plants_CurrentLocations.Address,
      email: user.email,
      late: Plants_CurrentLocations.late,
      long: Plants_CurrentLocations.long,
      reason: reason,
      mobil_number: mobileNumber,
      name: name,
      treeType: treeType,
      photoUrl: imageUrl, // Cloudinary URL from camera component
      findtree_id: treeType,
      UserId: user._id,
      Plaintid: "",
      district: Plants_CurrentLocations.district,
      state: Plants_CurrentLocations.state,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        Start your journey
      </h1>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="bg-green-50">
          <CardTitle className="text-green-700">Free Tree Claim Form</CardTitle>
        </CardHeader>

        <div className="h-80">
          <Map />
        </div>
        <div className="">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo Proof
            </label>
            <Camera onImageSelected={handleImageSelected} />

            {imageUrl && (
              <div className="mt-4">
                <p className="text-sm text-green-600 mb-2">
                  Image uploaded successfully!
                </p>
                <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Uploaded proof"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {errors.imageUrl && (
              <p className="text-sm text-red-500 mt-1">{errors.imageUrl}</p>
            )}
          </div>
        </div>
        <CardContent className="pt-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="tel"
                placeholder="Your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.mobileNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Tree Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {TREE_TYPES.map((tree) => (
                  <div key={tree.id} className="relative">
                    <input
                      type="radio"
                      id={tree.id}
                      name="treeType"
                      value={tree.id}
                      checked={treeType === tree.id}
                      onChange={() => setTreeType(tree.id)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={tree.id}
                      className={`flex flex-col items-center space-y-2 cursor-pointer p-2 rounded-md border-2 ${
                        treeType === tree.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={tree.image}
                        width={120}
                        height={120}
                        alt={tree.name}
                        className="rounded-md"
                      />
                      <span>{tree.name}</span>
                    </label>
                  </div>
                ))}
              </div>
              {errors.treeType && (
                <p className="text-sm text-red-500 mt-1">{errors.treeType}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Why do you want this tree plant?
              </label>
              <textarea
                id="reason"
                placeholder="Explain why you want this tree plant..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none min-h-[100px]"
              />
              {errors.reason && (
                <p className="text-sm text-red-500 mt-1">{errors.reason}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Claim Free Tree"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Plant Unlock Celebration Modal */}
      <PlantUnlockModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        plantName={unlockedPlantName}
      />
    </div>
  );
};

export default Free_clam;
