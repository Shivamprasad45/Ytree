// "use client";

// import { useState } from "react";
// import {
//   Loader2,
//   Medal,
//   ArrowUpDown,
//   Search,
//   Trophy,
//   Leaf,
//   MapPin,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useAll_leadersQuery } from "@/app/Featuers/Tree/TreeServices";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function Leaderboard() {
//   const { data, isLoading, isError } = useAll_leadersQuery();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "totalTrees",
//     direction: "desc",
//   });
//   const [filterState, setFilterState] = useState("all");

//   // Filtered and sorted data
//   const processedData = data
//     ? data
//         .filter(
//           (leader) =>
//             (filterState === "all" || leader.state === filterState) &&
//             (leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               leader.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               leader.district.toLowerCase().includes(searchTerm.toLowerCase()))
//         )
//         .sort((a, b) => {
//           if (sortConfig.key === "totalTrees") {
//             return sortConfig.direction === "asc"
//               ? a.totalTrees - b.totalTrees
//               : b.totalTrees - a.totalTrees;
//           } else {
//             // For text fields
//             const aValue = a[sortConfig.key].toLowerCase();
//             const bValue = b[sortConfig.key].toLowerCase();
//             return sortConfig.direction === "asc"
//               ? aValue.localeCompare(bValue)
//               : bValue.localeCompare(aValue);
//           }
//         })
//     : [];

//   // Get unique states for filter
//   interface Leader {
//     _id: string;
//     name: string;
//     state: string;
//     district: string;
//     totalTrees: number;
//   }

//   interface SortConfig {
//     key: keyof Leader;
//     direction: "asc" | "desc";
//   }

//   const uniqueStates: string[] = data
//     ? ["all", ...new Set(data.map((leader: Leader) => leader.state))]
//     : ["all"];

//   const handleSort = (key) => {
//     setSortConfig({
//       key,
//       direction:
//         sortConfig.key === key && sortConfig.direction === "desc"
//           ? "asc"
//           : "desc",
//     });
//   };

//   // Get medal for top 3 ranks
//   const getMedalColor = (index) => {
//     if (index === 0) return "text-yellow-500"; // gold
//     if (index === 1) return "text-gray-400"; // silver
//     if (index === 2) return "text-amber-700"; // bronze
//     return "text-gray-500"; // default
//   };

//   const getMedalBackground = (index) => {
//     if (index === 0) return "bg-yellow-50"; // gold
//     if (index === 1) return "bg-gray-50"; // silver
//     if (index === 2) return "bg-amber-50"; // bronze
//     return ""; // default
//   };

//   // Calculate total trees planted
//   const totalTreesPlanted = data
//     ? data.reduce((sum, item) => sum + item.totalTrees, 0)
//     : 0;

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[50vh]">
//         <div className="text-center">
//           <Loader2 className="animate-spin w-12 h-12 text-green-600 mx-auto mb-4" />
//           <p className="text-green-800 font-medium">
//             Loading leaderboard data...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="max-w-4xl mx-auto p-8 text-center">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//           <div className="text-red-600 text-xl font-semibold mb-2">
//             Unable to load leaderboard
//           </div>
//           <p className="text-red-500 mb-4">
//             We encountered an issue while fetching the data. Please try again
//             later.
//           </p>
//           <Button
//             variant="outline"
//             className="border-red-300 text-red-600 hover:bg-red-50"
//           >
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-4 md:p-8">
//       {/* Header with stats */}
//       <div className="mb-8 text-center">
//         <div className="inline-flex items-center justify-center mb-2">
//           <Trophy className="h-8 w-8 text-green-600 mr-2" />
//           <h1 className="text-3xl md:text-4xl font-bold text-green-800">
//             Tree Planting Leaderboard
//           </h1>
//         </div>

