"use client";
import Link from "next/link";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import {
  useGetCartItemByIdQuery,
  useRemoveCartMutation,
} from "../TreeServicesAPI";
import { Button } from "@/components/ui/button";
import { UserSelector } from "../../Auth/AuthSlice";

import UserRelaod from "@/app/lib/UserRelaod";
import Image from "next/image";

const CartPlant = () => {
  const [Id, setId] = useState<string>("");
  //User id fetch
  UserRelaod();
  const user = useSelector(UserSelector);

  const { data: cartdata, isLoading: isCartLoading } = useGetCartItemByIdQuery(
    user?._id!
  );
  const Total_Cart_price =
    cartdata &&
    cartdata?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [Cart_Remove, { isLoading }] = useRemoveCartMutation();
  if (isCartLoading) {
    return <div>...Loading</div>;
  }
  const Update_cart_plants = async (
    id: string,
    UserId: string,
    Symbol: string
  ) => {
    try {
      await Cart_Remove({ _id: id, UserId: UserId, Symbol: Symbol });
      setId(id);
    } catch {
      console.log("Update error");
    }
  };

  return (
    <div>
      <div>
        <div
          className="w-full h-full max-w-screen-lg ml-6  bg-opacity-90 top-20 overflow-y-auto overflow-x-hidden fixed sticky-0"
          id="chec-div"
        >
          <div
            className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="checkout"
          >
            <div
              className="flex md:flex-row flex-col justify-end mb-5"
              id="cart"
            >
              <div
                className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8  overflow-y-auto overflow-x-hidden h-screen"
                id="scroll"
              >
                 <Link href="/"> 
                <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none">
                 
                    Back
                    
                    
                   </p>
                </div>
                </Link>
                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                   Bag
               
                </p>
                {
                  cartdata?.length ===0 &&<div className="md:flex items-center mt-14 py-8 border-t  ">
                    
                    
                    
                   <p className="text-3xl font-black leading-10"> Add plants in Cart</p>
                   </div>
                }
                {cartdata?.map((item) => (
                  <div
                    key={item.Plant_id}
                    className="md:flex items-center mt-14 py-8 border-t border-gray-200"
                  >
                    <div className="w-1/4">
                      <Image 
                        src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller3.png"
                        alt="hhh"
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="md:pl-3 md:w-3/4">
                      <p className="text-xs leading-3 md:pt-0 pt-4">RF293</p>
                      <div className="flex items-center justify-between w-full pt-1">
                        <p className="text-base font-black leading-none ">
                          {item.commonName}
                        </p>
                        <div className="flex space-x-2">
                          <Button
                            disabled={isLoading}
                            className="cursor-pointer"
                            onClick={() =>
                              Update_cart_plants(
                                item.Plant_id,
                                item.UserId,
                                "Plus"
                              )
                            }
                          >
                            <span>
                              <Plus />
                            </span>
                          </Button>
                          <div className="">
                            <span>{item.quantity}</span>
                          </div>
                          <Button
                            size={"icon"}
                            disabled={isLoading || item.quantity === 1}
                            className="cursor-pointer"
                            onClick={() =>
                              Update_cart_plants(
                                item.Plant_id,
                                item.UserId,
                                "Minus"
                              )
                            }
                          >
                            {" "}
                            <span>
                              <Minus />
                            </span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs leading-3  pt-2">
                        scientificName: {item.scientificName}
                      </p>
                      <p className="text-xs leading-3  py-4">
                        region: {item.region}
                      </p>
                      <p className="w-96 text-xs leading-3 ">{item.quantity}</p>
                      <div className="flex items-center justify-between pt-5 pr-6">
                        <div className="flex items-center">
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <p className="text-xs leading-3 underline  cursor-pointer">
                                About more
                              </p>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <div className="flex justify-between space-x-4">
                                <div className="space-y-1">
                                  <h4 className="text-sm font-semibold">
                                    @nextjs
                                  </h4>
                                  <p className="text-sm">
                                    The React Framework – created and maintained
                                    by @vercel.
                                  </p>
                                  <div className="flex items-center pt-2">
                                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                    <span className="text-xs text-muted-foreground">
                                      Joined December 2021
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>

                          <p
                            className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                            onClick={() =>
                              Update_cart_plants(
                                item.Plant_id,
                                item.UserId,
                                "Remove"
                              )
                            }
                          >
                            {Id === item._id && isLoading
                              ? "...Removing"
                              : "Remove"}
                          </p>
                        </div>
                        <p className="text-base font-black leading-none ">
                          {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="xl:w-1/2 md:w-1/3  w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">
                      Summary
                    </p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base leading-none text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        {cartdata && Total_Cart_price}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">
                        Total
                      </p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                        {Total_Cart_price}
                      </p>
                    </div>
                   {cartdata?.length !==0 && user !==null ? <Button className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                      <Link href="/Tree/Checkout">Checkout</Link>
                    </Button>:""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPlant;
