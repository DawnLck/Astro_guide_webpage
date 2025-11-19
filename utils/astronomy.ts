import { Vector3 } from 'three';
import { StarData, ProcessedConstellation, ConstellationData } from '../types';

// Radius of the celestial sphere
const SPHERE_RADIUS = 50;

/**
 * Convert Right Ascension (degrees) and Declination (degrees) to Cartesian coordinates (x, y, z).
 * Three.js coordinate system: Y is Up.
 * Astronomy: Z is North Celestial Pole?
 * Let's map:
 * Y axis = North Celestial Pole (Dec +90)
 * X/Z plane = Celestial Equator
 */
export const sphericalToCartesian = (raDeg: number, decDeg: number, radius: number = SPHERE_RADIUS): Vector3 => {
  const raRad = (raDeg * Math.PI) / 180;
  const decRad = (decDeg * Math.PI) / 180;

  // Standard conversion
  // y = r * sin(dec)
  // x = r * cos(dec) * sin(ra)
  // z = r * cos(dec) * cos(ra) 
  
  const y = radius * Math.sin(decRad);
  const rPlane = radius * Math.cos(decRad);
  const x = rPlane * Math.sin(raRad);
  const z = rPlane * Math.cos(raRad);

  return new Vector3(x, y, z);
};

export const processConstellation = (data: ConstellationData): ProcessedConstellation => {
  const stars = data.stars.map(star => ({
    ...star,
    position: sphericalToCartesian(star.ra, star.dec)
  }));

  // Calculate centroid for camera targeting
  const center = new Vector3();
  stars.forEach(s => center.add(s.position));
  center.divideScalar(stars.length);

  // Calculate radius for hit testing
  let maxDistSq = 0;
  stars.forEach(s => {
    const dSq = s.position.distanceToSquared(center);
    if (dSq > maxDistSq) maxDistSq = dSq;
  });
  // Add some padding to make it easier to select
  const radius = Math.sqrt(maxDistSq) + 4; 

  return {
    ...data,
    stars,
    center,
    radius
  };
};

// Generate random background stars
export const generateBackgroundStars = (count: number): Float32Array => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const ra = Math.random() * 360;
    const dec = Math.asin(2 * Math.random() - 1) * (180 / Math.PI); // Uniform distribution on sphere
    const pos = sphericalToCartesian(ra, dec, SPHERE_RADIUS * 1.5); // Slightly further out
    positions[i * 3] = pos.x;
    positions[i * 3 + 1] = pos.y;
    positions[i * 3 + 2] = pos.z;
  }
  return positions;
};
