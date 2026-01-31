"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

import { toast } from "sonner";
import { useAddCartMutation } from "@/app/Featuers/Treecart/TreeServicesAPI";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { TreeCart, TreeInfo } from "../../type";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Droplet, Leaf, MapPin, Sun } from "lucide-react";

const Page = ({ PlantDetails }: { PlantDetails: TreeInfo }) => {
  const { data: user, status } = useSession();
  //For redirect to Login or signup
  const route = useRouter();
  const [AddPlants, { isLoading: isAddLoading, isSuccess }] =
    useAddCartMutation();
  //for user reload
  if (isSuccess) {
    route.push("/Tree/Checkout");
  }
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
          price: 45,
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
    <div className=" flex flex-row max-w-6xl m-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={PlantDetails.imageURL}
              width={300}
              height={300}
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
              <span className="text-2xl font-bold">₹45</span>
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                <Button disabled={isAddLoading} onClick={() => Addtocart()}>
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
                <span>Regular Watering </span>
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
