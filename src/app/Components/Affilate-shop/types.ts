export enum ProductCategory {
    ALL = 'All',
    HOME = 'Home',
    PERSONAL_CARE = 'Personal Care',
    KITCHEN = 'Kitchen',
    GARDEN = 'Garden',
    TECH = 'Tech'
}

export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    price: number;
    oldPrice?: number;
    rating: number;
    reviewsCount: number;
    imageUrl: string;
    amazonUrl: string;
    treesPlanted: number;
    isBestSeller?: boolean;
}
