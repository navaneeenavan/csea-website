"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const size = isClicked ? "h-3.5 w-3.5" : "h-4 w-4";
  const offset = isClicked ? 6 : 8; // Adjust offset based on size

  return (
    <motion.div
      className={`fixed rounded-full ${size} bg-white z-50`}
      style={{ top: position.y, left: position.x }} // Set initial position
      animate={{ top: position.y - offset, left: position.x - offset }} // Animate changes
      transition={{ duration: 0.1 }} // Use spring transition for smooth animation
    />
  );
}
