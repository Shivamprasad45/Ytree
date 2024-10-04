"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  Before_PlantOrder_Selector,
  Plant_Order_before,
} from "../TreeOrderSlice";
import { Plant_order } from "../../../../../type";
import { UserSelector } from "../../Auth/AuthSlice";
import { useGetCartItemByIdQuery } from "../../Treecart/TreeServicesAPI";
import Payment from "@/app/payment/page";

const formSchema = z.object({
  firstName: z.string().min(4, { message: "First name is required." }),
  lastName: z.string().min(4, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
  address: z.string().min(15, { message: "Address line is required." }),
  city: z.string().min(5, { message: "City is required." }),
  state: z.string().min(6, { message: "State is required." }),
  zipCode: z
    .string()
    .min(5, { message: "Zip code must be at least 5 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Checkout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const user = useSelector(UserSelector);
  const { data: cartdata, isLoading: isCartLoading } = useGetCartItemByIdQuery(
    user?._id!
  );
  const dispatch = useDispatch();

  const totalCartPrice =
    cartdata?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const onSubmit = (values: FormValues) => {
    const plantOrderData: Plant_order = {
      Addresss: values,
      plants: cartdata!,
      User_name: user?.Username || "",
      Orderid: "",
    };
    dispatch(Plant_Order_before(plantOrderData));
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.isValid) {
        setIsDrawerOpen(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  if (isCartLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8  max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="lg:w-1/3">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartdata?.map((item) => (
                <div key={item.UserId} className="flex items-center gap-4">
                  <img
                    src={item.imageURL}
                    alt={item.commonName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.commonName}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">${totalCartPrice}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6">Complete your order</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone No.</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Phone No." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line</FormLabel>
                      <FormControl>
                        <Input placeholder="Address Line" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!form.formState.isValid}
                >
                  Complete Purchase
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm h-52">
            <DrawerHeader>
              <DrawerTitle>Pay now</DrawerTitle>
              <DrawerDescription>
                Please make a payment to complete your order.
              </DrawerDescription>
            </DrawerHeader>
            <div className="pb-5">
              <Payment />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
