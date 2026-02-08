"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, Leaf, MapPin, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreeInfo } from "../../../../type";

interface ShopProps {
  initialTrees: TreeInfo[];
}

export default function Shop({ initialTrees }: ShopProps) {
  const [trees] = useState<TreeInfo[]>(initialTrees);
  const [search, setSearch] = useState<string>("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

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
                  <div className="absolute bottom-3 left-3 flex flex-col gap-2 items-start">
                    {tree.offer && tree.offer.type !== 'none' && (
                      <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 font-bold shadow-md">
                        {tree.offer.label || tree.offer.type.toUpperCase()}
                      </Badge>
                    )}

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
