import { Vector3 } from 'three';

export interface StarData {
  name: string;
  ra: number; // Right Ascension in degrees (0-360)
  dec: number; // Declination in degrees (-90 to 90)
  magnitude: number; // Brightness (lower is brighter)
  color?: string;
  id: string;
}

export interface ConstellationData {
  id: string;
  name: string;
  nameZh: string; // Chinese Name
  latinName: string;
  stars: StarData[];
  connections: number[][]; // Array of [startIndex, endIndex] pairs
}

export interface CartesianStar extends StarData {
  position: Vector3;
}

export interface ProcessedConstellation {
  id: string;
  name: string;
  nameZh: string;
  latinName: string;
  stars: CartesianStar[];
  connections: number[][];
  center: Vector3;
  radius: number;
}