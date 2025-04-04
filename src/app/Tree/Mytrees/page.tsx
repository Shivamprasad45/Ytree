"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserSelector } from "@/app/Featuers/Auth/AuthSlice";
import { useGetMyTreeInfoBy_idQuery } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { useGetALL_coordsMutation } from "@/app/Featuers/Global/GlobeServices";
// import type { IPlantProfile } from "../type"
import dynamic from "next/dynamic";

// Components
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPinIcon, TreePine, Leaf, AlertCircle } from "lucide-react";
import Loading from "@/app/Loading/Loading";
import { EmptyState } from "./Components/empty-state";
import { IPlantProfile } from "../../../../type";
import { TreeCard } from "./Components/tree-card";
import { TreeCoordCard } from "./Components/tree-coord-card";
// import { EmptyState } from "../components/empty-state"
// import { TreeCard } from "../components/tree-card"
// import { TreeCoordCard } from "../components/tree-coord-card"

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("@/app/Components/Mapregion"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
});

export default function MyTreesPage() {
  const user = useSelector(UserSelector);
  const [getAllCoords, { data: coordsData, isError: isCoordsError }] =
    useGetALL_coordsMutation();

  const {
    data: trees,
    isLoading,
    isError,
    refetch,
  } = useGetMyTreeInfoBy_idQuery(user?._id!);

  const userCoords = coordsData?.filter((coord) => coord.UserId === user?._id);

  useEffect(() => {
    getAllCoords();
    refetch();
  }, [getAllCoords, refetch]);

  // Calculate tree age in days
  const getDaysOld = (plantDate: string | number | Date) => {
    const plantTimestamp = new Date(plantDate).getTime();
    const currentTime = Date.now();
    const timeDifference = currentTime - plantTimestamp;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <MaxWidthRappers>
        <Loading />
      </MaxWidthRappers>
    );
  }

  const hasNoTrees =
    (isError && isCoordsError) || (!trees?.length && !userCoords?.length);

  if (hasNoTrees) {
    return <EmptyState />;
  }

  return (
    <div className="bg-background min-h-screen pb-12">
      <MaxWidthRappers>
        <div className="container mx-auto p-4 max-w-7xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-primary">My Forest</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your planted trees
            </p>
          </header>

          <Tabs defaultValue="trees" className="w-full">
            <TabsList className="mb-6 w-full sm:w-auto">
              <TabsTrigger value="trees" className="flex items-center gap-2">
                <TreePine className="h-4 w-4" />
                <span>My Trees</span>
                {(trees?.length ?? 0) > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {trees?.length ?? 0}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>Map View</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trees" className="space-y-8">
              {trees && trees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trees.map((tree: IPlantProfile) => (
                    <TreeCard
                      key={tree._id}
                      tree={tree}
                      getDaysOld={getDaysOld}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-muted/50">
                  <CardContent className="pt-6 text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p>You haven&#39;t added any trees yet.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="map">
              {userCoords && userCoords.length > 0 ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-0">
                      <h2 className="text-2xl font-semibold">My Trees Map</h2>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="h-[500px] w-full rounded-lg overflow-hidden border">
                        <MapComponent data={userCoords} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="bg-muted/50">
                  <CardContent className="pt-6 text-center">
                    <MapPinIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p>No tree locations to display on the map.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </MaxWidthRappers>
    </div>
  );
}
