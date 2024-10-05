"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ShoppingCart, CreditCard } from "lucide-react";
import { cartDataSelector } from "../Featuers/Treecart/TreeSliec";
import { Before_PlantOrder_Selector } from "../Featuers/TreeOrder/TreeOrderSlice";
import { useSave_plants_OrderMutation } from "../Featuers/TreeOrder/TreeOrderServices";
import { Plant_order } from "../../../type";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const Cart_selector = useSelector(cartDataSelector);
  const plant_order = useSelector(Before_PlantOrder_Selector);
  const [Comformpayment] = useSave_plants_OrderMutation();
  const [loading, setLoading] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const Total_Cart_price =
    Cart_selector?.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
    0;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!isRazorpayLoaded) {
      toast({
        title: "Error",
        description: "Payment gateway is not ready. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Total_Cart_price,
          currency: "INR",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create order: ${response.status} ${response.statusText}`
        );
      }

      const { status, order } = await response.json();

      if (status !== 200) {
        throw new Error(`Order creation failed: ${status}`);
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "VanaGrow",
        description: "Plant Purchase",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response: any) {
          setLoading(false);
          toast({
            title: "Payment Successful",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });

          try {
            if (!plant_order) {
              throw new Error("Plant order is undefined");
            }

            const Order_data: Plant_order = {
              ...plant_order,
              Orderid: response.razorpay_order_id,
            };

            await Comformpayment(Order_data);
            router.push("/Tree/Mytrees");
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to process order. Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: plant_order?.User_name,
          email: plant_order?.Addresss.email,
          contact: plant_order?.Addresss.phone!,
        },
        theme: {
          color: "#10B981",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        setLoading(false);
        toast({
          title: "Payment Failed",
          description: response.error.description,
          variant: "destructive",
        });
      });
      rzp1.open();
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Payment initiation failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isRazorpayLoaded) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Preparing Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Summary</span>
          <ShoppingCart className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Cart_selector?.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{item.commonName}</span>
            <span>
              ₹{item.price} x {item.quantity}
            </span>
          </div>
        ))}
        <div className="flex justify-between items-center font-bold text-lg pt-4 border-t">
          <span>Total</span>
          <span>₹{Total_Cart_price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full h-12 text-lg"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Processing Payment
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-6 w-6" />
              Pay ₹{Total_Cart_price.toFixed(2)}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