//         <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//           Celebrating the champions of environmental conservation. Together
//           we&#39;ve planted{" "}
//           <span className="font-bold text-green-700">
//             {totalTreesPlanted.toLocaleString()}
//           </span>{" "}
//           trees!
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
//           {processedData.slice(0, 3).map((leader, index) => (
//             <Card
//               key={leader._id}
//               className={cn(
//                 "overflow-hidden border-2",
//                 index === 0
//                   ? "border-yellow-400"
//                   : index === 1
//                   ? "border-gray-300"
//                   : "border-amber-600"
//               )}
//             >
//               <div
//                 className={cn(
//                   "py-3 text-center font-bold",
//                   index === 0
//                     ? "bg-yellow-100 text-yellow-800"
//                     : index === 1
//                     ? "bg-gray-100 text-gray-800"
//                     : "bg-amber-100 text-amber-800"
//                 )}
//               >
//                 <div className="flex items-center justify-center">
//                   <Medal className={getMedalColor(index)} size={18} />
//                   <span className="ml-1">
//                     {index === 0 ? "Gold" : index === 1 ? "Silver" : "Bronze"}
//                   </span>
//                 </div>
//               </div>
//               <CardContent className="p-4 text-center">
//                 <h3 className="font-bold text-lg mb-1">{leader.name}</h3>
//                 <div className="text-sm text-gray-600 mb-2">
//                   {leader.district}, {leader.state}
//                 </div>
//                 <Badge
//                   variant="outline"
//                   className="bg-green-50 text-green-800 border-green-200 font-semibold"
//                 >
//                   <Leaf className="h-3.5 w-3.5 mr-1" />
//                   {leader.totalTrees.toLocaleString()} trees
//                 </Badge>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
//           <div className="relative col-span-1 md:col-span-2">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <Input
//               type="text"
//               placeholder="Search by name, state or district..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
//             />
//           </div>

//           <Select value={filterState} onValueChange={setFilterState}>
//             <SelectTrigger className="border-gray-200">
//               <div className="flex items-center">
//                 <MapPin className="h-4 w-4 mr-2 text-gray-500" />
//                 <SelectValue placeholder="Filter by state" />
//               </div>
//             </SelectTrigger>
//             <SelectContent>
//               {uniqueStates.map((state) => (
//                 <SelectItem key={state} value={state}>
//                   {state === "all" ? "All States" : state}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <Tabs defaultValue="table" className="w-full">
//         <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
//           <TabsTrigger value="table">Table View</TabsTrigger>
//           <TabsTrigger value="cards">Card View</TabsTrigger>
//         </TabsList>

//         {/* Table View */}
//         <TabsContent value="table" className="w-full">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead className="bg-green-600 text-white">
//                   <tr>
//                     <th className="py-3 px-4 font-semibold">Rank</th>
//                     <th
//                       className="py-3 px-4 cursor-pointer group font-semibold"
//                       onClick={() => handleSort("name")}
//                     >
//                       <div className="flex items-center">
//                         Name
//                         <ArrowUpDown
//                           size={16}
//                           className={cn(
//                             "ml-1 transition-opacity",
//                             sortConfig.key === "name"
//                               ? "opacity-100"
//                               : "opacity-50 group-hover:opacity-100"
//                           )}
//                         />
//                       </div>
//                     </th>
//                     <th
//                       className="py-3 px-4 cursor-pointer group font-semibold"
//                       onClick={() => handleSort("state")}
//                     >
//                       <div className="flex items-center">
//                         State
//                         <ArrowUpDown
//                           size={16}
//                           className={cn(
//                             "ml-1 transition-opacity",
//                             sortConfig.key === "state"
//                               ? "opacity-100"
//                               : "opacity-50 group-hover:opacity-100"
//                           )}
//                         />
//                       </div>
//                     </th>
//                     <th
//                       className="py-3 px-4 cursor-pointer group font-semibold"
//                       onClick={() => handleSort("district")}
//                     >
//                       <div className="flex items-center">
//                         District
//                         <ArrowUpDown
//                           size={16}
//                           className={cn(
//                             "ml-1 transition-opacity",
//                             sortConfig.key === "district"
//                               ? "opacity-100"
//                               : "opacity-50 group-hover:opacity-100"
//                           )}
//                         />
//                       </div>
//                     </th>
//                     <th
//                       className="py-3 px-4 cursor-pointer group font-semibold"
//                       onClick={() => handleSort("totalTrees")}
//                     >
//                       <div className="flex items-center">
//                         Trees Planted
//                         <ArrowUpDown
//                           size={16}
//                           className={cn(
//                             "ml-1 transition-opacity",
//                             sortConfig.key === "totalTrees"
//                               ? "opacity-100"
//                               : "opacity-50 group-hover:opacity-100"
//                           )}
//                         />
//                       </div>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {processedData.map((leader, index) => (
//                     <tr
//                       key={leader._id}
//                       className={cn(
//                         "transition-colors",
//                         index % 2 === 0 ? "bg-gray-50" : "bg-white",
//                         getMedalBackground(index),
//                         "hover:bg-green-50"
//                       )}
//                     >
//                       <td className="py-3 px-4 font-semibold flex items-center">
//                         {index < 3 ? (
//                           <Medal
//                             className={cn("mr-1", getMedalColor(index))}
//                             size={18}
//                           />
//                         ) : null}
//                         {index + 1}
//                       </td>
//                       <td className="py-3 px-4 font-medium">{leader.name}</td>
//                       <td className="py-3 px-4">{leader.state}</td>
//                       <td className="py-3 px-4">{leader.district}</td>
//                       <td className="py-3 px-4">
//                         <Badge
//                           variant="outline"
//                           className="bg-green-50 text-green-800 border-green-200 font-semibold"
//                         >
//                           {leader.totalTrees.toLocaleString()}
//                         </Badge>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </TabsContent>

