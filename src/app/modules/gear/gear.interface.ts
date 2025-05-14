import { Model } from 'mongoose';

export enum GearCategory {
  HELMET = 'Helmet',
  GLOVES = 'Gloves',
  JACKET = 'Jacket',
  BOOTS = 'Boots',
  PROTECTION = 'Protection',
  ACCESSORIES = 'Accessories',
  RAIN_GEAR = 'Rain Gear',
  ELECTRONICS = 'Electronics',
}

export enum GearBrand {
  RideTalk = 'RideTalk',
  ThermoTech = 'ThermoTech',
  AdventureGear = 'AdventureGear',
  RideReady = 'RideReady',
  RoadMaster = 'RoadMaster',
  RaceTech = 'RaceTech',
  SafeRide = 'SafeRide',
}

export interface IGear {
  name: string;
  brand: GearBrand;
  category: GearCategory;
  model: string;
  price: number;
  description: string;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  stock: number;
  images: string[];
  rating?: number;
  reviewCount?: number;
  isStock: boolean;
}

export type GearModel = Model<IGear, Record<string, unknown>>;
