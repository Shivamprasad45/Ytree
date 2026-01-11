
import React from 'react';
import { ProductCategory } from './types';
import { CATEGORIES } from './constants';

interface SearchFiltersProps {
    onSearch: (query: string) => void;
    onCategorySelect: (category: ProductCategory) => void;
    selectedCategory: ProductCategory;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch, onCategorySelect, selectedCategory }) => {
    return (
        <div className="flex flex-col gap-6 mb-10">
            <div className="w-full">
                <div className="flex w-full items-stretch rounded-xl h-14 bg-white border border-[#f0f4f0] shadow-sm">
                    <div className="text-gray-400 flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                        type="text"
                        className="w-full bg-transparent border-none focus:ring-0 px-4 text-base font-normal placeholder:text-gray-400"
                        placeholder="Search eco-friendly products..."
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <button className="bg-[#1dc91d] text-[#112111] m-2 px-6 rounded-lg font-bold">Search</button>
                </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => onCategorySelect(cat.name)}
                        className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 text-sm font-semibold transition-all border ${selectedCategory === cat.name
                                ? 'bg-[#1dc91d] text-white border-[#1dc91d]'
                                : 'bg-white border-[#f0f4f0] hover:border-[#1dc91d]'
                            }`}
                    >
                        {cat.icon !== 'grid_view' && (
                            <span className={`material-symbols-outlined text-lg ${selectedCategory === cat.name ? 'text-white' : 'text-[#1dc91d]'}`}>
                                {cat.icon}
                            </span>
                        )}
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchFilters;
