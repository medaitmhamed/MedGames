import { useState } from "react";
import { motion } from "motion/react";
import "./App.css";

function App() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <motion.h1
        initial={{ x: "-100%" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="w-fit text-3xl font-bold text-primary font-[knewave] mt-10 uppercase"
      >
        hangman
      </motion.h1>
    </div>
  );
}

export default App;
