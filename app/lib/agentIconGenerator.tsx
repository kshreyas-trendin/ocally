import React from 'react';

// Agent icon key type
export type AgentIconKey = 
  | 'listingManager'
  | 'localSeo'
  | 'socialMedia'
  | 'reviews'
  | 'webResearch'
  | 'dataAnalyst'
  | 'retention'
  | 'loyalty'
  | 'emailMarketing'
  | 'content'
  | 'upsell'
  | 'crossSell'
  | 'pricing'
  | 'bundle';

// ============================================
// REFINED FRACTAL GENERATORS
// ============================================

/**
 * Sierpiński Triangle - Recursive triangular fractal
 */
const generateSierpinskiTriangle = (depth: number, size: number = 20) => {
  const triangles: Array<{ path: string; level: number }> = [];
  
  const drawTriangle = (x: number, y: number, s: number, d: number, level: number) => {
    if (d === 0) {
      const height = (s * Math.sqrt(3)) / 2;
      const path = `M ${x} ${y - height/2} L ${x - s/2} ${y + height/2} L ${x + s/2} ${y + height/2} Z`;
      triangles.push({ path, level });
      return;
    }
    
    const newSize = s / 2;
    const height = (s * Math.sqrt(3)) / 2;
    
    drawTriangle(x, y - height / 4, newSize, d - 1, level + 1);
    drawTriangle(x - s / 4, y + height / 4, newSize, d - 1, level + 1);
    drawTriangle(x + s / 4, y + height / 4, newSize, d - 1, level + 1);
  };
  
  drawTriangle(12, 12, size, depth, 0);
  return triangles;
};

/**
 * Koch Snowflake - Refined for clarity
 */
const generateKochSnowflake = (iterations: number, size: number = 9) => {
  const kochLine = (x1: number, y1: number, x2: number, y2: number, depth: number): [number, number][] => {
    if (depth === 0) {
      return [[x1, y1], [x2, y2]];
    }
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    const p1x = x1 + dx / 3;
    const p1y = y1 + dy / 3;
    
    const p3x = x1 + (2 * dx) / 3;
    const p3y = y1 + (2 * dy) / 3;
    
    const p2x = p1x + (dx / 3) * Math.cos(Math.PI / 3) - (dy / 3) * Math.sin(Math.PI / 3);
    const p2y = p1y + (dx / 3) * Math.sin(Math.PI / 3) + (dy / 3) * Math.cos(Math.PI / 3);
    
    return [
      ...kochLine(x1, y1, p1x, p1y, depth - 1),
      ...kochLine(p1x, p1y, p2x, p2y, depth - 1),
      ...kochLine(p2x, p2y, p3x, p3y, depth - 1),
      ...kochLine(p3x, p3y, x2, y2, depth - 1),
    ];
  };
  
  const centerX = 12;
  const centerY = 12;
  const angle1 = -Math.PI / 2;
  const angle2 = angle1 + (2 * Math.PI) / 3;
  const angle3 = angle2 + (2 * Math.PI) / 3;
  
  const p1 = [centerX + size * Math.cos(angle1), centerY + size * Math.sin(angle1)];
  const p2 = [centerX + size * Math.cos(angle2), centerY + size * Math.sin(angle2)];
  const p3 = [centerX + size * Math.cos(angle3), centerY + size * Math.sin(angle3)];
  
  const points = [
    ...kochLine(p1[0], p1[1], p2[0], p2[1], iterations),
    ...kochLine(p2[0], p2[1], p3[0], p3[1], iterations),
    ...kochLine(p3[0], p3[1], p1[0], p1[1], iterations),
  ];
  
  return points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ') + ' Z';
};

/**
 * Dragon Curve - Elegant paper folding
 */
const generateDragonCurve = (iterations: number, length: number = 15) => {
  let sequence = [1];
  
  for (let i = 0; i < iterations; i++) {
    const newSeq = [...sequence, 1];
    for (let j = sequence.length - 1; j >= 0; j--) {
      newSeq.push(1 - sequence[j]);
    }
    sequence = newSeq;
  }
  
  let x = 12 - length / 3;
  let y = 12;
  let angle = 0;
  const stepLength = length / Math.pow(2, iterations / 2);
  const points: [number, number][] = [[x, y]];
  
  for (const turn of sequence) {
    angle += turn === 1 ? 90 : -90;
    x += stepLength * Math.cos((angle * Math.PI) / 180);
    y += stepLength * Math.sin((angle * Math.PI) / 180);
    points.push([x, y]);
  }
  
  return points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
};

