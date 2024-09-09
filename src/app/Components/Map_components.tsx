"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSession } from "next-auth/react";
import {
  useGetALL_coordsMutation,
  useGetAll_usersMutation,
} from "../Featuers/Global/GlobeServices"; // Adjust the import path if necessary

// Custom Icons
const IconOne = new L.Icon({
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  iconRetinaUrl:
    "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
  iconUrl:
    "https://img.icons8.com/?size=100&id=6ozQ6RVpK3sa&format=png&color=000000",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const IconTwo = new L.Icon({
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  iconRetinaUrl:
    "https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg",
  iconUrl: "https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapComponent: React.FC = () => {
  const { data: session } = useSession();
  const [coords, setCoords] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [coordsLoading, setCoordsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [coordsError, setCoordsError] = useState<string | null>(null);
  const [usersError, setUsersError] = useState<string | null>(null);

  const [getALL_coords] = useGetALL_coordsMutation();
  const [getAll_users] = useGetAll_usersMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCoordsLoading(true);
        const coordsData = await getALL_coords().unwrap();
        console.log(coordsData, "coords");
        setCoords(coordsData);
        setCoordsLoading(false);
      } catch (error) {
        setCoordsError("Error loading coordinates.");
        setCoordsLoading(false);
      }

      try {
        setUsersLoading(true);
        const usersData = await getAll_users().unwrap();
        setUsers(usersData);
        setUsersLoading(false);
      } catch (error) {
        setUsersError("Error loading users.");
        setUsersLoading(false);
      }
    };

    fetchData();
  }, [getALL_coords, getAll_users]);

  if (coordsLoading || usersLoading) return <div>Loading...</div>;
  if (coordsError) return <div>{coordsError}</div>;
  if (usersError) return <div>{usersError}</div>;

  return (
    <MapContainer
      center={
        coords.length > 0
          ? ([coords[0].late, coords[0].long] as [number, number])
          : [0, 0]
      }
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coords.map((coord, index) => {
        const userName =
          users.find((user) => user._id === coord.UserId)?.firstName ||
          "Unknown User";

        return (
          <Marker
            key={coord._id} // Use a unique key if available, e.g., coord._id
            position={[coord.late, coord.long]}
            icon={coord.UserId === session?.user?.id ? IconTwo : IconOne}
          >
            <Popup>
              <p>
                <strong>Address:</strong> {coord.Plant_Addresses}
              </p>
              <p>
                <strong>Plant:</strong> {coord.commonName}
              </p>
              <p>
                <strong>User:</strong> {userName}
              </p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
