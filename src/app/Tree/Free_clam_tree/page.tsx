"use client";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Coords_Selector } from "@/app/Featuers/TreeOrder/TreeOrderSlice";
import { useFree_plants_clamMutation } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { toast } from "sonner";
import { UserSelector } from "@/app/Featuers/Auth/AuthSlice";
import { useRouter } from "next/navigation";

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
  { id: "tree1", name: "Oak Tree", image: "/api/placeholder/120/120" },
  { id: "tree2", name: "Maple Tree", image: "/api/placeholder/120/120" },
  { id: "tree3", name: "Pine Tree", image: "/api/placeholder/120/120" },
  { id: "tree4", name: "Willow Tree", image: "/api/placeholder/120/120" },
];

const Free_clam = () => {
  const Plants_CurrentLocations = useSelector(Coords_Selector);
  const router = useRouter();
  const [getPlant, { data, isError: isErr, isLoading }] =
    useFree_plants_clamMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      reason: "",
      treeType: "",
      imageUrl: "",
    },
  });

  if (data?.error) {
    toast.error(data.message);
  }

  // User data is available in form
  const user = useSelector(UserSelector);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.imageUrl) {
      toast.error("Please upload a photo");
      return;
    }
    console.log(values, "qwewrwrwr");

    if (user?.email) {
      if (
        Plants_CurrentLocations?.late !== undefined &&
        Plants_CurrentLocations?.long !== undefined
      ) {
        await getPlant({
          address: Plants_CurrentLocations?.Address,
          email: user?.email ?? "",
          late: Plants_CurrentLocations.late,
          long: Plants_CurrentLocations.long,
          reason: values.reason,
          mobil_number: values.mobileNumber,
          name: values.name,
          treeType: values.treeType,
          photoUrl: values.imageUrl,
        });
      } else {
        console.error("Plant location coordinates are missing");
        toast.error("Please select a location on the map");
      }
    } else {
      router.push("/login");
      toast.error("Login first");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Free Tree Claim Form</CardTitle>
      </CardHeader>
      <div className="h-80">
        <Map />
      </div>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your mobile number"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Photo Proof</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <CldUploadWidget
                        uploadPreset={
                          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET
                        }
                        options={{
                          sources: ["camera"],
                          resourceType: "image",
                          maxFiles: 1,
                          clientAllowedFormats: ["jpg", "jpeg", "png"],
                          showUploadMoreButton: false,
                          text: {
                            en: {
                              local: {
                                browse: "Take a Photo",
                                dd_title_single: "Take a photo as proof",
                                dd_title: "Take a photo as proof",
                              },
                            },
                          },
                        }}
                        onSuccess={(result: any) => {
                          field.onChange(result.info?.secure_url);
                        }}
                      >
                        {({ open }) => (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => open()}
                            className="w-full"
                          >
                            Take a Live Photo
                          </Button>
                        )}
                      </CldUploadWidget>

                      {field.value && (
                        <div className="mt-3">
                          <p className="text-sm text-green-600 mb-2">
                            Photo uploaded successfully
                          </p>
                          <div className="relative h-40 w-full overflow-hidden rounded-md">
                            <img
                              src={field.value}
                              alt="Uploaded photo"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treeType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Tree Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {TREE_TYPES.map((tree) => (
                        <FormItem key={tree.id}>
                          <FormLabel className="flex flex-col items-center space-y-2 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 p-2 rounded-md border-2">
                            <FormControl>
                              <RadioGroupItem
                                value={tree.id}
                                className="sr-only"
                              />
                            </FormControl>
                            <Image
                              src={tree.image}
                              width={120}
                              height={120}
                              alt={tree.name}
                              className="rounded-md"
                            />
                            <span>{tree.name}</span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why do you want this tree plant?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain why you want this tree plant..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isLoading ? ".........." : "Loading"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Free_clam;
