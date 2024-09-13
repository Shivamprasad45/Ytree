"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  useGetCartItemByIdQuery,
  useRemoveCartMutation,
} from "../TreeServicesAPI";
import { UserSelector } from "../../Auth/AuthSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function CartPage() {
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const user = useSelector(UserSelector);
  const { data: cartData, isLoading: isCartLoading } = useGetCartItemByIdQuery(
    user?._id!
  );
  const [removeCartItem, { isLoading: isRemoving }] = useRemoveCartMutation();

  const totalCartPrice =
    cartData?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const handleUpdateCart = async (
    id: string,
    userId: string,
    action: "Plus" | "Minus" | "Remove"
  ) => {
    setUpdatingItemId(id);
    try {
      await removeCartItem({ _id: id, UserId: userId, Symbol: action });
      toast({
        title: "Cart updated",
        description: `Item ${
          action === "Remove" ? "removed from" : "updated in"
        } cart successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingItemId(null);
    }
  };

  if (isCartLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8  max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartData && cartData.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="lg:w-2/3">
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)]">
                {cartData.map((item) => (
                  <div
                    key={item.Plant_id}
                    className="flex items-center gap-4 py-4"
                  >
                    <div className="w-24 h-24 relative">
                      <Image
                        src={""}
                        alt={item.commonName}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.commonName}</h3>
                      <p className="text-sm text-gray-500">
                        {item.scientificName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Region: {item.region}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        disabled={
                          updatingItemId === item.Plant_id ||
                          item.quantity === 1
                        }
                        onClick={() =>
                          handleUpdateCart(item.Plant_id, item.UserId, "Minus")
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        disabled={updatingItemId === item.Plant_id}
                        onClick={() =>
                          handleUpdateCart(item.Plant_id, item.UserId, "Plus")
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        disabled={updatingItemId === item.Plant_id}
                        onClick={() =>
                          handleUpdateCart(item.Plant_id, item.UserId, "Remove")
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="lg:w-1/3">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalCartPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalCartPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/Tree/Checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-4">
              Add some plants to your cart and start shopping!
            </p>
            <Button asChild>
              <Link href="/Tree/Shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
