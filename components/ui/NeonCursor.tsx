"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function NeonCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trailControls = useAnimation();
  const glowControls = useAnimation();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.matches("a, button, input, textarea, select, [data-hover='true']")) {
        setIsHovering(true);
        void trailControls.start({
          scale: 1.5,
          borderColor: "rgb(255, 150, 50)",
          borderWidth: "3px",
        });
        void glowControls.start({
          scale: 2,
          opacity: 0.8,
        });
      }
    },
    [trailControls, glowControls],
  );

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
    void trailControls.start({
      scale: 1,
      borderColor: "rgb(236, 101, 23)",
      borderWidth: "2px",
    });
    void glowControls.start({
      scale: 1,
      opacity: 0.4,
    });
  }, [trailControls, glowControls]);

  useEffect(() => {
    // Don’t show on touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      <motion.div
        className="absolute h-3.5 w-3.5 rounded-full bg-brand-orange"
        animate={{
          x: pos.x - 7,
          y: pos.y - 7,
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 420, mass: 0.45 }}
      />

      <motion.div
        className="absolute h-10 w-10 rounded-full border-2"
        animate={trailControls}
        initial={{ borderColor: "rgb(236, 101, 23)", borderWidth: "2px" }}
        style={{ x: pos.x - 20, y: pos.y - 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.8 }}
      />

      <motion.div
        className="absolute h-16 w-16 rounded-full"
        animate={glowControls}
        initial={{ opacity: 0.4 }}
        style={{
          x: pos.x - 32,
          y: pos.y - 32,
          background:
            "radial-gradient(circle, rgba(255,166,43,0.35) 0%, rgba(249,115,22,0.0) 65%)",
          filter: "blur(2px)",
        }}
        transition={{ type: "spring", damping: 40, stiffness: 150, mass: 1 }}
      />
    </div>
  );
}

