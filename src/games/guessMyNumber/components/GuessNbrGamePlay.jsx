import { AnimatePresence, motion } from "motion/react";
import React, { useRef, useState } from "react";
import duplicateSound from "../../../assets/sounds/guessMyNumber/duplicateNbr.mp3";
import { Menu } from "lucide-react";

const GuessNbrGamePlay = () => {
  const [numberToGuess, setNumberToGuess] = useState(() => {
    const availableDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];

    // First digit can't be 0
    const firstDigit =
      availableDigits[Math.floor(Math.random() * availableDigits.length)];
    result.push(firstDigit);
    availableDigits.splice(availableDigits.indexOf(firstDigit), 1);
    availableDigits.push(0); // Now 0 can be used for other positions

    // Pick remaining 5 digits
    for (let i = 1; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * availableDigits.length);
      result.push(availableDigits[randomIndex]);
      availableDigits.splice(randomIndex, 1);
    }

    return parseInt(result.join(""));
  });
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing"); // playing, won, lost
  const [digitCount, setDigitCount] = useState(6);
  const [maxAttempts, setMaxAttempts] = useState(5);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(Array(6).fill(""));
  const [duplicateDigits, setDuplicateDigits] = useState([]);
  const inputRefs = useRef([]);
  const duplicateSoundRef = useRef(new Audio(duplicateSound));

  const checkGuess = () => {
    if (currentGuess.some((digit) => digit === "")) {
      return;
    }

    // Check for duplicate digits in the guess
    const uniqueDigits = new Set(currentGuess);
    if (uniqueDigits.size !== currentGuess.length) {
      // setDuplicateDigits([]);
      for (let i = 0; i < currentGuess.length; i++) {
        for (let j = i + 1; j < currentGuess.length; j++) {
          if (currentGuess[i] === currentGuess[j] && currentGuess[i] !== "") {
            setDuplicateDigits((prev) => [...prev, i, j]);
          }
        }
      }
      duplicateSoundRef.current.play();
      return;
    }

    const guessStr = currentGuess.join("");
    const targetStr = numberToGuess.toString().padStart(digitCount, "0");

    // Check if guess is correct
    if (guessStr === targetStr) {
      setGameStatus("won");
    }

    // Create attempt record with status for each digit
    const attemptData = currentGuess.map((digit, index) => ({
      digit,
      status: getDigitStatus(digit, index, numberToGuess),
    }));

    setAttempts((prev) => [...prev, attemptData]);
    setCurrentAttempt((prev) => prev + 1);

    // Check if game is lost
    if (currentAttempt + 1 >= maxAttempts && guessStr !== targetStr) {
      setGameStatus("lost");
    }

    // Reset current guess for next attempt
    if (guessStr !== targetStr && currentAttempt + 1 < maxAttempts) {
      setCurrentGuess(Array(digitCount).fill(""));
      // Focus first input for next attempt
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  };

  const generateDistinctNumber = (digits) => {
    const availableDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];

    // First digit can't be 0 for numbers with leading digits
    const firstDigitChoices = availableDigits.filter((d) => d !== 0);
    const firstDigit =
      firstDigitChoices[Math.floor(Math.random() * firstDigitChoices.length)];
    result.push(firstDigit);
    availableDigits.splice(availableDigits.indexOf(firstDigit), 1);

    // Pick remaining digits
    for (let i = 1; i < digits; i++) {
      const randomIndex = Math.floor(Math.random() * availableDigits.length);
      result.push(availableDigits[randomIndex]);
      availableDigits.splice(randomIndex, 1);
    }

    return parseInt(result.join(""));
  };

  const handleChange = (value, index) => {
    if (duplicateDigits.includes(index)) {
      setDuplicateDigits([]);
    }
    // Only allow single digits
    if (value.length > 1) return;
    if (value !== "" && !/^\d$/.test(value)) return;

    setCurrentGuess((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });

    // Auto-focus next input
    if (value !== "" && index < digitCount - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && currentGuess[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Handle Enter to check guess
    if (e.key === "Enter") {
      checkGuess();
    }
  };

  const getDigitStatus = (digit, position, targetNumber) => {
    const targetStr = targetNumber.toString().padStart(digitCount, "0");
    const targetDigit = targetStr[position];

    if (digit === targetDigit) return "correct";
    if (targetStr.includes(digit)) return "misplaced";
    return "wrong";
  };

  const getColor = (status) => {
    if (status === "correct")
      return "from-green-600 via-green-400 to-green-500";
    if (status === "misplaced")
      return "from-yellow-600 via-yellow-300 to-yellow-600";
    if (status === "wrong") return "from-red-700 via-red-400 to-red-700";
    return "from-gray-400 via-gray-300 to-gray-400";
  };
  const resetGame = () => {
    // Generate new random number with distinct digits
    const newNumber = generateDistinctNumber(digitCount);

    setNumberToGuess(newNumber);
    setCurrentAttempt(0);
    setAttempts([]);
    setCurrentGuess(Array(digitCount).fill(""));
    setGameStatus("playing");

    // Focus first input
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };
  return (
    <div
      className="w-full flex flex-col items-center gap-[7vw] text-white
    md:flex-row md:items-start"
    >
      <div className="hidden md:block max-w-sm bg-gray-800 rounded-lg text-sm overflow-hidden">
        <p className="p-4 text-gray-200">
          <h4 className="font-semibold mb-2">Rules & Color Legend:</h4>
          <div className="mb-3 p-2 bg-yellow-900 rounded text-yellow-200">
            <strong>Important:</strong> All digits in the target number are
            unique - no repeated digits!
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-4 border-green-500 "></div>
              <span>Correct position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-4 border-yellow-600 "></div>
              <span>Wrong position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-4 border-red-700 "></div>
              <span>Not in number</span>
            </div>
          </div>
        </p>
      </div>
      <div className="w-full max-w-md h-fit">
        <div className="w-full h-fit">
          <div className="md:hidden w-full flex gap-x-2 mb-2">
            <button
              type="button"
              onClick={() => setIsRulesOpen((prv) => !prv)}
              className="basis-1/2 border rounded"
            >
              Rules
            </button>
            <button type="button" className="basis-1/2 border rounded">
              Menu
            </button>
          </div>
          {/* Legend */}
          <AnimatePresence>
            {isRulesOpen && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                className="bg-gray-800 rounded-lg text-sm overflow-hidden"
              >
                <p className="p-4 text-gray-200">
                  <h4 className="font-semibold mb-2">Rules & Color Legend:</h4>
                  <div className="mb-3 p-2 bg-yellow-900 rounded text-yellow-200">
                    <strong>Important:</strong> All digits in the target number
                    are unique - no repeated digits!
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full border-4 border-green-500 "></div>
                      <span>Correct position</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full border-4 border-yellow-600 "></div>
                      <span>Wrong position</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full border-4 border-red-700 "></div>
                      <span>Not in number</span>
                    </div>
                  </div>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full px-2 flex flex-col items-center">
          {attempts.map((attempt, rowIndex) => (
            <div
              key={rowIndex}
              className="w-full h-fit max-w-md flex gap-x-2 my-4 "
            >
              {attempt.map((digitData, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-1/6 aspect-square p-1 xs:p-2 border rounded-full flex items-center justify-center bg-gradient-to-r ${getColor(
                    digitData.status
                  )}
                `}
                >
                  <div
                    className="w-full h-full bg-gray-800 border rounded-full flex items-center justify-center text-white font-bold text-md 
              md:text-lg"
                  >
                    {digitData.digit}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Current attempt input */}
          {gameStatus === "playing" && currentAttempt < maxAttempts && (
            <div className="w-full flex flex-col items-center justify-center gap-4 my-4">
              <div className="w-full h-fit max-w-md  flex gap-x-2 items-center">
                {Array.from({ length: digitCount }, (_, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${
                      duplicateDigits.includes(colIndex) ? "border-red-500" : ""
                    } w-1/6 aspect-square p-1 xs:p-1.5 sm:p-2 border-2 focus-within:border-blue-500 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400`}
                  >
                    <input
                      ref={(el) => (inputRefs.current[colIndex] = el)}
                      type="text"
                      inputMode="numeric"
                      value={currentGuess[colIndex]}
                      onChange={(e) => handleChange(e.target.value, colIndex)}
                      onKeyDown={(e) => handleKeyDown(e, colIndex)}
                      className="w-full h-full bg-gray-800 border rounded-full text-center outline-none text-white font-bold text-lg"
                      maxLength="1"
                      disabled={gameStatus !== "playing"}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={checkGuess}
                disabled={currentGuess.some((digit) => digit === "")}
                className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                Check
              </button>
            </div>
          )}
        </div>
        {/* Game status messages */}
        {gameStatus === "won" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              🎉 Congratulations!
            </h2>
            <p className="text-gray-300 mb-4">
              You guessed the number {numberToGuess} in {currentAttempt}{" "}
              attempts!
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}

        {gameStatus === "lost" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-2">
              😔 Game Over
            </h2>
            <p className="text-gray-300 mb-4">The number was {numberToGuess}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuessNbrGamePlay;