/**
 * Hilbert Curve - Space-filling elegance
 */
const generateHilbertCurve = (order: number, size: number = 18) => {
  const points: [number, number][] = [];
  
  const hilbert = (x: number, y: number, xi: number, xj: number, yi: number, yj: number, n: number) => {
    if (n <= 0) {
      points.push([x + (xi + yi) / 2, y + (xj + yj) / 2]);
      return;
    }
    
    hilbert(x, y, yi / 2, yj / 2, xi / 2, xj / 2, n - 1);
    hilbert(x + xi / 2, y + xj / 2, xi / 2, xj / 2, yi / 2, yj / 2, n - 1);
    hilbert(x + xi / 2 + yi / 2, y + xj / 2 + yj / 2, xi / 2, xj / 2, yi / 2, yj / 2, n - 1);
    hilbert(x + xi / 2 + yi, y + xj / 2 + yj, -yi / 2, -yj / 2, -xi / 2, -xj / 2, n - 1);
  };
  
  hilbert(12 - size / 2, 12 - size / 2, size, 0, 0, size, order);
  
  return points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
};

/**
 * Lévy C Curve - Clean and elegant
 */
const generateLevyCCurve = (iterations: number, length: number = 16) => {
  const points: [number, number][] = [[12 - length / 2, 12], [12 + length / 2, 12]];
  
  for (let iter = 0; iter < iterations; iter++) {
    const newPoints: [number, number][] = [points[0]];
    
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      
      const dx = x2 - x1;
      const dy = y2 - y1;
      
      const newX = midX - dy / 2;
      const newY = midY + dx / 2;
      
      newPoints.push([newX, newY]);
      newPoints.push([x2, y2]);
    }
    
    points.length = 0;
    points.push(...newPoints);
  }
  
  return points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
};

/**
 * Vicsek Fractal - Plus sign pattern (for listing manager)
 */
const generateVicsekFractal = (depth: number, size: number = 18) => {
  const squares: Array<{ x: number; y: number; size: number; level: number }> = [];
  
  const drawVicsek = (x: number, y: number, s: number, d: number, level: number) => {
    if (d === 0) {
      squares.push({ x, y, size: s, level });
      return;
    }
    
    const newSize = s / 3;
    const positions = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]]; // Plus pattern
    
    for (const [dx, dy] of positions) {
      drawVicsek(x + dx * newSize, y + dy * newSize, newSize, d - 1, level + 1);
    }
  };
  
  drawVicsek(12, 12, size, depth, 0);
  return squares;
};

/**
 * Fibonacci Spiral - Golden ratio spiral (for retention)
 */
const generateFibonacciSpiral = () => {
  const phi = 1.618033988749;
  const points: [number, number][] = [];
  const turns = 3;
  
  for (let i = 0; i < 120; i++) {
    const theta = i * (Math.PI * 2 / phi) * turns;
    const r = Math.sqrt(i) * 0.9;
    const x = 12 + r * Math.cos(theta);
    const y = 12 + r * Math.sin(theta);
    points.push([x, y]);
  }
  
  return points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
};

/**
 * Pentaflake - Pentagon fractal (for web research)
 */
const generatePentaflake = (depth: number, size: number = 8) => {
  const pentagons: Array<{ x: number; y: number; size: number; rotation: number; level: number }> = [];
  
  const drawPentagon = (x: number, y: number, s: number, rotation: number, d: number, level: number) => {
    pentagons.push({ x, y, size: s, rotation, level });
    
    if (d === 0) return;
    
    const newSize = s * 0.382; // Golden ratio related
    for (let i = 0; i < 5; i++) {
      const angle = rotation + (i * 72 * Math.PI) / 180;
      const dist = s * 0.65;
      const newX = x + dist * Math.cos(angle);
      const newY = y + dist * Math.sin(angle);
      drawPentagon(newX, newY, newSize, rotation + 36, d - 1, level + 1);
    }
  };
  
  drawPentagon(12, 12, size, 0, depth, 0);
  return pentagons;
};

