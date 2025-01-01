"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CldUploadWidget } from "next-cloudinary";
import dynamic from "next/dynamic";
import shortid from "shortid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useSave_plants_coordsMutation } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { Coords_Selector } from "@/app/Featuers/TreeOrder/TreeOrderSlice";
import { UserSelector } from "@/app/Featuers/Auth/AuthSlice";
import { toast } from "sonner";

const Map = dynamic(() => import("../LogTree/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

const formSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  bio: z.string().min(5, "Bio must be at least 5 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  relation: z.enum(["Friend", "Family", "Colleague", "Neighbor"]),
  imageUrl: z.string().url("Please upload an image"),
});

export default function EnhancedUploadComponent() {
  const id = shortid.generate();
  const user = useSelector(UserSelector);
  const router = useRouter();
  const Plants_CurrentLocations = useSelector(Coords_Selector);
  const [Save_coords, { isLoading: isLoading_coords }] =
    useSave_plants_coordsMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      bio: "",
      name: "",
      relation: undefined,
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user?._id) {
      router.push("/auth/login");
      return;
    }

    try {
      await Save_coords({
        imageURL: values.imageUrl,
        name: values.name,
        relation: values.relation,
        bio: values.bio,
        description: values.description,
        late: Plants_CurrentLocations?.late!,
        long: Plants_CurrentLocations?.long!,
        find_id: id,
        UserId: user._id,
        Plant_Addresses: Plants_CurrentLocations?.Address!,
      });
      form.reset(); // Clear the form
    } catch (error) {
      console.error("Error saving plant coordinates:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Plant Information</CardTitle>
      </CardHeader>
      <div className="h-64">
        <Map />
      </div>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a description of the plant"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input
                      list="bioOptions"
                      placeholder="Write your bio or choose from options"
                      {...field}
                    />
                  </FormControl>
                  <datalist id="bioOptions">
                    <option value="Environmentalist" />
                    <option value="Nature Enthusiast" />
                    <option value="Tree Planter" />
                    <option value="Gardener" />
                  </datalist>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a relation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Friend">Friend</SelectItem>
                      <SelectItem value="Family">Family</SelectItem>
                      <SelectItem value="Colleague">Colleague</SelectItem>
                      <SelectItem value="Neighbor">Neighbor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Upload</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <CldUploadWidget
                        uploadPreset={
                          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET
                        }
                        onSuccess={(result: any) => {
                          field.onChange(result.info?.secure_url);
                        }}
                      >
                        {({ open }) => (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => open()}
                          >
                            Upload an Image
                          </Button>
                        )}
                      </CldUploadWidget>
                      {field.value && (
                        <p className="text-sm text-green-600">
                          Image uploaded successfully
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isLoading_coords}>
              {isLoading_coords ? "Saving..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
