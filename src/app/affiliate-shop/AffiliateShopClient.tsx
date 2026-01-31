"use client";

import React, { useState, useMemo } from 'react';
import Hero from '../Components/Affilate-shop/Hero';
import SearchFilters from '../Components/Affilate-shop/SearchFilters';
import ProductGrid from '../Components/Affilate-shop/ProductGrid';
import GeminiAssistant from '../Components/Affilate-shop/GeminiAssistant';
import { ProductCategory } from '../Components/Affilate-shop/types';
import { TreeInfo } from '../../type'; // Updated to point to main type.ts


interface AffiliateShopClientProps {
    initialTrees: TreeInfo[];
}

const AffiliateShopClient: React.FC<AffiliateShopClientProps> = ({ initialTrees }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(ProductCategory.ALL);

    // Map initialTrees (TreeInfo) to Product interface, filtering only those with AffiliateLink
    const products = useMemo(() => {
        return initialTrees
            .filter(tree => tree.AffiliateLink) // Filter: Must have an affiliate link
            .map(tree => ({
                id: tree._id || tree.id,
                name: tree.AffiliateName || tree.commonName,
                // Use tag as category if it matches enum, else fallback or 'All'
                category: (tree.tags && tree.tags.length > 0) ? (tree.tags[0] as ProductCategory) : ProductCategory.HOME,
                price: tree.AffiliatePriseAfterDiscount || tree.AffiliatePrise || tree.prise,
                oldPrice: tree.AffiliatePrise,
                rating: 4.5, // Mock rating or derived if available
                reviewsCount: 120, // Mock reviews
                imageUrl: tree.AffiliateImage || tree.imageURL,
                amazonUrl: tree.AffiliateLink || '#',
                treesPlanted: 1,
                isBestSeller: tree.tags?.includes('bestseller')
            }));
    }, [initialTrees]);


    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === ProductCategory.ALL || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleCategorySelect = (category: ProductCategory) => {
        setSelectedCategory(category);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar is handled by layout.tsx */}

            <main className="flex-1 flex flex-col items-center">
                <div className="w-full max-w-[1200px] px-4 py-8">
                    <Hero />

                    <SearchFilters
                        onSearch={handleSearch}
                        onCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory}
                    />

                    <div className="flex items-center justify-between mb-6 px-2">
                        <h2 className="text-2xl font-extrabold tracking-tight">
                            {selectedCategory === ProductCategory.ALL ? 'Curated Eco-Friendly Essentials' : `${selectedCategory} Essentials`}
                        </h2>
                        <div className="text-sm font-semibold text-gray-500">
                            Showing {filteredProducts.length} products
                        </div>
                    </div>

                    <ProductGrid products={filteredProducts} />

                    {/* AI Feature Component */}
                    <GeminiAssistant onProductSelect={(name: string) => handleSearch(name)} />

                    {/* Amazon Disclaimer */}
                    <div className="mt-20 border-t border-dashed border-gray-300 pt-10 text-center max-w-2xl mx-auto px-4">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">Powered by</span>
                            <div className="h-6 flex items-center">
                                <svg className="h-6" viewBox="0 0 1024 311" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M634.921 213.7c-21.821 16.518-50.551 26.602-79.623 26.602-48.337 0-91.065-27.994-91.065-85.344s45.051-89.418 97.466-89.418c28.312 0 51.583 9.771 72.822 24.31l.4-.401V72.484c0-10.463-5.228-15.684-15.684-15.684H415.539c-10.463 0-15.684 5.221-15.684 15.684v178.966c0 10.463 5.221 15.684 15.684 15.684h139.754c10.463 0 15.684-5.221 15.684-15.684v-23.73l.4-.4c13.793 11.517 38.307 24.032 63.538 24.032 68.324 0 119.222-49.034 119.222-120.559 0-82.646-64.814-121.782-119.222-121.782m-60.718-20.089c-31.956 0-51.583-19.463-51.583-49.034 0-25.044 19.345-48.163 51.583-48.163 35.808 0 54.331 23.447 54.331 48.163 0 31.912-21.232 49.034-54.331 49.034M246.035 240.302c10.463 0 15.684-5.221 15.684-15.684v-23.73l.4-.4c13.793 11.517 38.307 24.032 63.538 24.032 68.324 0 119.222-49.034 119.222-120.559 0-82.646-64.814-121.782-119.222-121.782-21.821 16.518-50.551 26.602-79.623 26.602-48.337 0-91.065-27.994-91.065-85.344s45.051-89.418 97.466-89.418c28.312 0 51.583 9.771 72.822 24.31l.4-.401v-17.37c0-10.463-5.221-15.684-15.684-15.684H25.867C15.404 42.174 10.183 47.395 10.183 57.858v178.966c0 10.463 5.221 15.684 15.684 15.684h139.754c10.463 0 15.684-5.221 15.684-15.684v-23.73l.4-.4c13.793 11.517 38.307 24.032 63.538 24.032m-60.718-20.089c-31.956 0-51.583-19.463-51.583-49.034 0-25.044 19.345-48.163 51.583-48.163 35.808 0 54.331 23.447 54.331 48.163 0 31.912-21.232 49.034-54.331 49.034M859.986 240.302c10.463 0 15.684-5.221 15.684-15.684v-98.37c0-34.935 20.806-53.111 51.583-53.111 26.966 0 44.204 15.067 44.204 43.682v107.799c0 10.463 5.221 15.684 15.684 15.684h111.458c10.463 0 15.684-5.221 15.684-15.684V113.125c0-71.187-43.04-114.71-105.908-114.71-38.307 0-66.216 16.518-82.646 41.876h-.401v-26.602c0-10.463-5.221-15.684-15.684-15.684H760.323c-10.463 0-15.684 5.221-15.684 15.684v178.966c0 10.463 5.221 15.684 15.684 15.684h99.663z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">
                            Vanagrow is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases which are then used to fund verified tree-planting projects.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AffiliateShopClient;
