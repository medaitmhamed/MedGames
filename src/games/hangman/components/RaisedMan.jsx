import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import popSoundFile from "../../../assets/sounds/balloon-pop.mp3";
import screamSoundFile from "../../../assets/sounds/man-final-scream.mp3";

const RaisedMan = ({ balloonCount = 5, wrongGuesses = 0 }) => {
  const isFirstRender = useRef(true); // track first render
  const [balloons, setBalloons] = useState([]);

  const popSoundRef = useRef(new Audio(popSoundFile));
  const screamSoundRef = useRef(new Audio(screamSoundFile));

  const playPopSound = () => {
    popSoundRef.current.currentTime = 0;
    popSoundRef.current.play().catch(() => {});
  };

  const playScreamSound = () => {
    screamSoundRef.current.currentTime = 0;
    screamSoundRef.current.play().catch(() => {});
  };

  useEffect(() => {
    // Generate balloons based on the balloonCount prop
    const newBalloons = Array.from({ length: balloonCount }, (_, i) => ({
      color: `hsl(${(i * 360) / balloonCount}, 70%, 60%)`,
      size: 1 + (i % 3) * 0.2, // Adjust size for variety
      popping: false,
    }));
    setBalloons(newBalloons);
  }, [balloonCount]);

  const removeBalloons = () => {
    setBalloons((prev) => {
      const lastIndex = prev.length - 1;
      const updated = [...prev];
      updated[lastIndex] = { ...updated[lastIndex], popping: true };
      playPopSound();
      return updated;
    });

    // Remove after animation delay (e.g. 500ms)
    setTimeout(() => {
      setBalloons((prev) => prev.slice(0, -1));
    }, 100); // match your animation duration
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // skip the first run
      return;
    }
    removeBalloons();
    if (balloonCount <= wrongGuesses) {
      playScreamSound();
    }
  }, [wrongGuesses, wrongGuesses]);
  return (
    <div
      id="raised-man-container"
      className="relative w-full h-[400px] overflow-hidden bg-gradient-to-b from-blue-200 to-blue-50 rounded-lg"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-8 left-2 md:left-12 w-24 h-6 bg-white rounded-full opacity-70"
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          {" "}
          <div className="absolute -top-4 left-1/2 w-8 h-8 -translate-x-1/2 bg-white rounded-full"></div>
          <div className="absolute -top-2 left-2 w-8 h-8 bg-white rounded-full"></div>
          <div className="absolute -top-2 left-11/20 w-8 h-8 bg-white rounded-full"></div>
        </motion.div>
        <motion.div
          className="relative top-5 md:top-12 left-44 md:left-[420px] w-20 h-6 bg-white rounded-full opacity-60"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-4 left-1/2 w-7 h-7 -translate-x-1/2 bg-white rounded-full"></div>
          <div className="absolute -top-2 left-2 w-7 h-7 bg-white rounded-full"></div>
          <div className="absolute -top-2 left-11/20 w-7 h-7 bg-white rounded-full"></div>
        </motion.div>
        <motion.div
          className="absolute top-16 right-5 md:right-20 w-12 h-6 bg-white rounded-full opacity-60"
          animate={{ x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -top-2 left-1/2 w-4 h-4 -translate-x-1/2 bg-white rounded-full"></div>
          <div className="absolute -top-0.5 left-1 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute -top-0.5 left-7 w-4 h-4 bg-white rounded-full"></div>
        </motion.div>
        <motion.div
          className="absolute top-24 left-15 md:left-1/3 w-24 h-8 bg-white rounded-full opacity-50"
          animate={{ x: [0, 25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -top-4 left-1/2 w-8 h-8 -translate-x-1/2 bg-white rounded-full"></div>
          <div className="absolute -top-2 left-2 w-8 h-8 bg-white rounded-full"></div>
          <div className="absolute -top-2 left-11/20 w-8 h-8 bg-white rounded-full"></div>
        </motion.div>

        {/* Wind effect particles */}
        <div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            />
          ))}
        </div>
      </div>
      {/* Main floating container */}
      <motion.div
        className="absolute left-1/2 top-5 h-fit transform -translate-x-1/2"
        
         initial={{ opacity: 1 }}
        animate={
          balloonCount <= wrongGuesses
            ? {
                y: 300,
                opacity: 0,
                transition: {
                  duration: 1.5,
                  ease: "easeIn",
                },
              }
            : {
                y: [0, -8, 0],
                x: [0, 4, 0],
                rotate: [0, 2, 0],
                opacity: 1, // 👈 Add this!
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
      >
        <svg width="300" height="280" viewBox="0 0 300 250">
          {/* Balloons */}
          {balloons.map((balloon, index) => {
            // const totalBalloons = balloons.length;
            const angle = (index * 360) / balloonCount - 90; // Start from top
            const radius = 45;
            const balloonX = 120 + Math.cos((angle * Math.PI) / 180) * radius;
            const balloonY =
              50 + Math.sin((angle * Math.PI) / 180) * radius * 0.6;
            const balloonSize = 23 * balloon.size;

            // Left hand position
            const leftHandX = 115;
            const leftHandY = 130; // Moved to body level

            // Calculate string path for wavy effect
            const midX = (balloonX + leftHandX) / 2 + Math.sin(index) * 8;
            const midY = (balloonY + balloonSize + leftHandY) / 2;
            return (
              <g key={index}>
                {/* Balloon string - wavy path to left hand */}
                <motion.path
                  d={`M ${balloonX} ${balloonY + balloonSize}
         Q ${midX - 4} ${midY} ${leftHandX} ${leftHandY}
         Q ${leftHandX - 7 + 4 * index} ${leftHandY + 10}
           ${leftHandX - 5 + index * 4} ${leftHandY + 15 + 3 * index}`}
                  stroke="#0008"
                  strokeWidth="1.5"
                  fill="none"
                  opacity={0.8}
                />

                {/* Balloon */}
                <motion.g
                  animate={{
                    x: [0, Math.sin(index) * 3, 0],
                    y: [0, -2, 0],
                    rotate: [0, Math.sin(index) * 1, 0],
                    scale: balloon.popping ? 0 : 1,
                    opacity: balloon.popping ? 0 : 1,
                  }}
                  transition={{
                    x: {
                      duration: 4 + index * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    },
                    y: {
                      duration: 4 + index * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    },
                    rotate: {
                      duration: 4 + index * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    },
                    scale: { duration: 0.4 },
                    opacity: { duration: 0.4 },
                  }}
                >
                  {/* Balloon shadow */}
                  <ellipse
                    cx={balloonX + 2}
                    cy={balloonY + 2}
                    rx={balloonSize * 0.7}
                    ry={balloonSize}
                    fill="rgba(0,0,0,0.1)"
                  />

                  {/* Main balloon */}
                  <ellipse
                    cx={balloonX}
                    cy={balloonY}
                    rx={balloonSize * 0.7}
                    ry={balloonSize}
                    fill={balloon.color}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                  />

                  {/* Balloon highlight */}
                  <defs>
                    <filter
                      id="blurredEdge"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
                    </filter>
                  </defs>

                  <ellipse
                    cx={balloonX - balloonSize * 0.25}
                    cy={balloonY - balloonSize * 0.35}
                    rx={balloonSize * 0.2}
                    ry={balloonSize * 0.3}
                    fill="rgba(255,255,255,0.5)"
                    filter="url(#blurredEdge)"
                  />

                  {/* Balloon tie */}
                  <polygon
                    points={`${balloonX - 2},${balloonY + balloonSize} ${
                      balloonX + 2
                    },${balloonY + balloonSize} ${balloonX},${
                      balloonY + balloonSize + 6
                    }`}
                    fill={balloon.color}
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="1"
                  />
                </motion.g>
              </g>
            );
          })}

          {/* Man figure */}
          <motion.g
            animate={{
              rotate: [0, 1, -1, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Body */}
            <ellipse
              cx="150"
              cy="160"
              rx="14"
              ry="20"
              fill="#FF6B6B"
              stroke="#E85A5A"
              strokeWidth="2"
            />

            {/* Head */}
            <circle
              cx="150"
              cy="130"
              r="15"
              fill="#FFDBAC"
              stroke="#E6C09A"
              strokeWidth="2"
            />

            {/* Hair  Q 160 120 150 118 Q 140 120 135 125 */}
            <path
              d="M 136 123 Q 150 98 145 118 Q 158 100 149 118 Q 165 100 155 120 Q 172 100 163 123 Q 150 118 136 123"
              fill="#8B4513"
            />
            <path
              d="M 136 123 Q 135 100 142 118 Q 152 100 153 118 Q 166 100 160 118 Q 150 117 136 123 "
              fill="#8B4513"
            />

            {/* Eyes */}
            <circle cx="145" cy="128" r="2" fill="#000" />
            <circle cx="155" cy="128" r="2" fill="#000" />
            <circle cx="145.5" cy="127.5" r="0.5" fill="#fff" />
            <circle cx="155.5" cy="127.5" r="0.5" fill="#fff" />

            {/* Smile */}
            {/* <path
              d="M 145 135 Q 150 140 155 135"
              stroke="#000"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            /> */}
            <ellipse cx="150" cy="136" rx="7" ry="1" fill="#000" />

            {/* Arms reaching up */}
            <motion.line
              x1="138"
              y1="150"
              x2="115"
              y2="130"
              stroke="#FFDBAC"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <motion.line
              x1="162"
              y1="150"
              x2="175"
              y2="130"
              stroke="#FFDBAC"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{
                attr: {
                  x2: [175, 180, 175],
                  y2: [130, 125, 130],
                },
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* Hands */}
            <circle cx="115" cy="130" r="4" fill="#FFDBAC" />
            <circle cx="175" cy="130" r="4" fill="#FFDBAC" />

            {/* Legs */}
            <motion.line
              x1="145"
              y1="180"
              x2="142"
              y2="200"
              stroke="#4A90E2"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <motion.line
              x1="155"
              y1="180"
              x2="157"
              y2="200"
              stroke="#4A90E2"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Feet */}
            <ellipse cx="138" cy="202" rx="6" ry="3" fill="#8B4513" />
            <ellipse cx="160" cy="202" rx="6" ry="3" fill="#8B4513" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};

export default RaisedMan;
