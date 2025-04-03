import { toast } from "sonner";

export interface LocationData {
  lat: number | null;
  lng: number | null;
  state: string;
  district: string;
  locality: string;
  country: string;
  fullAddress: string;
  adminDetails: Array<{ name: string; description: string; type: string }>;
}

export const initialLocationData: LocationData = {
  lat: null,
  lng: null,
  state: "",
  district: "",
  locality: "",
  country: "",
  fullAddress: "",
  adminDetails: [],
};

export const getCurrentLocation = async (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Get address from coordinates using BigDataCloud API
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("BigDataCloud response:", data);

          // Build full address from components
          const addressParts = [];
          if (data.locality) addressParts.push(data.locality);
          if (data.city && data.city !== data.locality)
            addressParts.push(data.city);
          if (data.principalSubdivision)
            addressParts.push(data.principalSubdivision);
          if (data.countryName) addressParts.push(data.countryName);

          // Get postal code if available
          const postcode = data.postcode || "";
          if (postcode) addressParts.push(postcode);

          const fullAddress = addressParts.join(", ");

          // Extract administrative details from localityInfo
          const adminDetails: Array<{
            name: string;
            description: string;
            type: string;
          }> = [];
          if (data.localityInfo && data.localityInfo.administrative) {
            data.localityInfo.administrative.forEach((item: any) => {
              adminDetails.push({
                name: item.name,
                description: item.description || "",
                type: item.adminLevel ? `Level ${item.adminLevel}` : "",
              });
            });
          }

          // Find district from administrative details
          let district = "Unknown district";
          const districtInfo = adminDetails.find(
            (item) =>
              item.description?.toLowerCase().includes("district") ||
              item.type === "Level 5" // District is typically admin level 5
          );

          if (districtInfo) {
            district = districtInfo.name;
          }

          // Extract location data from the response
          const locationData: LocationData = {
            lat: lat,
            lng: lng,
            state: data.principalSubdivision || "Unknown state",
            district: district,
            locality: data.locality || data.city || "",
            country: data.countryName || "Unknown country",
            fullAddress: fullAddress,
            adminDetails: adminDetails,
          };

          toast.success("Location fetched successfully!");
          resolve(locationData);
        } catch (error) {
          console.error("Error fetching address:", error);
          const errorLocationData: LocationData = {
            lat: lat,
            lng: null,
            state: "Unknown",
            district: "Unknown",
            locality: "Unknown",
            country: "Unknown country",
            fullAddress: "Address information unavailable",
            adminDetails: [],
          };
          toast.error("Error fetching address information");
          resolve(errorLocationData);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error(
          "Unable to get your location. Please check your permissions."
        );
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};
