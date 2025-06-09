"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Search,
  Leaf,
  MapPin,
  IndianRupee,
  Sparkles,
} from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto"></div>
            <p className="text-green-700 font-medium">Growing your garden...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="text-red-500 text-6xl">🌱</div>
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                Discover Plants
              </h1>
              <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
            </div>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Transform your space with nature&apos;s finest collection. From
              sacred trees to fruitful companions.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mt-8 relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for your perfect plant..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl focus:bg-white transition-all duration-300 placeholder:text-gray-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">
                {filteredTrees.length} Plants Available
              </span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">
                {favorites.size} Favorites
              </span>
            </div>
          </div>
        </div>

        {/* No Results */}
        {filteredTrees.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No plants found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms
            </p>
            <button
              onClick={() => setSearch("")}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Plants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrees.map((tree: TreeInfo) => (
            <Card
              key={tree._id}
              className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl"
            >
              <Link href={`/TreeDetiles/${tree._id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tree.imageURL}
                    alt={tree.commonName}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(tree._id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg"
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
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-500/90 text-white border-0 backdrop-blur-sm">
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
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors line-clamp-1">
                      {tree.commonName}
                    </h3>
                    <p className="text-sm text-gray-500 italic line-clamp-1">
                      {tree.scientificName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="line-clamp-1">{tree.region}</span>
                    </div>
                  </div>

                  {/* Benefits Preview */}
                  {tree.benefits && tree.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tree.benefits.slice(0, 2).map((benefit, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-green-50 text-green-700 border-green-200"
                        >
                          {benefit.length > 15
                            ? benefit.substring(0, 15) + "..."
                            : benefit}
                        </Badge>
                      ))}
                      {tree.benefits.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{tree.benefits.length - 2} more
                        </Badge>
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
