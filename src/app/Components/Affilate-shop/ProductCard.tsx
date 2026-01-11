
import React from 'react';
import { Product } from './types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            let icon = 'star';
            let fill = 0;
            if (i <= rating) {
                fill = 1;
            } else if (i - 0.5 <= rating) {
                icon = 'star_half';
                fill = 0.5;
            }

            stars.push(
                <span
                    key={i}
                    className="material-symbols-outlined text-orange-400 text-sm"
                    style={{ fontVariationSettings: `'FILL' ${fill}` }}
                >
                    {icon}
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="group bg-white rounded-xl border border-[#f0f4f0] overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1dc91d] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="material-symbols-outlined text-xs">eco</span>
                    Plants {product.treesPlanted} {product.treesPlanted === 1 ? 'Tree' : 'Trees'}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-1">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500 ml-1">({product.reviewsCount})</span>
                </div>
                <h3 className="text-[#111711] font-bold text-base leading-snug mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                        {product.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                        )}
                        <span className="text-lg font-extrabold text-[#111711]">${product.price.toFixed(2)}</span>
                    </div>
                    <button
                        className="bg-[#1dc91d] text-[#112111] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1dc91d]/90 transition-colors"
                        onClick={() => window.open(product.amazonUrl, '_blank')}
                    >
                        <span className="material-symbols-outlined text-lg">shopping_cart</span>
                        Buy on Amazon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
