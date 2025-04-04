// import { GeoJsonData } from "@/types/map";

import { GeoJsonData } from "../../../../type";

// This is a simplified version of India's states GeoJSON
// In a real application, you would want a complete GeoJSON file with accurate borders
export const indiaStatesGeoJson: GeoJsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Andhra Pradesh",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.515, 16.5417],
            [82.5, 16.5],
            [84.0, 17.0],
            [84.5, 18.5],
            [83.5, 19.5],
            [81.5, 19.0],
            [79.5, 17.0],
            [80.515, 16.5417],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Arunachal Pradesh",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [93.617, 27.083],
            [95.5, 27.5],
            [97.0, 28.2],
            [96.5, 29.0],
            [94.5, 29.5],
            [92.5, 28.5],
            [93.617, 27.083],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Assam",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [91.79, 26.14],
            [93.5, 26.5],
            [94.5, 27.0],
            [93.0, 27.5],
            [92.0, 27.0],
            [91.0, 26.0],
            [91.79, 26.14],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Bihar",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.1376, 25.5941],
            [87.0, 25.5],
            [88.0, 26.5],
            [87.5, 27.0],
            [85.5, 27.2],
            [84.0, 26.5],
            [85.1376, 25.5941],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Chhattisgarh",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [81.6296, 21.2514],
            [83.5, 21.0],
            [84.0, 22.5],
            [82.5, 24.0],
            [80.5, 23.5],
            [80.0, 22.0],
            [81.6296, 21.2514],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Goa",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [73.8278, 15.4909],
            [74.1, 15.3],
            [74.2, 15.7],
            [73.9, 15.8],
            [73.8278, 15.4909],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Gujarat",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.6369, 23.2156],
            [70.5, 22.5],
            [69.0, 23.5],
            [69.5, 24.5],
            [71.5, 25.0],
            [73.0, 24.5],
            [73.5, 23.0],
            [72.6369, 23.2156],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Haryana",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [76.7794, 30.7333],
            [75.5, 30.0],
            [76.0, 28.5],
            [77.5, 28.0],
            [77.5, 30.5],
            [76.7794, 30.7333],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Himachal Pradesh",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.1734, 31.1048],
            [76.0, 31.0],
            [76.5, 32.0],
            [78.0, 33.0],
            [79.0, 32.5],
            [78.5, 31.0],
            [77.1734, 31.1048],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Jharkhand",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.3096, 23.3441],
            [84.0, 23.0],
            [84.5, 24.5],
            [87.0, 24.0],
            [86.5, 22.5],
            [85.3096, 23.3441],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Karnataka",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.5946, 12.9716],
            [75.5, 12.5],
            [75.0, 14.0],
            [76.0, 15.5],
            [78.0, 16.0],
            [77.5, 14.5],
            [77.5946, 12.9716],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Kerala",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [76.9366, 8.5241],
            [75.5, 8.5],
            [75.0, 10.0],
            [76.0, 12.0],
            [77.5, 11.0],
            [77.0, 9.0],
            [76.9366, 8.5241],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Madhya Pradesh",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.4126, 23.2599],
            [75.0, 22.5],
            [76.0, 24.5],
            [79.0, 25.5],
            [82.0, 24.0],
            [81.0, 22.0],
            [77.4126, 23.2599],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Maharashtra",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.8777, 19.076],
            [72.0, 20.0],
            [74.0, 21.5],
            [77.5, 22.0],
            [80.0, 20.5],
            [78.0, 18.0],
            [74.5, 17.0],
            [72.8777, 19.076],
          ],
        ],
      },
    },
    // Adding remaining states with simplified polygon data
    {
      type: "Feature",
      properties: {
        name: "Manipur",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [93.9368, 24.817],
            [94.5, 24.5],
            [94.8, 25.0],
            [94.5, 25.5],
            [93.7, 25.2],
            [93.9368, 24.817],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Meghalaya",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [91.8833, 25.5707],
            [91.0, 25.3],
            [92.0, 25.2],
            [93.0, 25.8],
            [92.5, 26.0],
            [91.8833, 25.5707],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Mizoram",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [92.717, 23.7271],
            [92.5, 23.5],
            [93.0, 23.0],
            [93.5, 23.5],
            [93.0, 24.0],
            [92.717, 23.7271],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Nagaland",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [94.11, 25.67],
            [93.5, 25.5],
            [94.0, 26.0],
            [94.8, 26.2],
            [94.5, 25.8],
            [94.11, 25.67],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Odisha",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.8245, 20.2961],
            [84.5, 19.8],
            [85.0, 21.5],
            [87.0, 22.0],
            [87.5, 20.5],
            [86.0, 19.5],
            [85.8245, 20.2961],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Punjab",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [76.7794, 30.7333],
            [74.5, 30.5],
            [75.0, 31.5],
            [76.5, 32.0],
            [77.0, 31.0],
            [76.7794, 30.7333],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Rajasthan",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [75.7873, 26.9124],
            [72.0, 25.0],
            [71.0, 26.0],
            [71.5, 28.0],
            [73.0, 30.0],
            [76.0, 30.5],
            [77.0, 29.5],
            [75.7873, 26.9124],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Sikkim",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [88.6065, 27.3389],
            [88.0, 27.0],
            [88.5, 27.5],
            [89.0, 28.0],
            [88.8, 27.8],
            [88.6065, 27.3389],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Tamil Nadu",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.2707, 13.0827],
            [79.0, 13.0],
            [78.5, 10.0],
            [77.5, 8.5],
            [80.0, 10.0],
            [80.5, 12.0],
            [80.2707, 13.0827],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Telangana",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.4867, 17.385],
            [77.5, 17.0],
            [78.0, 18.5],
            [80.0, 19.0],
            [79.5, 17.5],
            [78.4867, 17.385],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Tripura",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [91.2868, 23.8315],
            [91.0, 23.5],
            [91.5, 23.0],
            [92.0, 23.5],
            [91.5, 24.0],
            [91.2868, 23.8315],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Uttar Pradesh",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.9462, 26.8467],
            [78.0, 27.0],
            [79.0, 29.0],
            [82.0, 29.5],
            [84.0, 28.0],
            [83.0, 26.0],
            [80.9462, 26.8467],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Uttarakhand",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.0322, 30.3165],
            [77.0, 30.0],
            [78.0, 31.5],
            [80.0, 31.0],
            [79.5, 29.5],
            [78.0322, 30.3165],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "West Bengal",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [88.3639, 22.5726],
            [87.0, 22.0],
            [87.5, 24.0],
            [89.0, 26.5],
            [88.0, 27.0],
            [87.0, 25.0],
            [88.3639, 22.5726],
          ],
        ],
      },
    },
  ],
};
