"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TreeInfo } from "../../../../../type";

// Debounce function to limit the rate of invoking search/filter functions
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
// Define the expected shape of the queryKey elements

const fetchTreeInfo = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: (string | number[])[];
}) => {
  const [, search, priceRange, sortBy] = queryKey;

  const response = await axios.get(`/api/Tree/AllTree`, {
    params: {
      page: pageParam,
      limit: 8,
      search,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy,
    },
  });

  return response.data;
};

export default function Shop() {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("price-asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const observer = useRef<IntersectionObserver>();

  // Debounced search to reduce unnecessary queries
  const debouncedSearch = useDebounce(search, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["treeInfo", debouncedSearch, priceRange, sortBy],
    queryFn: fetchTreeInfo,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes to prevent refetching on quick actions
  });

  const lastTreeElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  // Memoize the filtered and sorted data to avoid recalculating on every render
  const filteredAndSortedTrees = useMemo(() => {
    return (
      data?.pages
        .flatMap((page) => page ?? [])
        .filter(
          (tree: TreeInfo) =>
            tree.commonName
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase()) &&
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
        }) || []
    );
  }, [data?.pages, debouncedSearch, priceRange, sortBy]);

  useEffect(() => {
    const handlePullToRefresh = (e: TouchEvent) => {
      const touch = e.touches[0];
      const startY = touch.pageY;

      const handleTouchMove = (e: TouchEvent) => {
        const currentY = e.touches[0].pageY;

        if (currentY > startY && window.scrollY === 0) {
          e.preventDefault();
          // Implement refresh logic here
        }
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchstart", handlePullToRefresh);

    return () => {
      document.removeEventListener("touchstart", handlePullToRefresh);
    };
  }, []);

  // if (isLoading) {
  //   return <ShopSkeleton />;
  // }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: Failed to fetch tree information</p>
      </div>
    );
  }

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Discover Plants</h1>

      <div className="mb-4 flex items-center gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search plants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-120px)] pr-4">
              <div className="py-4 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Sort by
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredAndSortedTrees.map((product: TreeInfo, index: number) => (
          <Card
            key={product._id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            ref={
              index === filteredAndSortedTrees.length - 1
                ? lastTreeElementRef
                : null
            }
          >
            <Link href={`/TreeDetiles/${product._id}`} className="block h-full">
              <div className="relative aspect-square">
                <Image
                  src={`https://picsum.photos/id/${index + 800}/600/400`}
                  alt={product.commonName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold truncate">
                    {product.commonName}
                  </h2>
                  <Heart className="text-gray-400 hover:text-red-500 transition-colors" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-gray-500">
                    {product.price ? `₹${product.price}` : "Free "}
                  </p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{product.region}</span>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {/* {isFetchingNextPage && <ShopSkeleton />} */}
    </div>
  );
}
