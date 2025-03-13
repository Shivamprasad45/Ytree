"use client";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";

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
});

const Free_clam = () => {
  const Plants_CurrentLocations = useSelector(Coords_Selector);
  const router = useRouter();
  const [getPlant, { data, isError: isErr }] = useFree_plants_clamMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      reason: "",
    },
  });

  if (data?.error) {
    toast.error(data.message);
  }
  //User data is available in form
  const user = useSelector(UserSelector);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle form submission

    // Add your submission logic here
    // For example: call an API to save the data
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
        });
      } else {
        console.error("Plant location coordinates are missing");
      }
    } else {
      router.push("/login");
      toast.error("Login first ");
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
              Submit Claim
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Free_clam;
