import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const AnimatedMouth = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Animate from smile to scream
    controls.start({
      d: [
        "M 145 135 Q 150 140 155 135", // smile
        "M 145 135 Q 150 150 155 135", // open mouth
        "M 145 135 Q 150 160 155 135", // wider scream
        "M 145 135 Q 150 140 155 135", // back to smile
      ],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    });
  }, [controls]);

  return (
    <svg viewBox="0 0 300 250" width="300" height="250">
      <motion.path
        d="M 145 135 Q 150 140 155 135"
        stroke="#000"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        animate={controls}
      />
    </svg>
  );
};

export default AnimatedMouth;
