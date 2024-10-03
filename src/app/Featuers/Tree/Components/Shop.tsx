"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Loading from "@/app/Loading/Loading";

import { TreeInfo } from "../../../../../type";
import MaxWidthRappers from "@/components/MaxWidthRapper";

const fetchTreeInfo = async () => {
  const response = await axios.get("/api/Tree/AllTree");
  return response.data;
};

export default function Shop() {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("price-asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const {
    data: feature,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["treeInfo"],
    queryFn: fetchTreeInfo,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: Failed to fetch tree information</p>
      </div>
    );
  }

  const filteredAndSortedTrees = feature
    .filter(
      (tree: TreeInfo) =>
        tree.commonName.toLowerCase().includes(search.toLowerCase()) &&
        tree.price >= priceRange[0] &&
        tree.price <= priceRange[1]
    )
    .sort((a: TreeInfo, b: TreeInfo) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc")
        return a.commonName.localeCompare(b.commonName);
      if (sortBy === "name-desc")
        return b.commonName.localeCompare(a.commonName);
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSortedTrees.length / itemsPerPage);
  const paginatedTrees = filteredAndSortedTrees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <MaxWidthRappers>
      <div className="py-8 px-4 sm:px-6 lg:px-8 m-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Shop Trees</h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search trees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            min={0}
            max={500}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedTrees.map((product: TreeInfo, index: number) => (
            <Card
              key={product._id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                href={`/TreeDetiles/${product._id}`}
                className="block h-full"
              >
                <div className="relative">
                  <Image
                    src={`https://picsum.photos/id/${index + 800}/200/300`}
                    alt={product.commonName}
                    width={300}
                    height={200}
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-1 truncate">
                    {product.commonName}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 truncate">
                    {product.scientificName}
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                      {product.benefits[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Button variant="default" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      (42)
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* <div className="mt-8 flex justify-center   mb-32">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div> */}
      </div>
    </MaxWidthRappers>
  );
}
