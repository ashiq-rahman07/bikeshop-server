import { Model } from 'mongoose';

// Yamaha · Honda · Suzuki · Hero · Tvs · Bajaj · Lifan ·
export enum BikeBrand {
  Velocity = 'Velocity',
  CruiserKing = 'Cruiser King',
  UrbanScoot = 'UrbanScoot',
  DirtDevil = 'DirtDevil',
  ElectroMoto = 'ElectroMoto',
  ClassicMotors = 'ClassicMotors',
  MotoMax = 'MotoMax',
  Yamaha = 'Yamaha',
  Honda = 'Honda',
  Suzuki = 'Suzuki',
}

export enum BikeCategory {
  Sport = 'Sport',
  Cruiser = 'Cruiser',
  Scooter = 'Scooter',
  OffRoad = 'Off-road',
  Electric = 'Electric',
  Classic = 'Classic',
  Naked = 'Naked',
}
export interface IBike {
  id: string;
  name: string;
  brand: BikeBrand;
  category: BikeCategory;
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
  productType?: 'bike'
}

export type BikeModel = Model<IBike, Record<string, unknown>>;