/**
 * T-Square Fractal - For upsell (ascending pattern)
 */
const generateTSquare = (depth: number, size: number = 16) => {
  const squares: Array<{ x: number; y: number; size: number; level: number }> = [];
  
  const drawTSquare = (x: number, y: number, s: number, d: number, level: number) => {
    squares.push({ x, y, size: s, level });
    
    if (d === 0 || s < 0.5) return;
    
    const newSize = s / 2;
    // Create ascending pattern
    drawTSquare(x - newSize / 2, y - s / 2 - newSize / 2, newSize, d - 1, level + 1);
    drawTSquare(x + newSize / 2, y - s / 2 - newSize / 2, newSize, d - 1, level + 1);
  };
  
  drawTSquare(12, 16, size, depth, 0);
  return squares;
};

/**
 * Cross Pattern Fractal - For cross-sell
 */
const generateCrossPattern = (depth: number) => {
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; level: number }> = [];
  
  const drawCross = (x: number, y: number, size: number, d: number, level: number) => {
    if (d === 0 || size < 0.5) return;
    
    // Horizontal line
    lines.push({ x1: x - size, y1: y, x2: x + size, y2: y, level });
    // Vertical line
    lines.push({ x1: x, y1: y - size, x2: x, y2: y + size, level });
    
    const newSize = size / 2.5;
    const offset = size * 0.7;
    
    // Four quadrants
    drawCross(x - offset, y - offset, newSize, d - 1, level + 1);
    drawCross(x + offset, y - offset, newSize, d - 1, level + 1);
    drawCross(x - offset, y + offset, newSize, d - 1, level + 1);
    drawCross(x + offset, y + offset, newSize, d - 1, level + 1);
  };
  
  drawCross(12, 12, 5, depth, 0);
  return lines;
};

/**
 * Binary Tree Fractal - For email marketing (branching distribution)
 */
const generateBinaryTree = (depth: number, length: number = 6, angle: number = 35) => {
  const branches: Array<{ x1: number; y1: number; x2: number; y2: number; level: number }> = [];
  
  const drawBranch = (x: number, y: number, len: number, ang: number, level: number) => {
    if (level === 0 || len < 0.5) return;
    
    const x2 = x + len * Math.cos((ang * Math.PI) / 180);
    const y2 = y - len * Math.sin((ang * Math.PI) / 180);
    
    branches.push({ x1: x, y1: y, x2, y2, level });
    
    // Binary branching
    drawBranch(x2, y2, len * 0.7, ang - angle, level - 1);
    drawBranch(x2, y2, len * 0.7, ang + angle, level - 1);
  };
  
  // Start from bottom center, grow upward
  drawBranch(12, 20, length, 90, depth);
  return branches;
};

/**
 * Pythagoras Tree - Elegant branching
 */
const generatePythagorasTree = (depth: number, length: number = 5, angle: number = 45) => {
  const branches: Array<{ x1: number; y1: number; x2: number; y2: number; level: number }> = [];
  
  const drawTree = (x: number, y: number, len: number, ang: number, level: number) => {
    if (level === 0 || len < 0.3) return;
    
    const x2 = x + len * Math.cos((ang * Math.PI) / 180);
    const y2 = y + len * Math.sin((ang * Math.PI) / 180);
    
    branches.push({ x1: x, y1: y, x2, y2, level });
    
    drawTree(x2, y2, len * 0.7, ang - angle, level - 1);
    drawTree(x2, y2, len * 0.7, ang + angle, level - 1);
  };
  
  drawTree(12, 19, length, -90, depth);
  return branches;
};

/**
 * Apollonian Gasket - Refined circles
 */
