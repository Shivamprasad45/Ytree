"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { cartDataSelector } from "../Featuers/Treecart/TreeSliec";
import { Button } from "@/components/ui/button";
import { Before_PlantOrder_Selector } from "../Featuers/TreeOrder/TreeOrderSlice";
import { useSave_plants_OrderMutation } from "../Featuers/TreeOrder/TreeOrderServices";
import { Plant_order } from "../../../type";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const Cart_selector = useSelector(cartDataSelector);
  const plant_order = useSelector(Before_PlantOrder_Selector);
  const [Comformpayment] = useSave_plants_OrderMutation();
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  // Total_price
  const Total_Cart_price = Cart_selector?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      setIsRazorpayLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!isRazorpayLoaded) {
      console.error("Razorpay SDK is not loaded.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Total_Cart_price!, // Razorpay expects amount in paise
          currency: "INR",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create order: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      const { status, order } = result;

      if (status !== 200) {
        throw new Error(`Order creation failed: ${status}`);
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        order: order.id,
        name: "VanaGrow",
        description: "Test Transaction",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response: any) {
          // Validate payment at server - using webhooks is a better idea.
          setLoading(false);
          alert(
            `Payment successful. Razorpay payment ID: ${response.razorpay_payment_id}`
          );
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
            alert(error);
          }
        },

        prefill: {
          name: plant_order?.User_name,
          email: plant_order?.Addresss.email,
          contact: plant_order?.Addresss.phone!,
        },
        theme: {
          color: "#347928",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        console.error(response.error);
        alert(`Payment failed. Reason: ${response.error.description}`);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex items-center text-center justify-center">
      <Button onClick={handlePayment}>
        {Loading ? "....Loading" : "Pay Now"}
      </Button>
    </div>
  );
};

export default Payment;
