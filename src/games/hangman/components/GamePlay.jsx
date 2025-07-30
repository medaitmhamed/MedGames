import { useEffect, useRef, useState } from "react";
import RaisedMan from "./RaisedMan";
import Alphabets from "./Alphabets";
import GameOver from "./GameOver";

const GamePlay = ({ mode }) => {
  const [lives, setLives] = useState(3);
  const [subject, setSubject] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const wordToGuess = useRef("");

  const setMode = (mode) => {
    if (mode === "easy") {
      setLives(7);
    } else if (mode === "explorer") {
      setLives(5);
    } else if (mode === "master") {
      setLives(3);
    }
  };


  useEffect(() => {
    setMode(mode);
    const fetchWord = async () => {
      try {
        const response = await fetch("/api/word-pool");
        const data = await response.json();

        const randomWord = data[Math.floor(Math.random() * data.length)];
        wordToGuess.current = randomWord.word.toUpperCase();
        setSubject(randomWord.category);
      } catch (error) {
        console.error("Failed to fetch word pool:", error);
      }

      console.log();
      
    };
    fetchWord();
  }, [mode]);

  const getLetterFromAlphabets = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters((prev) => [...prev, letter]);

      if (!wordToGuess.current.includes(letter)) {
        setWrongGuesses((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    const isGuessedRight = () => {
      const uniqueLetters = [...new Set(wordToGuess.current.split(""))];
      if (uniqueLetters.length > 0) {
        return uniqueLetters.every((letter) => guessedLetters.includes(letter));
      }
    };
    if (lives <= wrongGuesses) {
      setTimeout(() => {
        setGameOver(true);
      }, 1500);
    } else if (isGuessedRight()) {
      setWin(true);
    }
  }, [lives, wrongGuesses, guessedLetters, wordToGuess]);

  if (gameOver) {
    return <GameOver msg="loose" />;
  }

  if (win) {
    return <GameOver msg="win" />;
  }
  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-20">
        <div className="w-full h-74 md:h-auto overflow-hidden rounded-md order-1 md:order-2">
          <RaisedMan balloonCount={lives} wrongGuesses={wrongGuesses} />
        </div>
        <div className="w-full min-h-vh flex flex-col items-center justify-between order-2 md:order-1 ">
          <div className="w-full md:py10">
            <h2 className="w-fit mx-auto text-3xl md:text-4xl md:mb-5 font-semibold capitalize">
              {subject}
            </h2>
            <div className="word mt-5 mb-14 md:my-10 w-full flex justify-center items-center text-xl gap-x-2">
              {wordToGuess.current.split("").map((letter, i) => {
                const isSpace = letter === " ";
                return (
                  <span
                    key={i}
                    className={`letter ${
                      guessedLetters.includes(letter) ? "revealed" : ""
                    }`}
                    style={{
                      display: isSpace ? "inline-block" : "inline",
                      width: isSpace ? "1rem" : "auto",
                      color: isSpace
                        ? "transparent"
                        : guessedLetters.includes(letter)
                        ? "white"
                        : "gray",
                      textShadow: guessedLetters.includes(letter)
                        ? "0 0 5px #fff"
                        : "none",
                    }}
                  >
                    {isSpace
                      ? " "
                      : guessedLetters.includes(letter)
                      ? letter
                      : "_"}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="w-full md:my-10">
            <Alphabets
              guessedLetters={guessedLetters}
              handleClick={getLetterFromAlphabets}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
