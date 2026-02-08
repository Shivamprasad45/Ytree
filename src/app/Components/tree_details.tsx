"use client";
import { useState } from "react";
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
import { Droplet, Leaf, MapPin, Sun, AlertCircle, CheckCircle2 } from "lucide-react";

const Page = ({ PlantDetails }: { PlantDetails: TreeInfo }) => {
  const { data: user, status } = useSession();
  const route = useRouter();
  const [AddPlants, { isLoading: isAddLoading, isSuccess }] = useAddCartMutation();
  const [activeImage, setActiveImage] = useState(PlantDetails.imageURL);

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
          price: PlantDetails?.prise || 0,
          imageURL: PlantDetails?.imageURL || "",
          region: PlantDetails?.region || "",
          benefits: benefits || [],
          growthRequirements: PlantDetails?.growthRequirements || "",
          quantity: 1, // Default quantity
        };

        // Logic to handle offers (e.g. adding B2G1 items) would go here in backing API or expanded Cart logic

        await AddPlants(treeDetails);
      } else {
        toast("User id not found please Signup");
        route.push("/Signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const images = [PlantDetails.imageURL, ...(PlantDetails.sideImages || [])];

  return (
    <div className="flex flex-row max-w-6xl m-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={activeImage}
                fill
                alt={PlantDetails.commonName}
                className="object-cover"
              />
              {PlantDetails.offer && PlantDetails.offer.type !== 'none' && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white border-0 px-3 py-1 text-sm font-bold shadow-md">
                    {PlantDetails.offer.label || "Special Offer"}
                  </Badge>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <Image src={img} fill alt="view" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col h-full">
            <div className="space-y-2 mb-6">
              <h1 className="text-4xl font-black text-foreground">
                {PlantDetails.commonName}
              </h1>
              <p className="text-xl text-muted-foreground font-medium italic">
                {PlantDetails.scientificName}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                  <MapPin className="w-3 h-3 mr-1" /> Native to {PlantDetails.region}
                </Badge>
                {PlantDetails.stock !== undefined && (
                  <Badge variant={PlantDetails.stock > 0 ? "default" : "destructive"} className={PlantDetails.stock > 0 ? "bg-green-600 hover:bg-green-700" : ""}>
                    {PlantDetails.stock > 0 ? (
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> In Stock</span>
                    ) : (
                      <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Out of Stock</span>
                    )}
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-b border-border pb-8">
              {PlantDetails.description}
            </p>

            {/* Offer Callout */}
            {PlantDetails.offer && PlantDetails.offer.type !== 'none' && (
              <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl shadow-sm">LIMITED DEAL</div>
                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-1">
                  {PlantDetails.offer.label || "Special Deal Active!"}
                </h3>
                <p className="text-sm text-red-600/80 dark:text-red-400/80 font-medium">
                  {PlantDetails.offer.type === 'b2g1' && `Buy ${PlantDetails.offer.buyQuantity}, Get ${PlantDetails.offer.getQuantity} FREE!`}
                  {PlantDetails.offer.type === 'combo' && "Includes specific bundle items for a complete package."}
                  {PlantDetails.offer.type === 'discount' && `Save big with this exclusive discount.`}
                </p>
              </div>
            )}

            <div className="mt-auto">
              <div className="flex items-center justify-between p-6 bg-muted/30 rounded-2xl border border-border">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Price per unit</p>
                  <span className="text-3xl font-black text-foreground">₹{PlantDetails.prise || 0}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-border hover:bg-background" asChild>
                    <Link href="/Tree/Shop">Back to Shop</Link>
                  </Button>
                  <Button
                    disabled={isAddLoading || (PlantDetails.stock !== undefined && PlantDetails.stock <= 0)}
                    onClick={() => Addtocart()}
                    className="px-8 font-bold shadow-lg shadow-primary/20"
                  >
                    <span>{isAddLoading ? "Adding..." : "Add to Cart"}</span>
                  </Button>
                </div>
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
