import { ReactNode } from "react";

export interface NavItem {
  href: string;
  title: string;
}

export interface User {
  _id: string;
  Username: string;
  Email: string;
  password: string;
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
