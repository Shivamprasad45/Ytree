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
  prise: number;
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
  UserId: string;
  imageUrl: string;
  name: string;
  age: string;
  status: number;
}
export interface IPlantProfile {
  _id: string;
  Plaintid: string;
  UserId: string;
  imageUrl: string;
  name: string;
  age: string;
  status: number;
}
export interface IPlantProfile_Get_One {
  _id: string;
  Plaintid: string;
  UserId: string;
}

export interface Plant_coords {
  _id: string;
  UserId: string;
  Plant_id: string;
  commonName: string;
  long: number;
  late: number;
  imageURL: string;
  Plant_Addresses: string;
}
export interface Coords {
  long: number;
  late: number;
  Address: string;
}
