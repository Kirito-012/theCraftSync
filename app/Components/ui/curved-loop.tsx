"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CurvedLoopProps {
  marqueeText: string;
  speed?: number;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  className?: string;
}

export default function CurvedLoop({
  marqueeText,
  speed = 2,
  curveAmount = 400,
  direction = "left",
  interactive = false,
  className = "",
}: CurvedLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const repeatText = `${marqueeText} • `.repeat(10);
  const duration = 20 / speed;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent py-8"
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="curve"
            d={`M 0,${100 - curveAmount / 100} Q 600,${
              100 + curveAmount / 100
            } 1200,${100 - curveAmount / 100}`}
            fill="none"
          />
        </defs>
        <text
          className={`text-lg font-bold fill-black dark:fill-white ${className}`}
          fontSize="24"
        >
          <textPath
            href="#curve"
            startOffset={direction === "right" ? "100%" : "0%"}
            textAnchor={direction === "right" ? "end" : "start"}
          >
            <motion.tspan
              animate={{
                offsetDistance: direction === "right" ? "0%" : "100%",
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {repeatText}
            </motion.tspan>
          </textPath>
        </text>
      </svg>

      {/* Fallback text for accessibility */}
      <div className="sr-only">{marqueeText}</div>
    </div>
  );
}