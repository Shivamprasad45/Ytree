"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import { useSession } from "next-auth/react";
import {
  Loader2,
  Trophy,
  Trees,
  User as UserIcon,
  Map,
  Award,
  Satellite,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetALL_coordsMutation,
  useGetAll_usersMutation,
} from "../Featuers/Global/GlobeServices";
import { Coordinate, All_Users, Coordinates } from "../../../type";
import WinnerAnnouncement from "./Winner";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SatelliteMap from "./Satlite";

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

// Add to your existing icon creation code
const IconPollution = new L.Icon({
  iconUrl: "https://i.giphy.com/1xlqOpx8T0dlV3ZoHV.webp",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: "/Map_icon/marker-shadow.webp",
});

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
        let icon = IconOther;

        if (coord.UserId === session?.user?.id) {
          icon = IconUser;
        } else if (coord.UserId === winner) {
          icon = IconWinner;
        }

        const marker = L.marker([coord.late, coord.long], { icon }).bindPopup(`
         <div class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
  <h3 class="text-xl font-bold text-gray-800 mb-2">${`${
    coord.commonName === undefined ? coord.name : coord.commonName
  }`}</h3>
  <p class="text-sm text-gray-600 mb-1">
    <span class="font-semibold">Address:</span> ${coord.Plant_Addresses}
  </p>
   <p class="text-sm text-gray-600 mb-1">
    <span class="font-semibold">Relation:</span> ${
      coord.relation === undefined ? "" : coord.relation
    }
  </p>
   <p class="text-sm text-gray-600 mb-1">
    <span class="font-semibold">Name:</span> ${
      coord.bio === undefined ? "" : coord.bio
    }
  </p>
  <p class="text-sm text-gray-600">
    <span class="font-semibold">Conservationist: </span> 
    ${
      userName
        ? `<span class="text-green-600">${userName.firstName} ${userName.lastName}</span>`
        : `<span class="text-red-600">${coord.name}</span>`
    }
    ${`<img src="${coord.imageURL}"/>`}
  </p>
</div>

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
  map.setView(coords, 13);
  return null;
};

export default function Component() {
  const { data: session } = useSession();
  const [coords, setCoords] = useState<Coordinate[]>([]);
  const [users, setUsers] = useState<All_Users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<All_Users[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("map");
  const [satlite, setsatlite] = useState<Coordinates | null>(null);
  const [getAllCoords] = useGetALL_coordsMutation();
  const [getAllUsers] = useGetAll_usersMutation();
  const [currentLocation, setCurrentLocation] = useState<Coordinate[] | null>(
    null
  );
  const [userTreecurrentLocation, setUserTreeCurrentLocation] = useState<
    [number, number] | null
  >(null);
  //

  interface RedZone {
    lat: number;
    lng: number;
    radius: number; // in meters
    name: string;
  }

  const [redZones] = useState<RedZone[]>([
    // Existing zones
    {
      lat: 28.7041,
      lng: 77.1025,
      radius: 5000,
      name: "Delhi High Pollution Zone",
    },
    {
      lat: 39.9042,
      lng: 116.4074,
      radius: 8000,
      name: "Beijing Pollution Zone",
    },
    // New Uttar Pradesh zones
    {
      lat: 25.7615, // Ballia, UP
      lng: 84.1471,
      radius: 50000,
      name: "Ballia High Pollution Zone",
    },
    {
      lat: 25.9417, // Mau, UP
      lng: 83.5611,
      radius: 5000,
      name: "Mau Industrial Pollution Area",
    },
    {
      lat: 25.3176, // Varanasi (Banaras), UP
      lng: 82.9739,
      radius: 7000, // Larger radius for Banaras
      name: "Varanasi River Pollution Zone",
    },
  ]);
  const RedZoneLegend = () => (
    <div className="leaflet-bottom leaflet-right bg-white p-4 rounded shadow-md mr-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        <span className="text-sm">Pollution Marker</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 bg-red-500/20"
          style={{ border: "2px solid #ff0000" }}
        ></div>
        <span className="text-sm">Red Zone (High Pollution)</span>
      </div>
    </div>
  );
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

  useEffect(() => {
    if (session) {
      const userTreeCoords = coords.filter(
        (user) => user.UserId === session?.user.id
      );
      setCurrentLocation(userTreeCoords);
      if (userTreeCoords.length === 0) {
        toast.warning("You haven't planted any trees yet. Start planting!");
      }
    }
  }, [coords, session]);

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
    <div className="container mx-auto p-4 space-y-6">
      <WinnerAnnouncement
        winner={{
          firstName: `${leaderboard[0]?.firstName} ${leaderboard[0]?.lastName}`,
          treeCount: leaderboard[0]?.treeCount || 0,
        }}
      />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            Map
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="Stellite" className="flex items-center gap-2">
            <Satellite className="w-4 h-4" />
            Satellite
          </TabsTrigger>
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
                {redZones.map((zone, idx) => (
                  <Circle
                    key={idx}
                    center={[zone.lat, zone.lng]}
                    radius={zone.radius}
                    pathOptions={{
                      color: "#ff0000",
                      fillColor: "#ff4444",
                      fillOpacity: 0.2,
                      weight: 2,
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-red-600">{zone.name}</h3>
                        <p className="text-sm">
                          Radius: {(zone.radius / 1000).toFixed(1)}km
                        </p>
                        <p className="text-sm">Air Quality Index: Hazardous</p>
                      </div>
                    </Popup>
                  </Circle>
                ))}
                <RedZoneLegend />
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
          <ScrollArea className="w-full whitespace-nowrap rounded-md border mt-4">
            <div className="flex space-x-4 p-4">
              {currentLocation?.map((item) => (
                <Button
                  key={item.UserId}
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() =>
                    setUserTreeCurrentLocation([item.long, item.late])
                  }
                >
                  <img
                    src="/Map_icon/your.png"
                    width={20}
                    height={20}
                    alt=""
                    className="rounded-full"
                  />
                  <span>{item.commonName || item.name}</span>
                </Button>
              ))}
              <Button variant="outline" className="flex items-center gap-2">
                <img
                  src="/Map_icon/winner.webp"
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
                />
                <span>Winner Trees</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <img
                  src="/Map_icon/Alltree.webp"
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
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
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {leaderboard.map((user, index) => (
                  <li
                    key={user._id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-md transition-colors hover:bg-secondary/80"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">{index + 1}</span>
                      <span className="font-medium">
                        {user.firstName} {user.lastName}
                      </span>
                      {user._id === session?.user?.id && (
                        <UserIcon className="w-4 h-4 text-blue-500" />
                      )}
                      {index === 0 && (
                        <Award className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <span className="flex items-center gap-2">
                      <Trees className="w-4 h-4 text-green-500" />
                      {user.treeCount} trees
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Stellite" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Satellite className="w-6 h-6" />
                Satellite View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SatelliteMap
                lat={satlite?.latitude!}
                lng={satlite?.longitude!}
              />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {currentLocation?.map((r) => (
                <Button
                  key={r.UserId}
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() =>
                    setsatlite({ latitude: r.late, longitude: r.long })
                  }
                >
                  <Trees className="w-4 h-4 text-green-500" />
                  {r.commonName || r.name}
                </Button>
              ))}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
