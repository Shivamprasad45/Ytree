"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSession } from "next-auth/react";
import {
  useGetALL_coordsQuery,
  useGetAll_usersQuery,
} from "../Featuers/Global/GlobeServices";
// Adjust the import path if necessary

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
  const {
    data: coords,
    isLoading: coordsLoading,
    isError: coordsError,
  } = useGetALL_coordsQuery();
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAll_usersQuery();

  if (coordsLoading || usersLoading) return <div>Loading...</div>;
  if (coordsError) return <div>Error loading coordinates.</div>;
  if (usersError) return <div>Error loading users.</div>;
  console.log(coords?.length, "Loading coordinates");
  return (
    <MapContainer
      center={
        coords && coords.length > 0
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
      {coords?.map((coord, index) => {
        const userName =
          users?.find((user) => user._id === coord.UserId)?.firstName ||
          "Unknown User";

        return (
          <Marker
            key={index}
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
