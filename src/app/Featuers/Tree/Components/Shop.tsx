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
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto">
              <div className="w-full h-full border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="text-muted-foreground text-lg">Loading plants...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 p-8 max-w-md">
          <div className="text-6xl">🌿</div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Something went wrong
            </h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Clean Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Plant Collection
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover nature finest. From air-purifying houseplants to garden
                companions.
              </p>
            </div>

            {/* Simple Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search plants..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base border-input rounded-xl focus:border-primary focus:ring-primary/20 bg-background shadow-sm text-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple Stats */}
        <div className="mb-8 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4 text-primary" />
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
              <h3 className="text-xl font-medium text-foreground">
                No plants found
              </h3>
              <p className="text-muted-foreground">Try a different search term</p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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
              className="group bg-card border border-border hover:border-primary/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Link href={`/TreeDetiles/${tree._id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={tree.imageURL}
                    alt={tree.commonName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Price Badge */}
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-background/90 text-foreground border-0 font-medium dark:bg-black/60 backdrop-blur-sm">
                      {tree.prise ? (
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="h-3 w-3" />
                          <span>{tree.prise}</span>
                        </div>
                      ) : (
                        "Free"
                      )}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {tree.commonName}
                    </h3>
                    <p className="text-sm text-muted-foreground italic line-clamp-1">
                      {tree.scientificName}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{tree.region}</span>
                  </div>

                  {/* Clean Benefits */}
                  {tree.benefits && tree.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {tree.benefits.slice(0, 2).map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-md"
                        >
                          {benefit.length > 12
                            ? benefit.substring(0, 12) + "..."
                            : benefit}
                        </span>
                      ))}
                      {tree.benefits.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
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
