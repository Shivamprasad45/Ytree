"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

import { toast } from "sonner";
import { useAddCartMutation } from "@/app/Featuers/Treecart/TreeServicesAPI";

import Map from "@/app/Components/Mapregion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { TreeCart, TreeInfo } from "../../../type";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Droplet, Leaf, MapPin, Sun } from "lucide-react";

const Page = ({ PlantDetails }: { PlantDetails: TreeInfo }) => {
  const { data: user, status } = useSession();
  //For redirect to Login or signup
  const route = useRouter();
  const [AddPlants, { isLoading: isAddLoading }] = useAddCartMutation();
  //for user reload

  const Addtocart = async () => {
    try {
      if (user?.user.id) {
        const benefits: string[] = [];
        PlantDetails?.benefits.forEach((item: string) => {
          benefits.push(item);
        });

        const treeDetails: TreeCart = {
          UserId: user.user.id,
          Plant_id: PlantDetails?._id || "",
          commonName: PlantDetails?.commonName || "",
          scientificName: PlantDetails?.scientificName || "",
          description: PlantDetails?.description || "",
          price: PlantDetails?.price || 45,
          imageURL: PlantDetails?.imageURL || "",

          region: PlantDetails?.region || "",
          benefits: benefits || [],
          growthRequirements: PlantDetails?.growthRequirements || "",
          quantity: 1,
        };
        await AddPlants(treeDetails);
      } else {
        toast("User id not found please Signup");
        route.push("/Signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-row">
      {/* <div className="relative flex size-full min-h-screen flex-col  group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 md:max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className=" tracking-light text-[32px] font-bold leading-tight min-w-72">
                  {PlantDetails?.commonName}
                </p>
              </div>
              <div className="@[480px]:px-4 @[480px]:py-3">
                <Image
                  width={1000}
                  height={200}
                  className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#F9FAFA] max-h-64 rounded-xl"
                  alt="sf"
                  src="https://cdn.usegalileo.ai/stability/64c93ee4-25fc-4c96-936f-f479b3a31c60.png"
                />
              </div>

              <h2 className=" text-lg font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-2 pt-4">
                {PlantDetails?.scientificName}
              </h2>
              <p className=" text-base font-normal leading-normal pb-3 pt-1 px-4">
                {PlantDetails?.description}
              </p>
              <h3 className=" text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Growth Requirements
              </h3>
              <div className="p-4 ">
                <div className="flex flex-col gap-1 border-t border-solid border-t-[#D5D6DD] py-4 pr-2">
                  {/* <p className="] text-sm font-normal leading-normal">
                    Light
                  </p> */}
      {/* <p className=" text-sm font-normal leading-normal">
                    {PlantDetails?.growthRequirements}
                  </p>
                </div> */}
      {/* <div className="flex flex-col gap-1 border-t border-solid border-t-[#D5D6DD] py-4 pl-2">
                  <p className="] text-sm font-normal leading-normal">
                    Water
                  </p>
                  <p className=" text-sm font-normal leading-normal">
                    Water when top 1-2 inches of soil is dry
                  </p>
                </div> */}
      {/* <div className="flex flex-col gap-1 border-t border-solid border-t-[#D5D6DD] py-4 pr-2">
                  <p className="] text-sm font-normal leading-normal">
                    Humidity
                  </p>
                  <p className=" text-sm font-normal leading-normal">
                    Prefers high humidity
                  </p>
                </div> */}
      {/* <div className="flex flex-col gap-1 border-t border-solid border-t-[#D5D6DD] py-4 pl-2">
                  <p className="] text-sm font-normal leading-normal">
                    Temperature
                  </p>
                  <p className=" text-sm font-normal leading-normal">
                    65-75°F (18-24°C)
                  </p>
                </div> */}
      {/* </div>
              <h3 className=" text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Benefits
              </h3>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#D5D6DD]  p-4 flex-col">
                  <div
                    className=""
                    data-icon="Sun"
                    data-size="24px"
                    data-weight="regular"
                  > */}
      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className=" text-base font-bold leading-tight">
                      Light
                    </h2>
                    <p className="] text-sm font-normal leading-normal">
                      Bright, indirect light
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#D5D6DD] p-4 flex-col">
                  <div
                    className=""
                    data-icon="Drop"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className=" text-base font-bold leading-tight">
                      Water
                    </h2>
                    <p className="] text-sm font-normal leading-normal">
                      {PlantDetails.benefits[0]}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#D5D6DD]  p-4 flex-col">
                  <div
                    className=""
                    data-icon="Flower"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M210.35,129.36c-.81-.47-1.7-.92-2.62-1.36.92-.44,1.81-.89,2.62-1.36a40,40,0,1,0-40-69.28c-.81.47-1.65,1-2.48,1.59.08-1,.13-2,.13-3a40,40,0,0,0-80,0c0,.94,0,1.94.13,3-.83-.57-1.67-1.12-2.48-1.59a40,40,0,1,0-40,69.28c.81.47,1.7.92,2.62,1.36-.92.44-1.81.89-2.62,1.36a40,40,0,1,0,40,69.28c.81-.47,1.65-1,2.48-1.59-.08,1-.13,2-.13,2.95a40,40,0,0,0,80,0c0-.94-.05-1.94-.13-2.95.83.57,1.67,1.12,2.48,1.59A39.79,39.79,0,0,0,190.29,204a40.43,40.43,0,0,0,10.42-1.38,40,40,0,0,0,9.64-73.28ZM104,128a24,24,0,1,1,24,24A24,24,0,0,1,104,128Zm74.35-56.79a24,24,0,1,1,24,41.57c-6.27,3.63-18.61,6.13-35.16,7.19A40,40,0,0,0,154.53,98.1C163.73,84.28,172.08,74.84,178.35,71.21ZM128,32a24,24,0,0,1,24,24c0,7.24-4,19.19-11.36,34.06a39.81,39.81,0,0,0-25.28,0C108,75.19,104,63.24,104,56A24,24,0,0,1,128,32ZM44.86,80a24,24,0,0,1,32.79-8.79c6.27,3.63,14.62,13.07,23.82,26.89A40,40,0,0,0,88.81,120c-16.55-1.06-28.89-3.56-35.16-7.18A24,24,0,0,1,44.86,80ZM77.65,184.79a24,24,0,1,1-24-41.57c6.27-3.63,18.61-6.13,35.16-7.19a40,40,0,0,0,12.66,21.87C92.27,171.72,83.92,181.16,77.65,184.79ZM128,224a24,24,0,0,1-24-24c0-7.24,4-19.19,11.36-34.06a39.81,39.81,0,0,0,25.28,0C148,180.81,152,192.76,152,200A24,24,0,0,1,128,224Zm83.14-48a24,24,0,0,1-32.79,8.79c-6.27-3.63-14.62-13.07-23.82-26.89A40,40,0,0,0,167.19,136c16.55,1.06,28.89,3.56,35.16,7.18A24,24,0,0,1,211.14,176Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className=" text-base font-bold leading-tight">
                      Humidity
                    </h2>
                    <p className=" text-sm font-normal leading-normal">
                      {PlantDetails.growthTips}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#D5D6DD]  p-4 flex-col">
                  <div
                    className=""
                    data-icon="Leaf"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className=" text-base font-bold leading-tight">
                      Temperature
                    </h2>
                    <p className="] text-sm font-normal leading-normal">
                      65-75°F (18-24°C)
                    </p>
                  </div>
                </div>
              </div>
              <h3 className=" text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Region
              </h3>
              <div className="flex px-4 py-3">
                <div className=" w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl object-cover">
                  <Map searchQuery={PlantDetails?.region} />
                </div>
              </div>
              <div className="flex justify-stretch">
                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                  <Button onClick={() => Addtocart()}>
                    <span>Add to cart</span>
                  </Button>
                  <Button className="">
                    <span className="truncate">
                      <Link href="/Tree/Shop"> Back to Plants</Link>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={
                "https://cdn.usegalileo.ai/stability/64c93ee4-25fc-4c96-936f-f479b3a31c60.png"
              }
              alt={PlantDetails.commonName}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {PlantDetails.commonName}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {PlantDetails.scientificName}
            </p>
            <Badge className="mb-4">Native to {PlantDetails.region}</Badge>
            <p className="text-lg mb-4">{PlantDetails.description}</p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold">
                ₹{PlantDetails.price.toFixed(2)}
              </span>
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                <Button onClick={() => Addtocart()}>
                  <span>Add to cart</span>
                </Button>
                <Button className="">
                  <span className="truncate">
                    <Link href="/Tree/Shop"> Back to Plants</Link>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Growth Requirements</h2>
            <p>{PlantDetails.growthRequirements}</p>
            <div className="mt-4 flex space-x-4">
              <div className="flex items-center">
                <Sun className="mr-2 h-5 w-5 text-yellow-500" />
                <span>Full Sun</span>
              </div>
              <div className="flex items-center">
                <Droplet className="mr-2 h-5 w-5 text-blue-500" />
                <span>Regular Watering</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Growth Tips</h2>
            <p>{PlantDetails.growthTips}</p>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {PlantDetails.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Leaf className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Native Region</h2>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-red-500" />
            <span>{PlantDetails.region}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
