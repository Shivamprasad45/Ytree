"use client";

import { useState, useEffect } from "react";
// import districtsByState from "../Another/Data";
import {
  Medal,
  Leaf,
  Loader2,
  TreePine,
  Trophy,
  Search,
  MapPin,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import districtsByState from "../Anothers/State";

interface LeaderboardItem {
  _id: string;
  totalTrees: number;
  name: string;
}

const states = [
  // States (28)
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",

  // Union Territories (8)
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export default function Leaderboard() {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [data, setData] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (state) params.append("state", state);
        if (district) params.append("district", district);

        const res = await fetch(`/api/leaderboard?${params.toString()}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state, district]);

  // Filter data based on search term
  const filteredData = data.filter((item) => item.name);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get medal for top positions
  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Medal className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return (
          <span className="h-6 w-6 flex items-center justify-center font-bold text-emerald-700">
            {position}
          </span>
        );
    }
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white min-h-screen py-8 px-4">
      <Card className="max-w-5xl mx-auto shadow-xl border-emerald-100">
        <CardHeader className="bg-emerald-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8" />
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Tree Planting Leaderboard
              </CardTitle>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-600 text-white border-emerald-400 px-3 py-1"
            >
              <TreePine className="h-4 w-4 mr-1" />
              <span>
                {data.reduce((sum, item) => sum + item.totalTrees, 0)} Trees
                Planted
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1 text-emerald-700">
                <MapPin className="h-4 w-4" /> State
              </label>
              <Select
                value={state}
                onValueChange={(value) => {
                  setState(value);
                  setDistrict("");
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1 text-emerald-700">
                <MapPin className="h-4 w-4" /> District
              </label>
              <Select
                value={district}
                onValueChange={(value) => {
                  setDistrict(value);
                  setCurrentPage(1);
                }}
                disabled={!state}
              >
                <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
                  <SelectValue
                    placeholder={
                      state ? "Select District" : "Select State first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {state &&
                    districtsByState[state]?.map((d: string) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1 text-emerald-700">
                <Search className="h-4 w-4" /> Search
              </label>
              <Input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="relative overflow-x-auto rounded-lg border border-emerald-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-emerald-100 text-emerald-800">
                  <th className="px-4 py-3 text-left w-16">Rank</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-right">Trees Planted</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                        <span className="ml-2 text-emerald-700">
                          Loading leaderboard data...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => {
                    const actualRank =
                      (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <tr
                        key={item._id}
                        className={`
                          border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors
                          ${actualRank <= 3 ? "bg-emerald-50/70" : ""}
                        `}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {getMedalIcon(actualRank)}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {item.name}
                          {actualRank <= 3 && (
                            <Badge className="ml-2 bg-emerald-100 text-emerald-800 border-0">
                              {actualRank === 1
                                ? "Champion"
                                : actualRank === 2
                                ? "Runner-up"
                                : "Top 3"}
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{item._id}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1 font-semibold text-emerald-700">
                            {item.totalTrees}
                            <Leaf className="h-4 w-4 ml-1" />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <TreePine className="h-12 w-12 mb-2 text-emerald-300" />
                        <p className="text-lg font-medium">No data found</p>
                        <p className="text-sm mt-1">
                          Try adjusting your filters or search criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                {filteredData.length} entries
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border border-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentPage === pageNum
                          ? "bg-emerald-600 text-white"
                          : "hover:bg-emerald-50 border border-emerald-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border border-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
