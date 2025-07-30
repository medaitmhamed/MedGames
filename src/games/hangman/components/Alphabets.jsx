const Alphabets = ({guessedLetters, handleClick}) => {
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const getLetter = (letter) => {
    handleClick(letter)
  };

  return (
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
  );
};

export default Alphabets;
