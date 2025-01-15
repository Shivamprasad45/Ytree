"use client";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import { IPlantProfile } from "../../../../type";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetMyTreeInfoBy_idQuery } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { useSelector } from "react-redux";
import { UserSelector } from "@/app/Featuers/Auth/AuthSlice";
import Loading from "@/app/Loading/Loading";
import dynamic from "next/dynamic";
import {
  CardFooter,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, TreesIcon } from "lucide-react";
import { useGetALL_coordsMutation } from "@/app/Featuers/Global/GlobeServices";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
const MapComponent = dynamic(() => import("@/app/Components/Mapregion"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});
const Page = () => {
  const user = useSelector(UserSelector);
  const [getAllCoords, { data, isError: isErr }] = useGetALL_coordsMutation();

  const {
    data: feature,
    isLoading,
    isError,
    refetch,
  } = useGetMyTreeInfoBy_idQuery(user?._id!);

  const Shoe_coords = data?.filter((i) => i.UserId === user?._id);
  console.log(Shoe_coords, "selected");
  useEffect(() => {
    getAllCoords(); // Fetch all coordinates on mount
    refetch();
  }, []);
  if (isLoading) {
    return (
      <MaxWidthRappers>
        <Loading />
      </MaxWidthRappers>
    );
  }

  if (isError && isErr) {
    return (
      <div className="pt-10 w-[80vw] h-[90vh] text-center items-center justify-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        🙄 Oops you not plant any trees
      </div>
    );
  }

  if (Shoe_coords === undefined) {
    return (
      <div className="pt-10 w-[80vw] h-[90vh] text-center items-center justify-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        🙄 Oops you not plant any trees
      </div>
    );
  }
  const getDaysOld = (age: string | number | Date) => {
    const artworkAge = new Date(age).getTime();
    const currentTime = Date.now();
    const timeDifference = currentTime - artworkAge;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  return (
    <div>
      <MaxWidthRappers className="">
        <div className="container mx-auto p-2 max-w-6xl">
          <h1 className="text-3xl font-bold mb-6">My Trees</h1>
          {feature && (
            <ScrollArea className="h-[calc(100vh-150px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {feature &&
                  feature.map((tree: IPlantProfile) => (
                    <Card key={tree._id} className="flex flex-col">
                      <Link
                        href={
                          tree.status === 3
                            ? `/Tree/Aboutmytree/${tree.findtree_id}`
                            : ""
                        }
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TreesIcon className="h-5 w-5" />
                            {tree.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <MapPinIcon className="h-4 w-4" />
                            {tree.findtree_id}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <img
                            src={`https://images.unsplash.com/photo-1454425064867-5ba516caf601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhbnR8fHx8fHwxNzE3NTgzMDI3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080`}
                            alt={`${tree.name} tree`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span className="text-sm text-muted-foreground">
                              {tree.status === 3 && (
                                <div className="text-neutral-400 text-sm font-bold font-['Inria_Sans'] leading-none">
                                  {getDaysOld(tree.age).toLocaleString()} days
                                  old
                                </div>
                              )}
                            </span>
                          </div>
                          <Badge variant="secondary">
                            {tree.status === 0 && (
                              <div>
                                <Badge>Pending</Badge>
                              </div>
                            )}
                            {tree.status === 1 && (
                              <div>
                                <Badge>Shipping</Badge>
                              </div>
                            )}

                            {tree.status === 2 && (
                              <div>
                                <Button>
                                  <Link
                                    href={`/Tree/LogTree?id=${tree._id}&Plaintid=${tree.Plaintid}&userid=${tree.UserId}`}
                                  >
                                    Planted
                                  </Link>
                                </Button>
                              </div>
                            )}
                          </Badge>
                        </CardFooter>
                      </Link>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          )}

          <ScrollArea>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md shadow-lg">
              {data &&
                Shoe_coords?.map((filteredItem) => (
                  <div
                    key={filteredItem.name}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
                  >
                    {filteredItem.verifed ? (
                      <div className="">
                        <CardContent className="flex-grow">
                          <Link
                            href={`/Tree/Aboutmytree/${filteredItem.find_id}`}
                            className="block group"
                          >
                            <Image
                              src={filteredItem.imageURL}
                              alt={filteredItem.name}
                              className="w-full h-32 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
                              width={200}
                              height={200}
                            />
                          </Link>
                        </CardContent>
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {filteredItem.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-2">
                            {filteredItem.bio}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <CardContent className="flex-grow">
                          <Link
                            href={`/Tree/Aboutmytree/${filteredItem.find_id}`}
                            className="block group"
                          >
                            <Image
                              src={filteredItem.imageURL}
                              alt={filteredItem.name}
                              className="w-full h-32 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
                              width={200}
                              height={200}
                            />
                          </Link>
                        </CardContent>
                        <div className="">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Not verifed yet 🤔
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      </MaxWidthRappers>
      {Shoe_coords?.length !== 0 && (
        <div className="">
          <div className="h-[500px] w-full rounded-md overflow-hidden">
            <h1 className="text-3xl font-bold mb-6">My Trees coords</h1>{" "}
            {Shoe_coords?.length !== 0 && <MapComponent data={Shoe_coords!} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
