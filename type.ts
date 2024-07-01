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
export interface IPlantProfile {
  _id: string;
  imageUrl: string;
  name: string;
  age: string;
}

export interface menuItem {
  id: number;
  icon: ReactNode;
  label: string;
  path: string;
}

export interface TreeCart {
  UserId: string;
  _id: string;
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
