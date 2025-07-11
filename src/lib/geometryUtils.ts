// Utility functions for geometry calculations related to parking lot layout

export interface Point {
  x: number;
  y: number;
}

export interface Polygon {
  points: Point[];
}

/**
 * Check if a point is inside a polygon using ray-casting algorithm
 * @param point The point to check
 * @param polygon The polygon to check against
 * @returns boolean indicating if point is inside polygon
 */
export function isPointInPolygon(point: Point, polygon: Polygon): boolean {
  const { x, y } = point;
  let inside = false;
  const points = polygon.points;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x,
      yi = points[i].y;
    const xj = points[j].x,
      yj = points[j].y;

    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Calculate distance between two points
 * @param p1 First point
 * @param p2 Second point
 * @returns distance
 */
export function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

/**
 * Rotate a point around origin (0,0) by angle degrees
 * @param point Point to rotate
 * @param angle Angle in degrees
 * @returns rotated point
 */
export function rotatePoint(point: Point, angle: number): Point {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
  };
}
