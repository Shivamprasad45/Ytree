"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import { useSession } from "next-auth/react";
import { Loader2, Trophy, Trees, User as UserIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetALL_coordsMutation,
  useGetAll_usersMutation,
} from "../Featuers/Global/GlobeServices";
import { Coordinate, All_Users } from "../../../type";
import WinnerAnnouncement from "./Winner";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Create icon function
const createIcon = (iconUrl: string) =>
  new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: "/Map_icon/marker-shadow.webp",
  });

const IconUser = createIcon("/Map_icon/your.png");
const IconWinner = createIcon("/Map_icon/winner.webp");
const IconOther = createIcon("/Map_icon/Alltree.webp");

// MapUpdater component
function MapUpdater({
  coords,
  users,
  session,
  winner,
}: {
  coords: Coordinate[];
  users: All_Users[];
  session: any;
  winner: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (coords.length > 0) {
      const markers = L.markerClusterGroup();

      coords.forEach((coord) => {
        const userName = users.find((user) => user._id === coord.UserId);
        ("Unknown User");
        let icon = IconOther;

        if (coord.UserId === session?.user?.id) {
          icon = IconUser;
        } else if (coord.UserId === winner) {
          icon = IconWinner;
        }

        const marker = L.marker([coord.late, coord.long], { icon }).bindPopup(`
          <p><strong>Address:</strong> ${coord.Plant_Addresses}</p>
          <p><strong>Plant:</strong> ${coord.commonName}</p>
          <p><strong>Conservationist : </strong>${
            userName
              ? `${userName?.firstName} ${userName?.lastName}`
              : "  Unknown "
          } </p>
        `);

        markers.addLayer(marker);
      });

      map.addLayer(markers);
      map.fitBounds(markers.getBounds());

      return () => {
        map.removeLayer(markers);
      };
    }
  }, [coords, users, session, winner, map]);

  return null;
}

const MapViewUpdater = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  map.setView(coords, 30);
  return null;
};
export default function EnhancedMapComponent() {
  const { data: session } = useSession();
  const [coords, setCoords] = useState<Coordinate[]>([]);
  const [users, setUsers] = useState<All_Users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<All_Users[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("map");

  const [getAllCoords] = useGetALL_coordsMutation();
  const [getAllUsers] = useGetAll_usersMutation();
  const [currentLocation, setCurrentLocation] = useState<Coordinate[] | null>(
    null
  );
  const [userTreecurrentLocation, setUserTreeCurrentLocation] = useState<
    [number, number] | null
  >(null);

  // /Useffect the current location

  const UserTree = ({ long, late }: { long: number; late: number }) => {
    if (session && long && late) {
      // Set the state as an array [long, late]

      console.log(long, late, "set  HOME");
      setUserTreeCurrentLocation([long, late]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [coordsData, usersData] = await Promise.all([
          getAllCoords().unwrap(),
          getAllUsers().unwrap(),
        ]);
        setCoords(coordsData);
        setUsers(usersData);

        const userTrees = coordsData.reduce(
          (acc: Record<string, number>, coord: Coordinate) => {
            acc[coord.UserId] = (acc[coord.UserId] || 0) + 1;
            return acc;
          },
          {}
        );

        const leaderboardData = usersData
          .map((user: All_Users) => ({
            ...user,
            treeCount: userTrees[user._id] || 0,
          }))
          .sort((a, b) => b.treeCount - a.treeCount);

        setLeaderboard(leaderboardData.slice(0, 5));
        setWinner(leaderboardData[0]?._id || null);
      } catch (error) {
        setError("Error loading data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getAllCoords, getAllUsers]);
  // Animations
  useEffect(() => {
    console.log(coords, "current");
    if (session) {
      const User_Tree_coords = coords.filter(
        (user) => user.UserId === session?.user.id
      );

      if (User_Tree_coords) {
        setCurrentLocation(User_Tree_coords);
      } else {
        toast.warning("Please plant a tree");
      }
      console.log(User_Tree_coords, "selected");
    }
  }, [coords]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center p-2">
        <WinnerAnnouncement
          winner={{
            firstName: leaderboard[0].firstName + " " + leaderboard[0].lastName,
            treeCount: leaderboard[0].treeCount!,
          }}
        />
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <MapContainer
                center={[0, 0]}
                zoom={2}
                style={{ height: "500px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapUpdater
                  coords={coords}
                  users={users}
                  session={session}
                  winner={winner}
                />
                <MapViewUpdater
                  coords={[
                    userTreecurrentLocation
                      ? userTreecurrentLocation[1]
                      : 26.0204409,
                    userTreecurrentLocation
                      ? userTreecurrentLocation[0]
                      : 83.9037192,
                  ]}
                />
              </MapContainer>
            </CardContent>
          </Card>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex space-x-4 p-4">
              {currentLocation?.map((item) => (
                <Button
                  key={item.UserId}
                  variant="outline"
                  className="flex-shrink-0 items-center gap-2"
                  onClick={() => UserTree({ late: item.late, long: item.long })}
                >
                  <img src="/Map_icon/your.png" width={20} height={10} alt="" />
                  <span>{item.commonName}</span>
                </Button>
              ))}
              <Button
                variant="outline"
                className="flex-shrink-0 items-center gap-2"
              >
                <img
                  src="/Map_icon/Alltree.webp"
                  width={20}
                  height={10}
                  alt=""
                />
                <span>Winner Trees</span>
              </Button>
              <Button
                variant="outline"
                className="flex-shrink-0 items-center gap-2"
              >
                <img
                  src="/Map_icon/winner.webp"
                  width={20}
                  height={10}
                  alt=""
                />
                <span>Other Trees</span>
              </Button>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="leaderboard" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {leaderboard.map((user, index) => (
                  <li
                    key={user._id}
                    className="flex items-center justify-between p-2 bg-secondary rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{index + 1}.</span>
                      <span>{user.firstName}</span>
                      {user._id === session?.user?.id && (
                        <UserIcon className="w-4 h-4" />
                      )}
                      {index === 0 && (
                        <Trophy className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <span>{user.treeCount} trees</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
