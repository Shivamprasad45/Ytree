"use client";

import { useState } from "react";
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import { Plant_Order_before } from "../TreeOrderSlice";
import type { Plant_order } from "../../../../../type";
import { UserSelector } from "../../Auth/AuthSlice";
import { useGetCartItemByIdQuery } from "../../Treecart/TreeServicesAPI";
import Payment from "@/app/payment/page";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// More reasonable validation requirements
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required." }),
  lastName: z.string().min(2, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
  address: z.string().min(5, { message: "Address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z
    .string()
    .min(5, { message: "Zip code must be at least 5 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Checkout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

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

  if (isCartLoading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cartdata || cartdata.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl text-center">
        <div className="flex flex-col items-center gap-4">
          <ShoppingCart className="w-16 h-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Add some plants to your cart to proceed with checkout.
          </p>
          <Button asChild className="mt-4">
            <a href="/shop">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <a href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </a>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="mt-4">
          <Progress
            value={checkoutStep === 1 ? 50 : 100}
            className="h-2"
            aria-label="Checkout progress"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span className="font-medium">Shipping Information</span>
            <span
              className={
                checkoutStep === 2 ? "font-medium" : "text-muted-foreground"
              }
            >
              Payment
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 order-2 lg:order-1">
          {checkoutStep === 1 ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      id="checkout-form"
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
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
                                <Input placeholder="Doe" {...field} />
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
                                  placeholder="john.doe@example.com"
                                  {...field}
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
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="1234567890"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123 Plant Street"
                                  {...field}
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
                                <Input placeholder="Greenville" {...field} />
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
                                <Input placeholder="California" {...field} />
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
                                <Input placeholder="12345" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    form="checkout-form"
                    disabled={!form.formState.isValid}
                  >
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <Payment />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCheckoutStep(1)}>
                  Back to Shipping
                </Button>
                <Button>Complete Order</Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="lg:w-1/3 order-1 lg:order-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {cartdata?.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={item.imageURL || "/placeholder.svg"}
                        alt={item.commonName}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      {item.quantity > 1 && (
                        <Badge className="absolute -top-2 -right-2">
                          {item.quantity}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-1">
                        {item.commonName}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.scientificName || "Plant Species"}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm">
                          ₹{item.price} × {item.quantity}
                        </p>
                        <p className="font-medium">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalCartPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>₹{Math.round(totalCartPrice * 0.05)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    ₹{totalCartPrice + Math.round(totalCartPrice * 0.05)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle>Complete Your Order</DrawerTitle>
              <DrawerDescription>
                Please review your information and proceed to payment.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Shipping Information</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>
                    {form.getValues().firstName} {form.getValues().lastName}
                  </p>
                  <p>{form.getValues().address}</p>
                  <p>
                    {form.getValues().city}, {form.getValues().state}{" "}
                    {form.getValues().zipCode}
                  </p>
                  <p>{form.getValues().email}</p>
                  <p>{form.getValues().phone}</p>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Order Total</h3>
                <p className="text-lg font-bold">
                  ₹{totalCartPrice + Math.round(totalCartPrice * 0.05)}
                </p>
              </div>
            </div>
            <DrawerFooter>
              <Button
                onClick={() => {
                  setIsDrawerOpen(false);
                  setCheckoutStep(2);
                }}
              >
                Proceed to Payment
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
