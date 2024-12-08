"use client";

import { useSave_plants_coordsMutation } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { Coords_Selector } from "@/app/Featuers/TreeOrder/TreeOrderSlice";
import { UserSelector } from "@/app/Featuers/Auth/AuthSlice";
import { useRouter } from "next/navigation";

const Map = dynamic(() => import("../LogTree/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

export default function UploadComponent() {
  const user = useSelector(UserSelector);
  const router = useRouter();
  const Plants_CurrentLocations = useSelector(Coords_Selector);
  const [
    Save_coords,
    { isLoading: isLoading_coords, isSuccess: is_coord_success },
  ] = useSave_plants_coordsMutation();

  const [formData, setFormData] = useState({
    description: "",
    bio: "", // Bio field can be written or chosen
    name: "",
    relation: "",
    imageUrl: "", // To store the uploaded image URL
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);
    if (user?._id) {
      try {
        Save_coords({
          imageURL: formData.imageUrl,
          name: formData.name,
          relation: formData.relation,
          bio: formData.bio,
          description: formData.description,
          late: Plants_CurrentLocations?.late!,
          long: Plants_CurrentLocations?.long!,
          find_id: "defgdgdgdggddg",
          UserId: user?._id,
          Plant_Addresses: Plants_CurrentLocations?.Address!,
        });
        console.log("Saved Plant Coordinates:");
      } catch (error) {
        console.error("Error saving plant coordinates:", error);
      }
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* Input Fields */}
      <div>
        <label htmlFor="description" className="block">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border w-full p-2"
          required
        />
      </div>

      {/* Bio Field with Datalist for Suggestions */}
      <div>
        <label htmlFor="bio" className="block">
          Bio (write or choose):
        </label>
        <input
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="border w-full p-2"
          list="bioOptions" // Link to datalist for predefined options
          placeholder="Write your bio or choose from options"
          required
        />
        <datalist id="bioOptions">
          <option value="Environmentalist" />
          <option value="Nature Enthusiast" />
          <option value="Tree Planter" />
          <option value="Gardener" />
        </datalist>
      </div>

      <div>
        <label htmlFor="name" className="block">
          Name:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border w-full p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="relation" className="block">
          Relation:
        </label>
        <select
          id="relation"
          name="relation"
          value={formData.relation}
          onChange={handleInputChange}
          className="border w-full p-2"
          required
        >
          <option value="">Select Relation</option>
          <option value="Friend">Friend</option>
          <option value="Family">Family</option>
          <option value="Colleague">Colleague</option>
          <option value="Neighbor">Neighbor</option>
        </select>
      </div>

      {/* Cloudinary Image Upload */}
      <div>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
          onSuccess={(result: any) => {
            setFormData((prev) => ({
              ...prev,
              imageUrl: result.info?.secure_url, // Save uploaded image URL
            }));
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              onClick={() => {
                open(); // Open the Cloudinary widget
              }}
            >
              Upload an Image
            </Button>
          )}
        </CldUploadWidget>
        {formData.imageUrl && (
          <p className="text-green-500 mt-2">
            Image Uploaded: {formData.imageUrl}
          </p>
        )}
      </div>

      <div className="h-64">
        <Map />
      </div>

      {/* Submit Button */}
      <Button type="submit">Submit</Button>
    </form>
  );
}
