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
  _id: string;
  commonName: string;
  scientificName: string;
  description: string;
  growthRequirements: string;
  benefits: any[];
  region: string;
  imageURL: string;
  id: string;
  price: number;
  growthTips: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
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
  weather: Weather[]; // Array of weather objects
  main: MainWeatherDetails; // Main weather details like temp, humidity, etc.
  visibility: number;
  wind: WindDetails; // Wind details
  dt: number; // Timestamp of the data
  sys: SysDetails; // System details such as country, sunrise, sunset
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
}

export interface Plant_coords {
  _id: ObjectId; // ObjectId from MongoDB
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
  // Array of weather states
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
}

interface Addresses {
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
  Addresss: Addresses;
  Orderid: string;
  plants: TreeCart[];
  User_name: string;
}

export interface CustomSubscription {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Define the TypeScript type for form submission response
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
  long: number;
  late: number;
  address: string;
}
