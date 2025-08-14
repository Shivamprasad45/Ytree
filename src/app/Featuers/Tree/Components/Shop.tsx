"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, Leaf, MapPin, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreeInfo } from "../../../../../type";

export default function Shop() {
  const [trees, setTrees] = useState<TreeInfo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Fetch trees from API
  useEffect(() => {
    const fetchTrees = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await axios.get<TreeInfo[]>("/api/Tree/AllTree");
        setTrees(response.data);
      } catch (err) {
        setError("Failed to fetch trees");
        console.error("Error fetching trees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);

  // Filter trees based on search
  const filteredTrees: TreeInfo[] = trees.filter((tree: TreeInfo) =>
    tree.commonName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (treeId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(treeId)) {
        newFavorites.delete(treeId);
      } else {
        newFavorites.add(treeId);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto">
              <div className="w-full h-full border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 text-lg">Loading plants...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6 p-8 max-w-md">
          <div className="text-6xl">🌿</div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Something went wrong
            </h2>
            <p className="text-gray-600">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Plant Collection
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover nature finest. From air-purifying houseplants to garden
                companions.
              </p>
            </div>

            {/* Simple Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search plants..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base border-gray-200 rounded-xl focus:border-green-500 focus:ring-green-500/20 bg-white shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple Stats */}
        <div className="mb-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4 text-green-600" />
            <span>{filteredTrees.length} plants available</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span>{favorites.size} favorites</span>
          </div>
        </div>

        {/* No Results */}
        {filteredTrees.length === 0 && (
          <div className="text-center py-20">
            <div className="space-y-4">
              <div className="text-6xl">🔍</div>
              <h3 className="text-xl font-medium text-gray-800">
                No plants found
              </h3>
              <p className="text-gray-600">Try a different search term</p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Show All Plants
              </button>
            </div>
          </div>
        )}

        {/* Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrees.map((tree: TreeInfo) => (
            <Card
              key={tree._id}
              className="group bg-white border border-gray-100 hover:border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Link href={`/TreeDetiles/${tree._id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={tree.imageURL}
                    alt={tree.commonName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(tree._id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${
                        favorites.has(tree._id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    />
                  </button>

                  {/* Price Badge */}
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 text-gray-800 border-0 font-medium">
                      {tree.price ? (
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="h-3 w-3" />
                          <span>{tree.price}</span>
                        </div>
                      ) : (
                        "Free"
                      )}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                      {tree.commonName}
                    </h3>
                    <p className="text-sm text-gray-500 italic line-clamp-1">
                      {tree.scientificName}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{tree.region}</span>
                  </div>

                  {/* Clean Benefits */}
                  {tree.benefits && tree.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {tree.benefits.slice(0, 2).map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-md"
                        >
                          {benefit.length > 12
                            ? benefit.substring(0, 12) + "..."
                            : benefit}
                        </span>
                      ))}
                      {tree.benefits.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                          +{tree.benefits.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
