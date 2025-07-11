// Simple DXF export utility for parking lot layout rectangles

import { Point } from "./geometryUtils";

export interface Rectangle {
  bottomLeft: Point;
  width: number;
  length: number;
  angle: number; // rotation angle in degrees
}

/**
 * Generate DXF content for a list of rectangles representing parking slots
 * @param rectangles Array of rectangles
 * @returns DXF file content as string
 */
export function generateDXF(rectangles: Rectangle[]): string {
  const header = `0
SECTION
2
HEADER
0
ENDSEC
0
SECTION
2
TABLES
0
ENDSEC
0
SECTION
2
BLOCKS
0
ENDSEC
0
SECTION
2
ENTITIES
`;

  const footer = `0
ENDSEC
0
EOF
`;

  let entities = "";

  rectangles.forEach((rect) => {
    // Calculate the four corners of the rectangle with rotation
    const rad = (rect.angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const bl = rect.bottomLeft;
    const br = {
      x: bl.x + rect.width * cos,
      y: bl.y + rect.width * sin,
    };
    const tr = {
      x: br.x - rect.length * sin,
      y: br.y + rect.length * cos,
    };
    const tl = {
      x: bl.x - rect.length * sin,
      y: bl.y + rect.length * cos,
    };

    // DXF POLYLINE for rectangle
    entities += `0
POLYLINE
8
ParkingSlots
66
1
70
1
0
VERTEX
8
ParkingSlots
10
${bl.x.toFixed(3)}
20
${bl.y.toFixed(3)}
30
0.0
0
VERTEX
8
ParkingSlots
10
${br.x.toFixed(3)}
20
${br.y.toFixed(3)}
30
0.0
0
VERTEX
8
ParkingSlots
10
${tr.x.toFixed(3)}
20
${tr.y.toFixed(3)}
30
0.0
0
VERTEX
8
ParkingSlots
10
${tl.x.toFixed(3)}
20
${tl.y.toFixed(3)}
30
0.0
0
SEQEND
`;
  });

  return header + entities + footer;
}
