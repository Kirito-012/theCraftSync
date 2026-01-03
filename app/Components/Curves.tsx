'use client';

import React from 'react';
import CurvedLoop from './CurvedLoop';

const CurvesDemo: React.FC = () => {
  return (
    <div className="w-full bg-black">


      {/* With custom props */}
      <div>
  
        <CurvedLoop 
          marqueeText="Crafting ✦ Dreams ✦ Syncing ✦ Reality ✦ Innovate ✦ Create ✦ Design ✦ Build ✦ Inspire ✦"
          speed={3}
          curveAmount={500}
          direction="right"
          interactive={true}
          className="custom-text-style"
        />
      </div>
    </div>
  );
};

export default CurvesDemo;