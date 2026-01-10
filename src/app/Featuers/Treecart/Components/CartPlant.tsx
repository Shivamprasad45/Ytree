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
        description: `Item ${action === "Remove" ? "removed from" : "updated in"
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
        <span className="ml-2 text-lg">Loading your cart...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartData && cartData.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="lg:w-2/3">
            <CardHeader>
              <CardTitle>Cart Items ({cartData.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)] md:h-[500px]">
                {cartData.map((item, index) => (
                  <div
                    key={item.Plant_id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b last:border-b-0"
                  >
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.imageURL || "/placeholder.svg"}
                        alt={item.commonName}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.commonName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.scientificName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Region: {item.region}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
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
                        {updatingItemId === item.Plant_id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
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
                        {updatingItemId === item.Plant_id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="text-right flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0 mt-2 sm:mt-0 ml-auto">
                      <p className="font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={updatingItemId === item.Plant_id}
                        onClick={() =>
                          handleUpdateCart(item.Plant_id, item.UserId, "Remove")
                        }
                      >
                        {updatingItemId === item.Plant_id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/Tree/Shop">Continue Shopping</Link>
              </Button>
              <div className="text-sm text-muted-foreground">
                {cartData.length} {cartData.length === 1 ? "item" : "items"} in
                cart
              </div>
            </CardFooter>
          </Card>
          <Card className="lg:w-1/3">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalCartPrice.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{totalCartPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" asChild>
                <Link href="/Tree/Checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-muted p-6 rounded-full mb-6">
              <ShoppingCart className="w-20 h-20 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Looks like you haven&apos;t added any plants to your cart yet.
              Explore our collection and find the perfect plants for your space!
            </p>
            <Button size="lg" asChild>
              <Link href="/Tree/Shop">Browse Plants</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
