"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
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

export default function Checkout() {
  const [checkoutStep, setCheckoutStep] = useState(1);

  const user = useSelector(UserSelector);
  const { data: cartdata, isLoading: isCartLoading } = useGetCartItemByIdQuery(
    user?._id!
  );
  const dispatch = useDispatch();

  const totalCartPrice =
    cartdata?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const tax = Math.round(totalCartPrice * 0.05);
  const total = totalCartPrice + tax;

  const handleDirectBuy = () => {
    if (!cartdata || cartdata.length === 0) return;

    const plantOrderData: Plant_order = {
      plants: cartdata,
      User_name: user?.Username || "",
      Orderid: "",
    };

    dispatch(Plant_Order_before(plantOrderData));
    setCheckoutStep(2);
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
            <span className="font-medium">Order Summary</span>
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
        {checkoutStep === 1 ? (
          <>
            <div className="lg:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleDirectBuy}>Continue to Payment</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="lg:w-1/3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="px-6">
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
                      <span>₹{tax}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleDirectBuy} className="w-full">
                    Direct Buy Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        ) : (
          <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <Payment />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCheckoutStep(1)}>
                  Back to Order Summary
                </Button>
                <Button>Complete Order</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
