"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Search, Leaf, ShoppingCart, Star, TrendingUp, Sparkles, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreeInfo } from "../../../type";

interface AffiliateShopClientProps {
    initialTrees: TreeInfo[];
}

export default function AffiliateShopClient({ initialTrees }: AffiliateShopClientProps) {
    const [search, setSearch] = useState<string>("");

    // Filter for affiliate products (client-side search)
    const affiliateProducts = initialTrees.filter((tree) => {
        if (search) {
            const name = (tree.AffiliateName || tree.commonName || "").toLowerCase();
            const desc = (tree.AffiliateDescription || tree.description || "").toLowerCase();
            const query = search.toLowerCase();
            return name.includes(query) || desc.includes(query);
        }
        return true;
    });

    // Categorize products
    const bestDeals = affiliateProducts.filter(p => p.AffiliateDiscount && p.AffiliateDiscount > 20);
    const featured = affiliateProducts.slice(0, 8);

    return (
        <div className="min-h-screen bg-background">
            {/* Vibrant Hero Header */}
            <div className="relative bg-primary overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-background rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-background rounded-full blur-2xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
                    {/* Top Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground text-sm font-semibold mb-6 border border-primary-foreground/30">
                        <Sparkles size={16} className="animate-pulse" />
                        <span>Eco-Friendly Shopping Made Easy</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 tracking-tight">
                        Shop Smart,
                        <br />
                        <span className="text-accent underline decoration-wavy decoration-2 underline-offset-4">Grow Green 🌱</span>
                    </h1>

                    <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Every purchase plants trees. Browse curated eco-products and make an impact with every click.
                    </p>

                    {/* Enhanced Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
                            <Input
                                type="text"
                                placeholder="Search for eco-friendly products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-14 pr-6 py-7 text-lg rounded-2xl shadow-2xl border-0 bg-background focus:ring-4 focus:ring-primary/50 transition-all placeholder:text-muted-foreground text-foreground"
                            />
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/90">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">{affiliateProducts.length}+ Products</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">100% Eco-Friendly</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">Trees Planted Daily</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                {/* Best Deals Section */}
                {bestDeals.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-destructive rounded-xl flex items-center justify-center">
                                    <TrendingUp className="text-destructive-foreground" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Hot Deals 🔥</h2>
                                    <p className="text-sm text-muted-foreground">Limited time offers</p>
                                </div>
                            </div>
                            <Badge className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-1 text-sm">
                                Save Big!
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {bestDeals.slice(0, 4).map((product) => (
                                <ProductCard key={product._id || product.id} product={product} featured />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Products Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                                <Leaf className="text-primary" size={20} />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">All Products</h2>
                                <p className="text-sm text-muted-foreground">Curated for sustainability</p>
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full">
                            {affiliateProducts.length} Items
                        </span>
                    </div>

                    {affiliateProducts.length === 0 ? (
                        <div className="text-center py-20 bg-card rounded-3xl border-2 border-dashed border-border">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
                            <p className="text-muted-foreground mb-6">Try searching for something else</p>
                            <button
                                onClick={() => setSearch("")}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {affiliateProducts.map((product) => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Trust Banner */}
            <div className="bg-secondary text-secondary-foreground py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                                <ShoppingCart size={20} className="text-foreground" />
                            </div>
                            <div>
                                <p className="font-bold text-lg">Secure Shopping</p>
                                <p className="text-sm text-muted-foreground">Amazon Protected</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                                <Leaf size={20} className="text-foreground" />
                            </div>
                            <div>
                                <p className="font-bold text-lg">Plant Trees</p>
                                <p className="text-sm text-muted-foreground">With Every Purchase</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                                <Star size={20} className="text-foreground" />
                            </div>
                            <div>
                                <p className="font-bold text-lg">Verified NGOs</p>
                                <p className="text-sm text-muted-foreground">Trusted Partners</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Product Card Component
function ProductCard({ product, featured = false }: { product: TreeInfo; featured?: boolean }) {
    const image = product.AffiliateImage || product.imageURL;
    const name = product.AffiliateName || product.commonName;
    const desc = product.AffiliateDescription || product.description;
    const price = product.AffiliatePriseAfterDiscount || product.AffiliatePrise || product.prise;
    const originalPrice = product.AffiliatePrise;
    const discount = product.AffiliateDiscount;

    return (
        <Card className={`group relative flex flex-col overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 bg-card text-card-foreground h-full hover:shadow-2xl hover:-translate-y-2 ${featured ? 'ring-2 ring-accent' : ''}`}>
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-muted p-6">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Leaf size={64} />
                    </div>
                )}

                {/* Discount Badge */}
                {discount && discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground border-0 px-3 py-1.5 text-sm font-bold shadow-lg">
                        {discount}% OFF
                    </Badge>
                )}

                {/* Featured Badge */}
                {featured && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground border-0 px-3 py-1.5 text-xs font-bold shadow-lg">
                        HOT 🔥
                    </Badge>
                )}
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4 flex-grow">
                    <h3 className="text-lg font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-tight">
                        {name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {desc}
                    </p>
                </div>

                {/* Price Section */}
                <div className="pt-4 border-t border-border mt-auto space-y-4">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Price</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-primary">
                                    ₹{price}
                                </span>
                                {originalPrice && originalPrice > price && (
                                    <span className="text-base text-muted-foreground line-through">
                                        ₹{originalPrice}
                                    </span>
                                )}
                            </div>
                            {discount && discount > 0 && originalPrice && (
                                <p className="text-xs text-green-600 font-semibold mt-1">
                                    Save ₹{originalPrice - price}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <a
                        href={product.AffiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-foreground hover:bg-foreground/90 text-background py-3.5 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-xl active:scale-95 group"
                    >
                        <span>Buy on Amazon</span>
                        <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Impact Message */}
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted py-2 px-3 rounded-lg">
                        <Leaf size={14} className="text-primary" />
                        <span className="font-medium">Helps plant trees 🌱</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