const generateApollonianGasket = (depth: number) => {
  const circles: Array<{ x: number; y: number; r: number; level: number }> = [];
  circles.push({ x: 12, y: 12, r: 9, level: 0 });
  
  const addCircles = (x: number, y: number, r: number, level: number) => {
    if (level >= depth || r < 0.5) return;
    
    const angles = [0, 120, 240];
    const newR = r * 0.4;
    const dist = r - newR;
    
    for (const angle of angles) {
      const rad = (angle * Math.PI) / 180;
      const newX = x + dist * Math.cos(rad);
      const newY = y + dist * Math.sin(rad);
      circles.push({ x: newX, y: newY, r: newR, level: level + 1 });
      addCircles(newX, newY, newR, level + 1);
    }
  };
  
  addCircles(12, 12, 9, 0);
  return circles;
};

/**
 * Gosper Curve - Refined hexagonal curve
 */
const generateGosperCurve = (iterations: number, length: number = 16) => {
  const axiom = 'A';
  const rules: Record<string, string> = {
    'A': 'A-B--B+A++AA+B-',
    'B': '+A-BB--B-A++A+B',
  };
  
  let sequence = axiom;
  for (let i = 0; i < iterations; i++) {
    sequence = sequence.split('').map(c => rules[c] || c).join('');
  }
  
  let x = 12;
  let y = 14;
  let angle = 0;
  const stepLength = length / Math.pow(2.6, iterations);
  const points: [number, number][] = [[x, y]];
  
  for (const char of sequence) {
    if (char === 'A' || char === 'B') {
      x += stepLength * Math.cos((angle * Math.PI) / 180);
      y += stepLength * Math.sin((angle * Math.PI) / 180);
      points.push([x, y]);
    } else if (char === '+') {
      angle += 60;
    } else if (char === '-') {
      angle -= 60;
    }
  }
  
  return points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
};

/**
 * Box Fractal - Elegant recursion
 */
const generateBoxFractal = (depth: number, size: number = 16) => {
  const boxes: Array<{ x: number; y: number; size: number; level: number }> = [];
  
  const drawBox = (x: number, y: number, s: number, level: number) => {
    if (level === 0 || s < 0.5) return;
    
    boxes.push({ x, y, size: s, level });
    
    const newSize = s / 3;
    const positions = [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0],           [1, 0],
      [-1, 1],  [0, 1],  [1, 1],
    ];
    
    for (const [dx, dy] of positions) {
      drawBox(x + dx * newSize, y + dy * newSize, newSize, level - 1);
    }
  };
  
  drawBox(12, 12, size, depth);
  return boxes;
};

/**
 * Mandelbrot-inspired circular pattern (cleaner aesthetic)
 */
const generateMandelbrotCircular = () => {
  const circles: Array<{ x: number; y: number; r: number; intensity: number }> = [];
  const rings = 6;
  
  for (let ring = 0; ring < rings; ring++) {
    const radius = (ring + 1) * 1.5;
    const count = Math.max(8, ring * 6);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const wobble = Math.sin(ring * 3 + i * 0.5) * 0.3;
      const r = radius + wobble;
      const x = 12 + r * Math.cos(angle);
      const y = 12 + r * Math.sin(angle);
      circles.push({ x, y, r: 0.4 - ring * 0.05, intensity: 1 - ring * 0.15 });
    }
  }
  
  return circles;
};

/**
 * Organic fern pattern (cleaner, more structured)
 */
const generateFernPattern = () => {
  const branches: Array<{ x1: number; y1: number; x2: number; y2: number; width: number }> = [];
  
  // Main stem
  branches.push({ x1: 12, y1: 19, x2: 12, y2: 5, width: 1.5 });
  
  // Side fronds
  const fronds = 7;
  for (let i = 0; i < fronds; i++) {
    const t = i / (fronds - 1);
    const y = 18 - t * 12;
    const length = 3 * (1 - Math.abs(t - 0.5) * 1.5);
    const angle = 50 + i * 5;
    
    // Left frond
    const x1L = 12;
    const y1L = y;
    const x2L = 12 - length * Math.cos((angle * Math.PI) / 180);
    const y2L = y - length * Math.sin((angle * Math.PI) / 180);
    branches.push({ x1: x1L, y1: y1L, x2: x2L, y2: y2L, width: 0.8 });
    
    // Right frond
    const x2R = 12 + length * Math.cos((angle * Math.PI) / 180);
    const y2R = y - length * Math.sin((angle * Math.PI) / 180);
    branches.push({ x1: x1L, y1: y1L, x2: x2R, y2: y2R, width: 0.8 });
  }
  
  return branches;
};

