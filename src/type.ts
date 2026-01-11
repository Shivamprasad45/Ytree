export interface IBlog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    author: string;
    tags: string[];
    category: string;
    isPublished: boolean;
    publishedAt?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    readTime?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Message {
    role: 'model' | 'user';
    text: string;
}

export interface TreeInfo {
    _id?: string;
    id: string;
    commonName: string;
    scientificName: string;
    description: string;
    growthRequirements: string;
    benefits: string[];
    region: string;
    imageURL: string;
    prise: number;
    seoTitle: string;
    seoDescription: string;
    growthTips: string;
    seoKeywords: string[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    isPublished?: boolean;
    metadata?: any;
    privateMetadata?: any;
    tags: string[];
    AffiliateLink?: string;
    AffiliateImage?: string;
    AffiliateName?: string;
    AffiliateDescription?: string;
    AffiliatePrise?: number;
    AffiliateDiscount?: number;
    AffiliatePriseAfterDiscount?: number;
}
