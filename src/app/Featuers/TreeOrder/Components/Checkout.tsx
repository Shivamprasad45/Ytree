"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { useDispatch, useSelector } from "react-redux";

import {
  Before_PlantOrder_Selector,
  Plant_Order_before,
} from "../TreeOrderSlice";
import { Plant_order } from "../../../../../type";

import { UserSelector } from "../../Auth/AuthSlice";

import { useGetCartItemByIdQuery } from "../../Treecart/TreeServicesAPI";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Payment from "@/app/payment/page";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits.",
  }),
  address: z.string().min(1, {
    message: "Address line is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  state: z.string().min(1, {
    message: "State is required.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
});

function Checkout() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const user = useSelector(UserSelector);
  const { data: cartdata, isLoading: isCartLoading } = useGetCartItemByIdQuery(
    user?._id!
  );
  //  const cartdata = useSelector(cartdataSelector);

  const Total_Cart_price =
    cartdata &&
    cartdata?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const dispatch = useDispatch();

  //   const [] = useSave_plants_OrderMutation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const Plant_order_data: Plant_order = {
      Addresss: values,
      plants: cartdata!,
      User_name: user?.Username || "",
      Orderid: "",
    };
    dispatch(Plant_Order_before(Plant_order_data));
  };

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {/* Product Details - Same as provided */}
                {cartdata?.map((item) => (
                  <div key={item.UserId} className="flex items-start gap-4">
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <img
                        src={item.imageURL}
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-base text-white">
                        {item.commonName}
                      </h3>
                      <ul className="text-xs text-gray-300 space-y-2 mt-2">
                        <li>
                          Prise{" "}
                          <span className="float-right">{item.price}</span>
                        </li>
                        <li>
                          Quantity{" "}
                          <span className="float-right">{item.quantity}</span>
                        </li>
                        <li>
                          Total Price{" "}
                          <span className="float-right">
                            {item.price * item.quantity}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-base text-white">
                Total <span className="ml-auto">{Total_Cart_price}</span>
              </h4>
            </div>
          </div>
        </div>
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete your order
          </h2>
          <form
            className="mt-8 space-y-8"
            onSubmit={form.handleSubmit(onSubmit as any)}
          >
            <Form {...form}>
              <div>
                <h3 className="text-base text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            {...field}
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                          />
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
                          <Input
                            placeholder="Last Name"
                            {...field}
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                          />
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
                          <Input
                            type="email"
                            placeholder="Email"
                            {...field}
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                          />
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
                          <Input
                            type="tel"
                            placeholder="Phone No."
                            {...field}
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Address Line"
                            {...field}
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                          />
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
                          <Input
                            placeholder="City"
                            {...field}
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                          />
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
                          <Input
                            placeholder="State"
                            {...field}
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                          />
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
                          <Input
                            placeholder="Zip Code"
                            {...field}
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <Button
                    type="button"
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {/* //Drawer */}
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white">
                          Complete Purchase
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full max-w-sm h-64">
                          <DrawerHeader>
                            <DrawerTitle>Pay now</DrawerTitle>
                            <DrawerDescription>
                              Please make a payment to complete your order.
                            </DrawerDescription>
                          </DrawerHeader>
                          <Payment />
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </Button>
                </div>
              </div>
            </Form>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
