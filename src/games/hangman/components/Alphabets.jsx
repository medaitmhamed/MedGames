import { useEffect } from "react";

const Alphabets = ({ guessedLetters, getLetter }) => {
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

 

  // Handle key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase();

      // If key is A-Z and not guessed
      if (/^[A-Z]$/.test(key) && !guessedLetters.includes(key)) {
        getLetter(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [guessedLetters, getLetter]); // Make sure the latest guessedLetters are tracked

  return (
    <>
      <div className="grid grid-cols-7 gap-4">
        {letters.map((letter, i) => {
          const isGuessed = guessedLetters.includes(letter);
          return (
            <div
              key={i}
              onClick={() => !isGuessed && getLetter(letter)}
              className={`flex items-center justify-center p-2 border border-gray-300 rounded-sm shadow-white ${
                isGuessed
                  ? "opacity-20 cursor-not-allowed"
                  : "cursor-pointer hover:border-gray-50 hover:text-gray-50 hover:shadow-sm text-shadow-gray-200 hover:text-shadow-xs"
              }`}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <p className="hidden lg:block text-sm text-gray-400 my-3 font-sans font-semibold">
        💡 <span className="italic">Tip :</span> You can also use your keyboard
        to guess letters!
      </p>
    </>
  );
};

export default Alphabets;