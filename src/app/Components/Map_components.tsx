"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import { useSession } from "next-auth/react";
import {
  Loader2,
  Trophy,
  User as UserIcon,
  Map,
  Award,
  Navigation,
  Maximize,
  Minimize,
  TreePalm,
  Info,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetALL_coordsMutation,
  useGetAll_usersMutation,
} from "../Featuers/Global/GlobeServices";
import { Coordinate, All_Users } from "../../../type";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { indiaStatesGeoJson } from "./Anothers/GeoJson";
import Leaderboard from "./Leader/Leader";
import { getCurrentLocation } from "@/Utils/locationsServices";
import { useDispatch, useSelector } from "react-redux";
import {
  Location_Current,
  LocationDataSelector,
} from "../Featuers/Treecart/TreeSliec";

// Create icons with size based on device
const createIcon = (iconUrl: string, isMobile: boolean) =>
  new L.Icon({
    iconUrl,
    iconSize: isMobile ? [20, 20] : [32, 32],
    iconAnchor: isMobile ? [10, 20] : [16, 32],
    popupAnchor: [0, isMobile ? -20 : -32],
    shadowUrl: "/Map_icon/marker-shadow.webp",
    shadowSize: isMobile ? [20, 20] : [32, 32],
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (coords.length > 0) {
      // Configure MarkerClusterGroup with mobile optimizations
      const markers = L.markerClusterGroup({
        disableClusteringAtZoom: isMobile ? 12 : 15,
        maxClusterRadius: isMobile ? 40 : 80,
        spiderfyOnMaxZoom: true,
        zoomToBoundsOnClick: true,
      });

      coords.forEach((coord) => {
        const userName = users.find((user) => user._id === coord.UserId);

        // Create appropriate icon based on user type and device
        let icon;
        if (coord.UserId === session?.user?.id) {
          icon = createIcon("/Map_icon/your.png", isMobile);
        } else if (coord.UserId === winner) {
          icon = createIcon("/Map_icon/winner.webp", isMobile);
        } else {
          icon = createIcon("/Map_icon/Alltree.webp", isMobile);
        }

        // Create popup content with responsive design
        const popupContent = `
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm">
          <!-- Large Feature Image at Top -->
          <div class="relative">
            <img src="${coord.imageURL}" alt="${
          coord.commonName ?? coord.name
        }" 
                 class="w-full h-48 object-cover">
            
            <!-- Overlay Badge for Conservation Status (if applicable) -->
            : ""
            }
          </div>
          
          <!-- Content Area -->
          <div class="p-5 space-y-4">
            <!-- Plant Name and Location -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900">${
                coord.commonName ?? coord.name
              }</h3>
              <p class="text-sm text-gray-500">${coord.Plant_Addresses}</p>
             
            </div>
            
            <!-- Conservationist Info with Avatar -->
            <div class="flex items-center space-x-3 border-t pt-4">
              <div class="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <span class="block text-sm font-medium">Conservationist</span>
                ${
                  userName
                    ? `<span class="text-green-600 font-semibold">${userName.firstName} ${userName.lastName}</span>`
                    : `<span class="text-red-500 font-semibold">Unassigned</span>`
                }
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex space-x-2 pt-2">
              <button class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                Details
              </button>
              <button class="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                Directions
              </button>
            </div>
          </div>
        </div>
      `;

        // For handling mobile responsiveness without using arbitrary values
        const getMobilePopupContent = () => {
          return popupContent
            .replace("h-48", "h-36")
            .replace("p-5", "p-3")
            .replace("space-y-4", "space-y-2")
            .replace("text-2xl", "text-lg")
            .replace("pt-4", "pt-2")
            .replace("h-6 w-6", "h-4 w-4");
        };

        // Use this conditional rendering approach
        const finalPopupContent = isMobile
          ? getMobilePopupContent()
          : popupContent;

        const marker = L.marker([coord.late, coord.long], { icon }).bindPopup(
          popupContent,
          { maxWidth: isMobile ? 200 : 300 }
        );

        markers.addLayer(marker);
      });

      map.addLayer(markers);

      // Don't auto-zoom on mobile - will use location button instead
      if (!isMobile && markers.getBounds().isValid()) {
        map.fitBounds(markers.getBounds());
      }

      return () => {
        map.removeLayer(markers);
      };
    }
  }, [coords, users, session, winner, map, isMobile]);

  return null;
}

