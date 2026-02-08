import { ReactNode } from "react";
import { ObjectId } from "mongodb";

export interface NavItem {
    href: string;
    title: string;
}

export interface Data {
    _id: string;
    Username: string;
    email: string;
}

export interface User {
    data: Data;
    message: string;
    error: string;
}

export interface EnterUser {
    Username: string;
    Email: string;
    password: string;
}

export interface LoginUser {
    Email: string;
    password: string;
}

export interface UserMessage {
    message: string;
    success: boolean;
    error: string;
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
    sideImages?: string[];
    stock?: number;
    offer?: {
        type: 'none' | 'discount' | 'b2g1' | 'combo';
        value?: number;
        buyQuantity?: number;
        getQuantity?: number;
        label?: string;
        bundleItems?: {
            itemId: string;
            qty: number;
        }[];
    };
}

export interface ISubsection {
    id: string;
    title: string;
    order: number;
    content: string;
    youtubeUrl?: string;
    imageUrl?: string;
}

export interface ISection {
    id: string;
    title: string;
    order: number;
    content: string;
    youtubeUrl?: string;
    imageUrl?: string;
    subsections: ISubsection[];
}

export interface IBlog {
    _id: string;
    title: string;
    slug: string;
    subtitle?: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    featuredVideo?: string;
    author: string;
    tags: string[];
    category: string;
    isPublished: boolean;
    publishedAt?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    readTime?: number; // in minutes
    sections: ISection[];
    customFields?: Record<string, any>;
    createdAt?: string;
    updatedAt?: string;
}

export interface Message {
    role: 'model' | 'user';
    text: string;
}

export interface menuItem {
    id: number;
    icon: ReactNode;
    label: string;
    path: string;
}

export interface TreeCart {
    UserId: string;
    Plant_id: string;
    commonName: string;
    scientificName: string;
    description: string;
    growthRequirements: string;
    benefits: string[];
    region: string;
    imageURL: string;
    price: number;
    quantity: number;
}

export interface Update_Cart {
    UserId: string;
    _id: string;
    Symbol: string;
}

export interface TreeCarts {
    _id: string;
    UserId: string;
    Plant_id: string;
    commonName: string;
    scientificName: string;
    description: string;
    growthRequirements: string;
    benefits: string[];
    region: string;
    imageURL: string;
    price: number;
    quantity: number;
}

export interface InMytrees {
    Plaintid: string;
    findtree_id: string;
    UserId: string;
    imageUrl: string;
    name: string;
    age: number;
    status: number;
}

export interface IPlantProfile {
    _id: string;
    Plaintid: string;
    findtree_id: string;
    UserId: string;
    imageUrl: string;
    name: string;
    age: number;
    status: number;
}

export interface IPlantProfile_Get_One {
    _id: string;
    Plaintid: string;
    UserId: string;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherDetails {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface WindDetails {
    speed: number;
    deg: number;
    gust: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface SysDetails {
    country: string;
    sunrise: number;
    sunset: number;
}

export interface LastWeatherState {
    coord: Coord;
    weather: Weather[];
    main: MainWeatherDetails;
    visibility: number;
    wind: WindDetails;
    dt: number;
    sys: SysDetails;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface CustomSubscription {
    keys: {
        p256dh: string;
        auth: string;
    };
    endpoint: string;
    expirationTime?: number | null;
}

export interface Plant_coords {
    _id: ObjectId;
    find_id: string;
    UserId: string;
    Plant_id: string;
    commonName: string;
    description: string;
    long: number;
    late: number;
    imageURL: string;
    Plant_Addresses: string;
    subscription: CustomSubscription;
    lastWeatherState: LastWeatherState[];
    bio?: string;
    name?: string;
    relation?: string;
    verifed: boolean;
}

export interface Enter_Plant_coords {
    find_id: string;
    UserId?: string;
    Plant_id?: string;
    commonName?: string;
    late: number;
    long: number;
    imageURL: string;
    Plant_Addresses: string;
    subscription?: CustomSubscription;
    description?: string;
    bio?: string;
    name?: string;
    relation?: string;
}

export interface Coords {
    long: number;
    late: number;
    Address: string;
    state: string;
    district: string;
}

export interface Addresses {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface Plant_order {
    Addresss?: Addresses;
    Orderid: string;
    plants: TreeCart[];
    User_name: string;
    assignedNGO?: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactFormResponse {
    success: boolean;
    message: string;
}

export interface Coordinate {
    find_id: string;
    late: number;
    long: number;
    Plant_Addresses: string;
    UserId: string;
    commonName: string;
    imageURL: string;
    bio: string;
    relation: string;
    name: string;
    verifed: boolean;
}

export interface All_Users {
    _id: string;
    firstName: string;
    treeCount?: number;
    lastName: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Free_clam_plant {
    email: string;
    name: string;
    mobil_number: string;
    reason: string;
    treeType: string;
    UserId: string;
    findtree_id: string;
    Plaintid: string;
}

export interface GeoJsonFeature {
    type: string;
    properties: {
        name: string;
        [key: string]: any;
    };
    geometry: {
        type: string;
        coordinates: any[];
    };
}

export interface GeoJsonData {
    type: string;
    features: GeoJsonFeature[];
}

export interface ImpactStat {
    icon: string;
    label: string;
    value: string;
}

export interface Step {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    imageUrl: string;
}