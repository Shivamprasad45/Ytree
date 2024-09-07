import { ReactNode } from "react";

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

export interface Plant_coords {
  _id: string;
  find_id: string;
  UserId: string;
  Plant_id: string;
  commonName: string;
  long: number;
  late: number;
  imageURL: string;
  Plant_Addresses: string;
  subscription: CustomSubscription;
}
export interface Enter_Plant_coords {
  find_id: string;
  UserId: string;
  Plant_id: string;
  commonName: string;
  late: number;
  long: number;
  imageURL: string;
  Plant_Addresses: string;
  subscription: CustomSubscription;
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
  late: number;
  long: number;
  Plant_Addresses: string;
  UserId: string;
  commonName: string;
}

export interface All_Users {
  _id: string;
  firstName: string;
}
