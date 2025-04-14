import React, { FC, useCallback, useState } from 'react';

type Point = {
  x: number;
  y: number;
};

export interface KiteDesign {
  shape: string;
  materials: string[];
  dimensions: { width: number; height: number };
  colors: Record<string, string>;
}

interface SVGCanvasProps {
  design: KiteDesign;
}

export const SVGCanvas: FC<SVGCanvasProps> = ({ design }) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPoints([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setIsDrawing(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPoints(prev => [...prev, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }]);
  }, [isDrawing]);

  return (
    <svg
      width={design.dimensions.width}
      height={design.dimensions.height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDrawing(false)}
      style={{ border: '1px solid #ccc' }}
    >
      {/* 基础菱形框架 */}
      <path
        d={`M ${design.dimensions.width/2} 0 L ${design.dimensions.width} ${design.dimensions.height/2} L ${design.dimensions.width/2} ${design.dimensions.height} L 0 ${design.dimensions.height/2} Z`}
        fill="none"
        stroke="#666"
      />
      {/* 绘制用户拖拽路径 */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill="red" />
      ))}
    </svg>
  );
};