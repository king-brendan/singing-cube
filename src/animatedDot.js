import { motion } from "framer-motion";
import React from "react";
import {
  INITIAL_CUBE_SIZE,
  INITIAL_CUBE_RADIUS,
  INITIAL_YELLOW,
  FINAL_YELLOW,
} from "./constants.js";

function AnimatedDot(props) {
  return (
    <div>
      <motion.div
        style={{
          height: `${INITIAL_CUBE_SIZE}px`,
          width: `${INITIAL_CUBE_SIZE}px`,
        }}
        initial={{
          borderRadius: `${INITIAL_CUBE_RADIUS}px`,
          background: "#4a4a4a",
        }}
        animate={{
          borderRadius: `${props.finalRadius}px`,
          background: props.initialColor, // `linear-gradient(90deg,${props.initialColor} 0%,${props.finalColor} 75%)`,
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          //   repeat: Infinity,
          //   repeatType: "reverse",
          //   repeatDelay: 1,
          duration: 0.5,
        }}
      />
    </div>
  );
}

export default AnimatedDot;
