"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import { useSession } from "next-auth/react";
import {
  useGetALL_coordsMutation,
  useGetAll_usersMutation,
} from "@/app/Featuers/Global/GlobeServices";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IconUser = new L.Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const IconWinner = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/4778/4778362.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const IconOther = new L.Icon({
  iconUrl:
    "https://cdn.pixabay.com/photo/2014/12/22/00/07/tree-576847_1280.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function EnhancedMapComponent() {
  const { data: session } = useSession();
  const [coords, setCoords] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const [getALL_coords] = useGetALL_coordsMutation();
  const [getAll_users] = useGetAll_usersMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [coordsData, usersData] = await Promise.all([
          getALL_coords().unwrap(),
          getAll_users().unwrap(),
        ]);
        setCoords(coordsData);
        setUsers(usersData);

        // Calculate leaderboard
        const userTrees = coordsData.reduce((acc: any, coord: any) => {
          acc[coord.UserId] = (acc[coord.UserId] || 0) + 1;
          return acc;
        }, {});

        const leaderboardData = usersData
          .map((user: any) => ({
            ...user,
            treeCount: userTrees[user._id] || 0,
          }))
          .sort((a: any, b: any) => b.treeCount - a.treeCount);

        setLeaderboard(leaderboardData.slice(0, 5));
        setWinner(leaderboardData[0]?._id || null);
      } catch (error) {
        setError("Error loading data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getALL_coords, getAll_users]);

  useEffect(() => {
    if (coords.length > 0 && mapRef.current) {
      const map = mapRef.current;
      const markers = L.markerClusterGroup();

      coords.forEach((coord) => {
        const userName =
          users.find((user) => user._id === coord.UserId)?.firstName ||
          "Unknown User";
        let icon = IconOther;

        if (coord.UserId === session?.user?.id) {
          icon = IconUser;
        } else if (coord.UserId === winner) {
          icon = IconWinner;
        }

        const marker = L.marker([coord.late, coord.long], { icon }).bindPopup(`
          <p><strong>Address:</strong> ${coord.Plant_Addresses}</p>
          <p><strong>Plant:</strong> ${coord.commonName}</p>
          <p><strong>User:</strong> ${userName}</p>
        `);

        markers.addLayer(marker);
      });

      map.addLayer(markers);

      return () => {
        map.removeLayer(markers);
      };
    }
  }, [coords, users, session, winner]);

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <MapContainer
          center={coords.length > 0 ? [coords[0].late, coords[0].long] : [0, 0]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
        <div className="mt-4 flex justify-around">
          <div className="flex items-center">
            <img
              src={IconUser.options.iconUrl}
              alt="Your Trees"
              className="w-6 h-6 mr-2"
            />
            <span>Your Trees</span>
          </div>
          <div className="flex items-center">
            <img
              src={IconWinner.options.iconUrl}
              alt="Winner's Trees"
              className="w-6 h-6 mr-2"
            />
            <span>Winner s Trees</span>
          </div>
          <div className="flex items-center">
            <img
              src={IconOther.options.iconUrl}
              alt="Other Trees"
              className="w-6 h-6 mr-2"
            />
            <span>Other Trees</span>
          </div>
        </div>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {leaderboard.map((user, index) => (
                <li key={user._id} className="mb-2">
                  <span className="font-bold">{index + 1}.</span>{" "}
                  {user.firstName} - {user.treeCount} trees
                  {user._id === session?.user?.id && " (You)"}
                  {index === 0 && " 🏆"}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
