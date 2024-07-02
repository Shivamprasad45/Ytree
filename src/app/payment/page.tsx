"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { cartDataSelector } from "../Featuers/Treecart/TreeSliec";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const Cart_selector = useSelector(cartDataSelector);

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
        name: "Green Feature",
        description: "Test Transaction",
        image:
          "https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=740&t=st=1719754745~exp=1719755345~hmac=68459300e94e40e2f7c06675764c5e72f0d06b5fda351160a6dd9ce5d48e9246",
        order_id: order.id,
        handler: function (response: any) {
          // Validate payment at server - using webhooks is a better idea.
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          alert(
            `Payment successful. Razorpay payment ID: ${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
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
      <Button onClick={handlePayment}>Pay Now</Button>
    </div>
  );
};

export default Payment;
