"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Circle,
  GeoJSON,
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
  TreePalm,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import RedZoneLegend from "./Anothers/RedZone";
import { indiaStatesGeoJson } from "./Anothers/GeoJson";
import Leaderboard from "./Leader/Leader";

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

  const [getAllCoords] = useGetALL_coordsMutation();
  const [getAllUsers] = useGetAll_usersMutation();
  const [currentLocation, setCurrentLocation] = useState<Coordinate[] | null>(
    null
  );
  const [userTreecurrentLocation, setUserTreeCurrentLocation] = useState<
    [number, number] | null
  >(null);
  //

  interface StateTreeData {
    state: string;
    lat: number; // approximate latitude (usually near the state capital)
    lng: number; // approximate longitude (usually near the state capital)
    treesPerPerson: number; // estimated number of trees per person
  }

  const stateTreeData: StateTreeData[] = [
    {
      state: "Andhra Pradesh",
      lat: 16.5417, // Approximate (Amaravati)
      lng: 80.515,
      treesPerPerson: 4.5,
    },
    {
      state: "Arunachal Pradesh",
      lat: 27.083, // Itanagar approximate
      lng: 93.617,
      treesPerPerson: 30.0,
    },
    {
      state: "Assam",
      lat: 26.14, // Approximate (Guwahati/Dispur)
      lng: 91.79,
      treesPerPerson: 8.57,
    },
    {
      state: "Bihar",
      lat: 25.5941, // Patna
      lng: 85.1376,
      treesPerPerson: 1.0,
    },
    {
      state: "Chhattisgarh",
      lat: 21.2514, // Raipur
      lng: 81.6296,
      treesPerPerson: 15.0,
    },
    {
      state: "Goa",
      lat: 15.4909, // Panaji
      lng: 73.8278,
      treesPerPerson: 5.0,
    },
    {
      state: "Gujarat",
      lat: 23.2156, // Gandhinagar
      lng: 72.6369,
      treesPerPerson: 2.57,
    },
    {
      state: "Haryana",
      lat: 30.7333, // Chandigarh as a proxy
      lng: 76.7794,
      treesPerPerson: 1.5,
    },
    {
      state: "Himachal Pradesh",
      lat: 31.1048, // Shimla
      lng: 77.1734,
      treesPerPerson: 20.0,
    },
    {
      state: "Jharkhand",
      lat: 23.3441, // Ranchi
      lng: 85.3096,
      treesPerPerson: 2.0,
    },
    {
      state: "Karnataka",
      lat: 12.9716, // Bengaluru
      lng: 77.5946,
      treesPerPerson: 6.0,
    },
    {
      state: "Kerala",
      lat: 8.5241, // Thiruvananthapuram
      lng: 76.9366,
      treesPerPerson: 6.0,
    },
    {
      state: "Madhya Pradesh",
      lat: 23.2599, // Bhopal
      lng: 77.4126,
      treesPerPerson: 28.88,
    },
    {
      state: "Maharashtra",
      lat: 19.076, // Mumbai
      lng: 72.8777,
      treesPerPerson: 3.0,
    },
    {
      state: "Manipur",
      lat: 24.817, // Imphal
      lng: 93.9368,
      treesPerPerson: 12.0,
    },
    {
      state: "Meghalaya",
      lat: 25.5707, // Shillong
      lng: 91.8833,
      treesPerPerson: 25.0,
    },
    {
      state: "Mizoram",
      lat: 23.7271, // Aizawl
      lng: 92.717,
      treesPerPerson: 35.0,
    },
    {
      state: "Nagaland",
      lat: 25.67, // Kohima
      lng: 94.11,
      treesPerPerson: 28.0,
    },
    {
      state: "Odisha",
      lat: 20.2961, // Bhubaneswar
      lng: 85.8245,
      treesPerPerson: 4.0,
    },
    {
      state: "Punjab",
      lat: 30.7333, // Chandigarh as a proxy
      lng: 76.7794,
      treesPerPerson: 1.2,
    },
    {
      state: "Rajasthan",
      lat: 26.9124, // Jaipur
      lng: 75.7873,
      treesPerPerson: 2.25,
    },
    {
      state: "Sikkim",
      lat: 27.3389, // Gangtok
      lng: 88.6065,
      treesPerPerson: 40.0,
    },
    {
      state: "Tamil Nadu",
      lat: 13.0827, // Chennai
      lng: 80.2707,
      treesPerPerson: 3.6,
    },
    {
      state: "Telangana",
      lat: 17.385, // Hyderabad
      lng: 78.4867,
      treesPerPerson: 3.0,
    },
    {
      state: "Tripura",
      lat: 23.8315, // Agartala
      lng: 91.2868,
      treesPerPerson: 10.0,
    },
    {
      state: "Uttar Pradesh",
      lat: 26.8467, // Lucknow
      lng: 80.9462,
      treesPerPerson: 0.68,
    },
    {
      state: "Uttarakhand",
      lat: 30.3165, // Dehradun
      lng: 78.0322,
      treesPerPerson: 12.0,
    },
    {
      state: "West Bengal",
      lat: 22.5726, // Kolkata
      lng: 88.3639,
      treesPerPerson: 1.33,
    },
  ];

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
  // Function to determine colors based on trees per person value
  const getColorByTreesPerPerson = (value: number) => {
    if (value >= 10) {
      // High trees per person: Good (green)
      return { stroke: "#008000", fill: "#00FF00" };
    } else if (value >= 5) {
      // Moderate trees per person: Average (orange/yellow)
      return { stroke: "#FFA500", fill: "#FFD700" };
    } else {
      // Low trees per person: Poor (red)
      return { stroke: "#FF0000", fill: "#FF6347" };
    }
  };
  const stateStyle = (feature: any) => {
    const stateName = feature.properties.name;
    const stateData = stateTreeData.find(
      (state) => state.state.toLowerCase() === stateName.toLowerCase()
    );

    const defaultStyle = {
      fillColor: "#cccccc",
      weight: 2,
      opacity: 1,
      color: "#666666",
      fillOpacity: 0.2,
    };

    if (stateData) {
      const colors = getColorByTreesPerPerson(stateData.treesPerPerson);
      return {
        fillColor: colors.fill,
        weight: 2,
        opacity: 1,
        color: colors.stroke,
        fillOpacity: 0.2,
      };
    }

    return defaultStyle;
  };

  const onEachFeature = (feature: any, layer: any) => {
    const stateName = feature.properties.name;
    const stateData = stateTreeData.find(
      (state) => state.state.toLowerCase() === stateName.toLowerCase()
    );

    if (stateData) {
      layer.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold" style="color: ${
            getColorByTreesPerPerson(stateData.treesPerPerson).stroke
          }">
            ${stateData.state}
          </h3>
          <p class="text-sm">
            Per person tree: ${stateData.treesPerPerson}
          </p>
        </div>
      `);
    } else {
      layer.bindPopup(
        `<div class="p-2"><h3 class="font-bold">${stateName}</h3><p>No tree data available</p></div>`
      );
    }
  };
  return (
    <div className="container mx-auto p-4 space-y-6">
      <WinnerAnnouncement
        winner={{
          firstName: `${leaderboard[0]?.firstName} ${leaderboard[0]?.lastName}`,
          treeCount: leaderboard[0]?.treeCount || 0,
        }}
      />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            Map
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Leaderboard
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

                <GeoJSON
                  data={indiaStatesGeoJson as GeoJSON.FeatureCollection}
                  style={stateStyle}
                  onEachFeature={onEachFeature}
                />
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
          <Leaderboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
