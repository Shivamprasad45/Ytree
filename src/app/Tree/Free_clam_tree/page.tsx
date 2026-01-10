"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  MapPin,
  Camera as CameraIcon,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
// import Camera from "@/app/Components/Anothers/Camra";
// import { motion } from "framer-motion";
// import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { Coords_Selector } from "@/app/Featuers/TreeOrder/TreeOrderSlice";
import { useFree_plants_clamMutation } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { UserSelector } from "@/app/Featuers/Auth/AuthSlice";
import { useRouter } from "next/navigation"; // Fixed import for App Router

// const Map = dynamic(() => import("../LogTree/Map"), {
//   ssr: false,
// });

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
}

// interface LocationType {
//   Address?: string;
//   late?: number;
//   long?: number;
//   district?: string;
//   state?: string;
// }

const Index = () => {
  const { toast } = useToast();
  // const Plants_CurrentLocations = useSelector(Coords_Selector);
  const router = useRouter();
  // Form state
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reason, setReason] = useState("");
  const [treeType, setTreeType] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [completedSteps, setCompletedSteps] = useState<CompletedSteps>({
    personalInfo: false,
    treeSelection: false,
  });
  const [formDataRestored, setFormDataRestored] = useState(false);

  const [FreeClam, { data, isLoading, isSuccess }] =
    useFree_plants_clamMutation();
  const user = useSelector(UserSelector);

  // Initialize location with empty object to prevent null/undefined errors
  // const [location, setLocation] = useState<LocationType>({});

  // Handle successful submission and navigation

  useEffect(() => {
    if (data?.error) {
      router.push("/Tree/Shop");
    }

    if (data?.success) {
      toast({
        title: "Tree Claim Submitted!",
        description: "Your tree claim has been successfully submitted",
      });
      // Clear localStorage after successful submission
      localStorage.removeItem("treeClaimFormData");

      // Show success toast

      // Navigate to the my trees page
      router.push("/Tree/Mytrees");
    }
  }, [isSuccess, router, toast]);

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    if (!formDataRestored) {
      try {
        const savedFormData = localStorage.getItem("treeClaimFormData");
        if (savedFormData) {
          const formData = JSON.parse(savedFormData);
          setName(formData.name || "");
          setMobileNumber(formData.mobileNumber || "");
          setReason(formData.reason || "");
          setTreeType(formData.treeType || "");
          // setImageUrl(formData.imageUrl || "");
          setStep(formData.step || 1);

          // Safely restore location data
          // if (formData.location) {
          //   setLocation(formData.location);
          // }

          setCompletedSteps(
            formData.completedSteps || {
              personalInfo: false,
              treeSelection: false,
            }
          );
          toast({
            title: "Form Data Restored",
            description: "Your progress has been restored",
          });
        }
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
      setFormDataRestored(true);
    }
  }, [formDataRestored, toast]);

  // Save form data to localStorage whenever relevant state changes
  useEffect(() => {
    if (formDataRestored) {
      const formData = {
        name,
        mobileNumber,
        reason,
        treeType,
        step,
        completedSteps,
      };
      localStorage.setItem("treeClaimFormData", JSON.stringify(formData));
    }
  }, [
    name,
    mobileNumber,
    reason,
    treeType,

    step,

    completedSteps,
    formDataRestored,
  ]);

  // Handle image selection
  // const handleImageSelected = (url: string): void => {
  //   setImageUrl(url);
  //   if (errors.imageUrl) {
  //     setErrors((prev) => {
  //       const newErrors = { ...prev };
  //       delete newErrors.imageUrl;
  //       return newErrors;
  //     });
  //   }
  //   setCompletedSteps((prev) => ({
  //     ...prev,
  //     photoUpload: true,
  //   }));
  // };

  const validateStep = (currentStep: number): boolean => {
    console.log(currentStep);
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
      setCompletedSteps((prev) => ({
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
      setCompletedSteps((prev) => ({
        ...prev,
        treeSelection: !Object.keys(newErrors).length,
      }));
    }

    // if (currentStep === 3) {
    //   if (
    //     !location ||
    //     location.late === undefined ||
    //     location.long === undefined
    //   ) {
    //     newErrors.location = "Please select a location on the map";
    //   } else {
    //     setCompletedSteps((prev) => ({
    //       ...prev,
    //       locationSelection: true,
    //     }));
    //   }
    // }

    // if (currentStep === 4) {
    //   if (!imageUrl) {
    //     newErrors.imageUrl = "Please upload a photo as proof";
    //   }
    // }

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
    }
    if (!validateStep(2)) {
      return;
    }

    await FreeClam({
      mobil_number: mobileNumber,
      findtree_id: treeType, // Assuming treeType corresponds to the tree ID
      email: user?.email || "", // Replace with actual email input
      name: name || "",
      reason: reason,

      Plaintid: "",
      UserId: user?._id || "",
      treeType,
    });

    // Note: We don't need to handle success here as it's now moved to the useEffect
  };

  // Function to get the selected tree info
  const getSelectedTreeInfo = () => {
    return TREE_TYPES.find((tree) => tree.id === treeType);
  };

  const selectedTree = getSelectedTreeInfo();

  // Calculate progress percentage
  const getProgressPercentage = () => {
    const stepsCompleted = Object.values(completedSteps).filter(Boolean).length;
    return (stepsCompleted / 2) * 100;
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2].map((stepNum) => (
            <div
              key={stepNum}
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${step >= stepNum
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
                }`}
            >
              {stepNum}
            </div>
          ))}
        </div>
        <div className=" bg-muted rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1 text-muted-foreground">
          <span>Your Info</span>
          <span>Tree Choice</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-background min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Start Your Green Journey
        </h1>
        <p className="text-muted-foreground mt-2">
          Join thousands of tree lovers making our planet greener!
        </p>
      </div>

      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-primary/10 border-b border-border">
          <div className="flex items-center">
            <Leaf className="w-6 h-6 text-primary mr-2" />
            <CardTitle className="text-primary">
              Free Tree Claim Form
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {renderStepIndicator()}

          <form onSubmit={onSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-primary mb-4">
                  Tell us about yourself
                </h2>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="What should we call you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-border bg-input text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="mobileNumber"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobileNumber"
                    type="tel"
                    placeholder="We'll update you about your tree"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-border bg-input text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.mobileNumber && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

                <div className="p-4 bg-muted rounded-lg border border-border text-foreground">
                  <p className="text-sm">
                    🌱 <span className="font-medium">Exciting fact:</span> A
                    single tree can absorb as much as 48 pounds of carbon
                    dioxide per year!
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-primary mb-4">
                  Choose your tree companion
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
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
                          className={`flex flex-col items-center space-y-2 cursor-pointer p-3 rounded-md border-2 transition-all ${treeType === tree.id
                              ? "border-primary bg-primary/10 shadow-md"
                              : "border-border hover:border-primary/50"
                            }`}
                        >
                          <div className="relative overflow-hidden rounded-md h-32 w-full">
                            <img
                              src={tree.image}
                              alt={tree.name}
                              className="object-cover h-full w-full transition-transform hover:scale-110 duration-300"
                            />
                          </div>
                          <span className="font-medium text-foreground">{tree.name}</span>
                          {treeType === tree.id && (
                            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                              <CheckCircle2 size={16} />
                            </div>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.treeType && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.treeType}
                    </p>
                  )}
                </div>

                {selectedTree && (
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <h3 className="font-medium text-primary">
                      {selectedTree.name} Benefits:
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedTree.benefits}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      CO₂ Absorption: {selectedTree.co2}
                    </p>
                  </div>
                )}

                <div className="mb-4">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Why do you want to plant this tree?
                  </label>
                  <textarea
                    id="reason"
                    placeholder="Share your story and motivation..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-border bg-input text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none min-h-[100px]"
                  />
                  {errors.reason && (
                    <p className="text-sm text-destructive mt-1">{errors.reason}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Back
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  className="bg-primary hover:bg-primary/90 ml-auto"
                  onClick={nextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 ml-auto flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing..."
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

export default Index;