// Custom control for location and fullscreen
function MapControls() {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleLocateMe = () => {
    map.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true,
    });
  };

  const toggleFullscreen = () => {
    const container = document.getElementById("map-container");

    if (!document.fullscreenElement) {
      container?.requestFullscreen().catch((err) => {
        toast.error("Fullscreen mode failed");
      });
    } else {
      document.exitFullscreen().catch((err) => {
        toast.error("Exit fullscreen failed");
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control leaflet-bar flex flex-col shadow-md">
        <button
          className="bg-white text-gray-700 hover:bg-gray-100 p-2 border-b border-gray-200 rounded-t-md"
          onClick={handleLocateMe}
          title="Find my location"
        >
          <Navigation size={18} />
        </button>
        <button
          className="bg-white text-gray-700 hover:bg-gray-100 p-2 rounded-b-md"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>
    </div>
  );
}

const MapViewUpdater = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    if (coords && coords[0] !== 0 && coords[1] !== 0) {
      map.setView(coords, 13);
    }
  }, [coords, map]);

  return null;
};

// Legend component for mobile
const StateLegend = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold">Tree Density Legend</h3>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400 mr-2"></div>
            <span className="text-sm">Low (&lt;5 trees/person)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
            <span className="text-sm">Medium (5-10 trees/person)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-400 mr-2"></div>
            <span className="text-sm">High (&gt;10 trees/person)</span>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default function Component() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const Location = useSelector(LocationDataSelector);

  // State management
  const [coords, setCoords] = useState<Coordinate[]>([]);
  const [users, setUsers] = useState<All_Users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("map");
  const [isMobile, setIsMobile] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinate[] | null>(
    null
  );
  const [userTreecurrentLocation, setUserTreeCurrentLocation] = useState<
    [number, number] | null
  >(null);
  const [leaderboard, setLeaderboard] = useState<
    Array<All_Users & { treeCount: number }>
  >([]);

  // API hooks
  const [getAllCoords] = useGetALL_coordsMutation();
  const [getAllUsers] = useGetAll_usersMutation();

  // Check for mobile device
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get current location
  const getLocation = async () => {
    try {
      const data = await getCurrentLocation();
      dispatch(Location_Current(data));
      return data;
    } catch (error) {
      toast.error("Unable to get your location");
      return null;
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getLocation();

        const [coordsData, usersData] = await Promise.all([
          getAllCoords().unwrap(),
          getAllUsers().unwrap(),
        ]);

        setCoords(coordsData);
        setUsers(usersData);

        // Calculate tree counts by user
        const userTrees = coordsData.reduce(
          (acc: Record<string, number>, coord: Coordinate) => {
            acc[coord.UserId] = (acc[coord.UserId] || 0) + 1;
            return acc;
          },
          {}
        );

        // Create leaderboard data
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
  }, [getAllCoords, getAllUsers, dispatch]);

  // Set user's trees when data is loaded
  useEffect(() => {
    if (session && coords.length > 0) {
      const userTreeCoords = coords.filter(
        (user) => user.UserId === session?.user?.id
      );
      setCurrentLocation(userTreeCoords);

      if (userTreeCoords.length === 0) {
        toast.warning("You haven't planted any trees yet. Start planting!");
      }
    }
  }, [coords, session]);

  // State tree data
  interface StateTreeData {
    state: string;
    lat: number;
    lng: number;
    treesPerPerson: number;
  }

  const stateTreeData: StateTreeData[] = [
    {
      state: "Andhra Pradesh",
      lat: 16.5417,
      lng: 80.515,
      treesPerPerson: 4.5,
    },
    {
      state: "Arunachal Pradesh",
      lat: 27.083,
      lng: 93.617,
      treesPerPerson: 30.0,
    },
    // Include the rest of your state data here
    {
      state: "Bihar",
      lat: 25.5941,
      lng: 85.1376,
      treesPerPerson: 1.0,
    },
    {
      state: "Chhattisgarh",
      lat: 21.2514,
      lng: 81.6296,
      treesPerPerson: 15.0,
    },
    // ...other states
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Style functions for GeoJSON
  const getColorByTreesPerPerson = (value: number) => {
    if (value >= 10) {
      return { stroke: "#008000", fill: "#00FF00" };
    } else if (value >= 5) {
      return { stroke: "#FFA500", fill: "#FFD700" };
    } else {
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
          <h3 class="font-bold text-sm" style="color: ${
            getColorByTreesPerPerson(stateData.treesPerPerson).stroke
          }">
            ${stateData.state}
          </h3>
          <p class="text-xs">
            Trees per person: ${stateData.treesPerPerson}
          </p>
        </div>
      `);
    } else {
      layer.bindPopup(
        `<div class="p-2"><h3 class="font-bold text-sm">${stateName}</h3><p class="text-xs">No tree data available</p></div>`
      );
    }
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-2 md:py-4 space-y-4 md:space-y-6">
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

        <TabsContent value="map" className="mt-2 md:mt-4">
          <Card>
            <CardContent className="p-0">
              <div id="map-container" className="relative">
                <MapContainer
                  center={[20.5937, 78.9629]} // Center of India
                  zoom={isMobile ? 4 : 5}
                  style={{
                    height: isMobile ? "400px" : "500px",
                    width: "100%",
                  }}
                  zoomControl={!isMobile} // Hide default controls on mobile
                  attributionControl={!isMobile}
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
                        : Location?.lat ?? 20.5937,
                      userTreecurrentLocation
                        ? userTreecurrentLocation[0]
                        : Location?.lng ?? 78.9629,
                    ]}
                  />

                  {/* Custom controls only on mobile */}
                  {isMobile && <MapControls />}
                </MapContainer>

                {/* Mobile legend toggle button */}
                {isMobile && (
                  <button
                    onClick={() => setShowLegend(true)}
                    className="absolute top-2 right-2 z-40 bg-white rounded-full p-2 shadow-md"
                    aria-label="Show legend"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Mobile view - Tree list in horizontal scrollable row */}
          {isMobile ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {currentLocation && currentLocation.length > 0 ? (
                <>
                  {currentLocation.slice(0, 3).map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1 py-1 px-2 text-xs h-8"
                      onClick={() =>
                        setUserTreeCurrentLocation([item.long, item.late])
                      }
                    >
                      <img
                        src="/Map_icon/your.png"
                        width={16}
                        height={16}
                        alt=""
                        className="rounded-full"
                      />
                      <span className="truncate max-w-24">
                        {item.commonName || item.name}
                      </span>
                    </Button>
                  ))}
                  {currentLocation.length > 3 && (
                    <Button
                      variant="outline"
                      className="text-xs py-1 px-2 h-8"
                      onClick={() => {
                        toast.info(
                          `You have ${currentLocation.length} trees total`
                        );
                      }}
                    >
                      +{currentLocation.length - 3} more
                    </Button>
                  )}
                </>
              ) : (
                <p className="text-xs text-gray-500 p-2">
                  No trees planted yet. Start planting!
                </p>
              )}
            </div>
          ) : (
            // Desktop view - Full scrollable area
            <ScrollArea className="w-full whitespace-nowrap rounded-md border mt-4">
              <div className="flex space-x-4 p-4">
                {currentLocation?.map((item, index) => (
                  <Button
                    key={index}
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
          )}

          {/* Mobile action buttons */}
          {isMobile && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center justify-center gap-1 text-xs py-1 h-8"
                onClick={() => setShowLegend(true)}
              >
                <TreePalm className="w-3 h-3" />
                Legend
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center justify-center gap-1 text-xs py-1 h-8"
                onClick={getLocation}
              >
                <Navigation className="w-3 h-3" />
                My Location
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center justify-center gap-1 text-xs py-1 h-8"
                onClick={() => {
                  // Reset view to show all markers
                  setUserTreeCurrentLocation([78.9629, 20.5937]);
                  toast.success("Showing all trees");
                }}
              >
                <Map className="w-3 h-3" />
                All Trees
              </Button>
            </div>
          )}

          {/* State legend modal for mobile */}
          <StateLegend
            visible={showLegend}
            onClose={() => setShowLegend(false)}
          />
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-2 md:mt-4">
          <Leaderboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