/**
 * Julia-inspired symmetrical pattern
 */
const generateJuliaSymmetry = () => {
  const paths: string[] = [];
  const petals = 8;
  
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    const points: [number, number][] = [];
    
    for (let t = 0; t <= 1; t += 0.05) {
      const r = 3 + 5 * t * (1 - t) * 4;
      const wobble = Math.sin(t * Math.PI * 4) * 0.5;
      const currentAngle = angle + wobble;
      const x = 12 + r * Math.cos(currentAngle) * (1 - t * 0.3);
      const y = 12 + r * Math.sin(currentAngle) * (1 - t * 0.3);
      points.push([x, y]);
    }
    
    const pathStr = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
    paths.push(pathStr);
  }
  
  return paths;
};

/**
 * Cantor-inspired layered pattern
 */
const generateCantorLayered = (depth: number, length: number = 18, spacing: number = 2) => {
  const lines: Array<{ x: number; y: number; width: number; level: number }> = [];
  
  const drawCantor = (x: number, y: number, w: number, level: number) => {
    if (level === 0 || w < 0.5) return;
    
    lines.push({ x, y, width: w, level });
    
    const newWidth = w / 3;
    const newY = y + spacing;
    
    drawCantor(x, newY, newWidth, level - 1);
    drawCantor(x + w - newWidth, newY, newWidth, level - 1);
  };
  
  drawCantor(12 - length / 2, 12 - (depth * spacing) / 2, length, depth);
  return lines;
};

// ============================================
// REFINED FRACTAL ICON COMPONENTS
// ============================================

