import React, { useState } from 'react';
import { SVGCanvas } from './SVGCanvas';

interface KiteDesignerProps {
  initialDesign?: KiteDesign;
}

export const KiteDesigner = ({ initialDesign }: KiteDesignerProps) => {
  const [design, setDesign] = useState(initialDesign || {
    shape: 'diamond',
    materials: [],
    dimensions: { width: 100, height: 120 },
    colors: {}
  });

  return (
    <div className="design-container">
      <SVGCanvas design={design} />
    </div>
  );
};