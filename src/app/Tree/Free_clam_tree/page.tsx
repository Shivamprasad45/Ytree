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
import Camera from "@/app/Components/Anothers/Camra";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Leaf,
  MapPin,
  Camera as CameraIcon,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";

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
    benefits: "Air purifier, medicinal properties",
    co2: "40kg per year",
  },
  {
    id: "tree3",
    name: "Peepal Tree",
    image:
      "https://res.cloudinary.com/dn633knvv/image/upload/v1730888019/518619119_Significance-of-the-Peepal-Tree-in-Hinduism_wc7bmn.jpg",
    benefits: "Oxygen provider, cultural significance",
    co2: "60kg per year",
  },
  {
    id: "tree4",
    name: "Mango Tree",
    image:
      "https://res.cloudinary.com/dn633knvv/image/upload/v1730887982/e24b51c91f9d166061dedd2871f7678e_cvgupl.jpg",
    benefits: "Fruit bearing, shade provider",
    co2: "35kg per year",
  },
  {
    id: "tree7",
    name: "Gulmohar",
    image:
      "https://res.cloudinary.com/dn633knvv/image/upload/v1730888072/Gen-Gar-3_tjqpwk.png",
    benefits: "Beautiful flowers, attracting pollinators",
    co2: "30kg per year",
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
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [completedSteps, setCompletedSteps] = useState({
    personalInfo: false,
    treeSelection: false,
    locationSelection: false,
    photoUpload: false,
  });

  // Handle API response
  useEffect(() => {
    if (data?.error) {
      toast.error(data.message);
      router.push("/Tree/Shop");
    }

    if (data?.success) {
      launchConfetti();
      toast.success(data.success);
      router.push("/Tree/Mytrees");
    }
  }, [data, router]);

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // User data
  const user = useSelector(UserSelector);

  interface HandleImageSelectedParams {
    url: string;
  }

  const handleImageSelected = (url: HandleImageSelectedParams["url"]): void => {
    setImageUrl(url);
    if (errors.imageUrl) {
      setErrors((prev: Errors) => {
        const newErrors: Errors = { ...prev };
        delete newErrors.imageUrl;
        return newErrors;
      });
    }
    setCompletedSteps((prev: CompletedSteps) => ({
      ...prev,
      photoUpload: true,
    }));
  };

  interface Errors {
    name?: string;
    mobileNumber?: string;
    treeType?: string;
    reason?: string;
    location?: string;
    imageUrl?: string;
    [key: string]: string | undefined;
  }

  interface CompletedSteps {
    personalInfo: boolean;
    treeSelection: boolean;
    locationSelection: boolean;
    photoUpload: boolean;
  }

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Errors = {};

    if (currentStep === 1) {
      if (!name || name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
      if (!mobileNumber || mobileNumber.length < 10) {
        newErrors.mobileNumber = "Mobile number must be at least 10 digits";
      } else if (!/^\d+$/.test(mobileNumber)) {
        newErrors.mobileNumber = "Mobile number must contain only digits";
      }
      setCompletedSteps((prev: CompletedSteps) => ({
        ...prev,
        personalInfo: !Object.keys(newErrors).length,
      }));
    }

    if (currentStep === 2) {
      if (!treeType) {
        newErrors.treeType = "Please select a tree type";
      }
      if (!reason || reason.length < 10) {
        newErrors.reason =
          "Please provide a detailed reason (min 10 characters)";
      }
      setCompletedSteps((prev: CompletedSteps) => ({
        ...prev,
        treeSelection: !Object.keys(newErrors).length,
      }));
    }

    if (currentStep === 3) {
      if (
        Plants_CurrentLocations?.late === undefined ||
        Plants_CurrentLocations?.long === undefined
      ) {
        newErrors.location = "Please select a location on the map";
      } else {
        setCompletedSteps((prev: CompletedSteps) => ({
          ...prev,
          locationSelection: true,
        }));
      }
    }

    if (currentStep === 4) {
      if (!imageUrl) {
        newErrors.imageUrl = "Please upload a photo as proof";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  interface SubmitData {
    address: string;
    email: string;
    late: number;
    long: number;
    reason: string;
    mobil_number: string;
    name: string;
    treeType: string;
    photoUrl: string;
    findtree_id: string;
    UserId: string;
    Plaintid: string;
    district: string;
    state: string;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStep(4)) {
      return;
    }

    if (!user?.email) {
      router.push("/login");
      toast.error("Login first");
      return;
    }

    const submitData: SubmitData = {
      address: Plants_CurrentLocations?.Address || "",
      email: user.email,
      late: Plants_CurrentLocations?.late ?? 0,
      long: Plants_CurrentLocations?.long ?? 0,
      reason: reason,
      mobil_number: mobileNumber,
      name: name,
      treeType: treeType,
      photoUrl: imageUrl,
      findtree_id: treeType,
      UserId: user._id,
      Plaintid: "",
      district: Plants_CurrentLocations?.district || "",
      state: Plants_CurrentLocations?.state ?? "",
    };

    await getPlant(submitData);
  };

  // Function to get the selected tree info
  const getSelectedTreeInfo = () => {
    return TREE_TYPES.find((tree) => tree.id === treeType);
  };

  const selectedTree = getSelectedTreeInfo();

  // Calculate progress percentage
  const getProgressPercentage = () => {
    const stepsCompleted = Object.values(completedSteps).filter(Boolean).length;
    return (stepsCompleted / 4) * 100;
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4].map((stepNum) => (
            <motion.div
              key={stepNum}
              initial={{ scale: 0.8 }}
              animate={{
                scale: step === stepNum ? 1.2 : 1,
                backgroundColor:
                  step >= stepNum ? "rgb(34, 197, 94)" : "rgb(229, 231, 235)",
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNum
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNum}
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="bg-green-500 h-2.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-600">
          <span>Your Info</span>
          <span>Tree Choice</span>
          <span>Location</span>
          <span>Photo</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-green-700">
          Start Your Green Journey
        </h1>
        <p className="text-gray-600 mt-2">
          Join thousands of tree lovers making our planet greener!
        </p>
      </motion.div>

      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-green-100 border-b border-green-200">
          <div className="flex items-center">
            <Leaf className="w-6 h-6 text-green-600 mr-2" />
            <CardTitle className="text-green-700">
              Free Tree Claim Form
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {renderStepIndicator()}

          <form onSubmit={onSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium text-green-700 mb-4">
                  Tell us about yourself
                </h2>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="What should we call you?"
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
                    placeholder="We'll update you about your tree"
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

                <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-gray-700">
                  <p className="text-sm">
                    🌱 <span className="font-medium">Exciting fact:</span> A
                    single tree can absorb as much as 48 pounds of carbon
                    dioxide per year!
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium text-green-700 mb-4">
                  Choose your tree companion
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Tree Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {TREE_TYPES.map((tree) => (
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        key={tree.id}
                        className="relative"
                      >
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
                          className={`flex flex-col items-center space-y-2 cursor-pointer p-3 rounded-md border-2 transition-all ${
                            treeType === tree.id
                              ? "border-green-500 bg-green-50 shadow-md"
                              : "border-gray-200 hover:border-green-200"
                          }`}
                        >
                          <div className="relative overflow-hidden rounded-md h-32 w-full">
                            <img
                              src={tree.image}
                              alt={tree.name}
                              className="object-cover h-full w-full transition-transform hover:scale-110 duration-300"
                            />
                          </div>
                          <span className="font-medium">{tree.name}</span>
                          {treeType === tree.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1"
                            >
                              <CheckCircle2 size={16} />
                            </motion.div>
                          )}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                  {errors.treeType && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.treeType}
                    </p>
                  )}
                </div>

                {selectedTree && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 rounded-lg border border-green-100"
                  >
                    <h3 className="font-medium text-green-700">
                      {selectedTree.name} Benefits:
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedTree.benefits}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      CO₂ Absorption: {selectedTree.co2}
                    </p>
                  </motion.div>
                )}

                <div className="mb-4">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Why do you want to plant this tree?
                  </label>
                  <textarea
                    id="reason"
                    placeholder="Share your story and motivation..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none min-h-[100px]"
                  />
                  {errors.reason && (
                    <p className="text-sm text-red-500 mt-1">{errors.reason}</p>
                  )}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium text-green-700 flex items-center mb-4">
                  <MapPin className="mr-2 h-5 w-5" /> Where will your tree
                  thrive?
                </h2>

                <div className="bg-white p-2 rounded-lg border border-gray-200 h-80">
                  <Map />
                </div>

                {Plants_CurrentLocations?.Address && (
                  <div className="p-3 bg-green-50 rounded-lg text-sm">
                    <p className="font-medium text-green-700">
                      Selected Location:
                    </p>
                    <p className="text-gray-700">
                      {Plants_CurrentLocations.Address}
                    </p>
                  </div>
                )}

                {errors.location && (
                  <p className="text-sm text-red-500 mt-1">{errors.location}</p>
                )}

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-gray-700">
                  <p className="text-sm">
                    💡 <span className="font-medium">Tip:</span> Zoom in and
                    click precisely where you want to plant your tree!
                  </p>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-medium text-green-700 flex items-center mb-4">
                  <CameraIcon className="mr-2 h-5 w-5" /> Upload Photo Proof
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <Camera onImageSelected={handleImageSelected} />
                </div>

                {imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4"
                  >
                    <p className="text-sm text-green-600 mb-2 flex items-center">
                      <CheckCircle2 className="mr-1 h-4 w-4" /> Image uploaded
                      successfully!
                    </p>
                    <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={imageUrl}
                        alt="Uploaded proof"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                )}

                {errors.imageUrl && (
                  <p className="text-sm text-red-500 mt-1">{errors.imageUrl}</p>
                )}

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-700 mb-2">
                    Your Tree Planting Summary:
                  </h3>
                  {selectedTree && (
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Tree Type: {selectedTree.name}</li>
                      <li>
                        • Location:{" "}
                        {Plants_CurrentLocations?.Address || "Not selected yet"}
                      </li>
                      <li>• Your Name: {name}</li>
                    </ul>
                  )}
                </div>
              </motion.div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Back
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 ml-auto"
                  onClick={nextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 ml-auto flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Claim Your Free Tree
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Free_clam;