const IconComponents: Record<AgentIconKey, React.FC<{ className?: string }>> = {
  // === ACQUIRE ===
  
  listingManager: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Vicsek Fractal - Plus sign pattern for directory listings */}
      {generateVicsekFractal(3, 18).map((sq, i) => (
        <rect
          key={i}
          x={sq.x - sq.size / 2}
          y={sq.y - sq.size / 2}
          width={sq.size}
          height={sq.size}
          stroke="currentColor"
          strokeWidth="0.7"
          fill="currentColor"
          fillOpacity={0.08 + sq.level * 0.04}
          opacity={0.6 + sq.level * 0.1}
          rx="0.5"
        />
      ))}
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.8" />
    </svg>
  ),

  localSeo: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Koch Snowflake - Sharp and clear */}
      <path
        d={generateKochSnowflake(3, 8)}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      <path
        d={generateKochSnowflake(2, 5)}
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.15"
        opacity="0.7"
      />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.7" />
    </svg>
  ),

  socialMedia: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Apollonian Gasket - Network elegance */}
      {generateApollonianGasket(3).map((circle, i) => (
        <circle
          key={i}
          cx={circle.x}
          cy={circle.y}
          r={circle.r}
          stroke="currentColor"
          strokeWidth={circle.level === 0 ? "1.5" : "0.8"}
          fill={circle.level === 0 ? "none" : "currentColor"}
          fillOpacity={circle.level === 0 ? 0 : 0.1}
          opacity={0.5 + (3 - circle.level) * 0.15}
        />
      ))}
    </svg>
  ),

  reviews: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Sierpiński Triangle - Star pattern */}
      {generateSierpinskiTriangle(4, 17).map((tri, i) => (
        <path
          key={i}
          d={tri.path}
          stroke="currentColor"
          strokeWidth="0.6"
          fill="currentColor"
          fillOpacity={0.08 + tri.level * 0.03}
          opacity={0.5 + tri.level * 0.08}
        />
      ))}
    </svg>
  ),

  webResearch: ({ className }) => {
    const createPentagonPath = (x: number, y: number, size: number, rotation: number) => {
      const points: [number, number][] = [];
      for (let i = 0; i < 5; i++) {
        const angle = rotation + (i * 72 * Math.PI) / 180;
        points.push([
          x + size * Math.cos(angle),
          y + size * Math.sin(angle)
        ]);
      }
      return points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ') + ' Z';
    };

    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        {/* Pentaflake - Pentagon fractal for exploration */}
        {generatePentaflake(2, 8).map((pent, i) => (
          <path
            key={i}
            d={createPentagonPath(pent.x, pent.y, pent.size, pent.rotation)}
            stroke="currentColor"
            strokeWidth={pent.level === 0 ? "1.5" : "0.8"}
            fill="currentColor"
            fillOpacity={pent.level === 0 ? 0.05 : 0.12}
            opacity={0.5 + (2 - pent.level) * 0.15}
          />
        ))}
        <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.7" />
    </svg>
    );
  },

  dataAnalyst: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Mandelbrot-inspired circular pattern */}
      {generateMandelbrotCircular().map((circle, i) => (
        <circle
          key={i}
          cx={circle.x}
          cy={circle.y}
          r={circle.r}
          fill="currentColor"
          opacity={circle.intensity * 0.6}
        />
      ))}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" opacity="1" />
    </svg>
  ),
  
  // === LOYALTY ===

  retention: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Fibonacci Spiral - Golden ratio returning pattern */}
      <path
        d={generateFibonacciSpiral()}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={generateFibonacciSpiral()}
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        opacity="0.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'blur(1.5px)' }}
      />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
    </svg>
  ),

  loyalty: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Pythagoras Tree - Growth elegance */}
      {generatePythagorasTree(8, 4.5, 32).map((branch, i) => (
        <line
          key={i}
          x1={branch.x1}
          y1={branch.y1}
          x2={branch.x2}
          y2={branch.y2}
          stroke="currentColor"
          strokeWidth={Math.max(0.5, branch.level * 0.25)}
          opacity={0.4 + branch.level * 0.08}
          strokeLinecap="round"
        />
      ))}
    </svg>
  ),

  emailMarketing: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Binary Tree - Branching email distribution */}
      {generateBinaryTree(7, 6, 35).map((branch, i) => (
        <line
          key={i}
          x1={branch.x1}
          y1={branch.y1}
          x2={branch.x2}
          y2={branch.y2}
          stroke="currentColor"
          strokeWidth={Math.max(0.6, (8 - branch.level) * 0.2)}
          opacity={0.4 + branch.level * 0.08}
          strokeLinecap="round"
        />
      ))}
    </svg>
  ),

  content: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Fern Pattern - Organic growth */}
      {generateFernPattern().map((branch, i) => (
        <line
          key={i}
          x1={branch.x1}
          y1={branch.y1}
          x2={branch.x2}
          y2={branch.y2}
          stroke="currentColor"
          strokeWidth={branch.width}
          opacity={i === 0 ? 0.8 : 0.6}
          strokeLinecap="round"
        />
      ))}
    </svg>
  ),
  
  // === REVENUE ===

  upsell: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* T-Square Fractal - Ascending value */}
      {generateTSquare(4, 15).map((sq, i) => (
        <rect
          key={i}
          x={sq.x - sq.size / 2}
          y={sq.y - sq.size / 2}
          width={sq.size}
          height={sq.size}
          stroke="currentColor"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity={0.08 + sq.level * 0.04}
          opacity={0.5 + sq.level * 0.1}
          rx="1"
        />
      ))}
    </svg>
  ),

  crossSell: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Cross Pattern Fractal - Intersecting opportunities */}
      {generateCrossPattern(3).map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="currentColor"
          strokeWidth={Math.max(0.6, (4 - line.level) * 0.35)}
          opacity={0.45 + line.level * 0.12}
          strokeLinecap="round"
        />
      ))}
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.7" />
    </svg>
  ),

  pricing: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Julia-inspired symmetry */}
      {generateJuliaSymmetry().map((path, i) => (
        <path
          key={i}
          d={path}
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />
      ))}
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  ),

  bundle: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Cantor Set - Hierarchical elegance */}
      {generateCantorLayered(5, 18, 2.2).map((line, i) => (
        <rect
          key={i}
          x={line.x}
          y={line.y - 0.7}
          width={line.width}
          height="1.4"
          fill="currentColor"
          opacity={0.5 + line.level * 0.08}
          rx="0.5"
        />
      ))}
    </svg>
  ),
};

/**
 * Gets the refined fractal icon component for a given agent key.
 */
export function getAgentIcon(iconKey: AgentIconKey): React.FC<{ className?: string }> {
  return IconComponents[iconKey];
}
