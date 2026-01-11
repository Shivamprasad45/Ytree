import { Product, ProductCategory } from './types';

export const CATEGORIES = [
    { name: ProductCategory.ALL, icon: 'grid_view' },
    { name: ProductCategory.HOME, icon: 'chair' },
    { name: ProductCategory.PERSONAL_CARE, icon: 'self_care' },
    { name: ProductCategory.KITCHEN, icon: 'kitchen' },
    { name: ProductCategory.GARDEN, icon: 'potted_plant' },
    { name: ProductCategory.TECH, icon: 'devices' },
];

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Bamboo Toothbrush Set (4 Pack)',
        category: ProductCategory.PERSONAL_CARE,
        price: 12.99,
        oldPrice: 15.99,
        rating: 4.8,
        reviewsCount: 1240,
        imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb6dcaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        amazonUrl: '#',
        treesPlanted: 1,
        isBestSeller: true
    },
    {
        id: '2',
        name: 'Reusable Silicone Food Storage Bags',
        category: ProductCategory.KITCHEN,
        price: 19.95,
        rating: 4.5,
        reviewsCount: 850,
        imageUrl: 'https://images.unsplash.com/photo-1584305574647-0cc94c0ca2f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        amazonUrl: '#',
        treesPlanted: 2
    },
    {
        id: '3',
        name: 'Solar Powered Outdoor Lights',
        category: ProductCategory.GARDEN,
        price: 29.99,
        oldPrice: 39.99,
        rating: 4.6,
        reviewsCount: 2100,
        imageUrl: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        amazonUrl: '#',
        treesPlanted: 3
    },
    {
        id: '4',
        name: 'Organic Cotton Bed Sheets',
        category: ProductCategory.HOME,
        price: 89.00,
        rating: 4.9,
        reviewsCount: 530,
        imageUrl: 'https://images.unsplash.com/photo-1522771753018-be16d7158fac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        amazonUrl: '#',
        treesPlanted: 5
    },
    {
        id: '5',
        name: 'Biodegradable Phone Case',
        category: ProductCategory.TECH,
        price: 24.50,
        rating: 4.3,
        reviewsCount: 320,
        imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        amazonUrl: '#',
        treesPlanted: 2
    },
    {
        id: '6',
        name: 'Compost Bin for Kitchen',
        category: ProductCategory.KITCHEN,
        price: 34.99,
        oldPrice: 42.00,
        rating: 4.7,
        reviewsCount: 980,
        imageUrl: 'https://images.unsplash.com/photo-1621575971485-f2d1e9e033e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        amazonUrl: '#',
        treesPlanted: 3
    },
    {
        id: '7',
        name: 'Eco-Friendly Laundry Detergent Sheets',
        category: ProductCategory.HOME,
        price: 14.99,
        rating: 4.4,
        reviewsCount: 1560,
        imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        amazonUrl: '#',
        treesPlanted: 1
    },
    {
        id: '8',
        name: 'Recycled Plastic Rug',
        category: ProductCategory.HOME,
        price: 45.00,
        rating: 4.2,
        reviewsCount: 210,
        imageUrl: 'https://images.unsplash.com/photo-1563811802-5ee62a3f9e96?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        amazonUrl: '#',
        treesPlanted: 4
    }
];