//         {/* Card View */}
//         <TabsContent value="cards">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {processedData.map((leader, index) => (
//               <Card
//                 key={leader._id}
//                 className={cn(
//                   "overflow-hidden transition-all hover:shadow-lg",
//                   index < 3 ? "border-l-4 border-green-500" : ""
//                 )}
//               >
//                 <CardContent className="p-0">
//                   <div
//                     className={cn(
//                       "py-2 px-4 flex justify-between items-center",
//                       index < 3 ? getMedalBackground(index) : "bg-gray-50"
//                     )}
//                   >
//                     <div className="flex items-center">
//                       <div
//                         className={cn(
//                           "w-8 h-8 rounded-full flex items-center justify-center mr-2",
//                           index < 3 ? "bg-white/80" : "bg-white/60"
//                         )}
//                       >
//                         {index < 3 ? (
//                           <Medal className={getMedalColor(index)} size={16} />
//                         ) : (
//                           <span className="font-bold text-gray-600">
//                             {index + 1}
//                           </span>
//                         )}
//                       </div>
//                       <span className="font-medium text-sm text-gray-600">
//                         Rank {index + 1}
//                       </span>
//                     </div>
//                     <Badge
//                       variant="outline"
//                       className="bg-green-50 text-green-800 border-green-200 font-semibold"
//                     >
//                       <Leaf className="h-3.5 w-3.5 mr-1" />
//                       {leader.totalTrees.toLocaleString()}
//                     </Badge>
//                   </div>

//                   <div className="p-4">
//                     <h3 className="font-bold text-lg mb-1">{leader.name}</h3>
//                     <div className="flex items-center text-gray-600 text-sm">
//                       <MapPin className="h-4 w-4 mr-1 text-gray-400" />
//                       {leader.district}, {leader.state}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>

//       {/* No Results Message */}
//       {processedData.length === 0 && !isLoading && (
//         <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200 mt-6">
//           <Search className="h-10 w-10 text-gray-300 mx-auto mb-2" />
//           <p className="text-gray-500 font-medium">
//             No results found. Try adjusting your search or filters.
//           </p>
//           <Button
//             variant="outline"
//             className="mt-4"
//             onClick={() => {
//               setSearchTerm("");
//               setFilterState("all");
//             }}
//           >
//             Clear filters
//           </Button>
//         </div>
//       )}

//       {/* Total Summary */}
//       {data && (
//         <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100 text-center">
//           <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
//             <div className="bg-white p-3 rounded-md shadow-sm">
//               <div className="text-sm text-gray-500 mb-1">
//                 Total Participants
//               </div>
//               <div className="font-bold text-xl text-green-800">
//                 {data.length}
//               </div>
//             </div>
//             <div className="bg-white p-3 rounded-md shadow-sm">
//               <div className="text-sm text-gray-500 mb-1">Trees Planted</div>
//               <div className="font-bold text-xl text-green-800">
//                 {totalTreesPlanted.toLocaleString()}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
