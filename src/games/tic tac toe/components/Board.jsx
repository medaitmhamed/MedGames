import { User } from "lucide-react";
import { useEffect, useState } from "react";
import GameOver from "./GameOver";

const Board = ({ mode }) => {

//   const modes = {
//   TWO_PLAYER: "2p",
//   VS_COMPUTER: "cpu",
//   ONLINE: "online",
// };


  const [board, setBoard] = useState(Array(9).fill(""));
  const [startingPlayer, setStartingPlayer] = useState("X");
  const [currentPlayer, setCurrentPlayer] = useState(startingPlayer);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [winningLine, setWinningLine] = useState([]);
  const [gameCount, setGameCount] = useState(0);

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  useEffect(() => {
    setCurrentPlayer(startingPlayer);
  }, [startingPlayer, gameCount]);

  // Check for winner
  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    for (let combination of winningCombinations) {
      // [ 0 , 1 , 2 ]
      const [a, b, c] = combination; // [0 1 2]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningLine(combination);
        setTimeout(() => {
          setGameOver(true);
        }, 500);
        setScores((prev) => ({
          ...prev,
          [board[a]]: prev[board[a]] + 1,
        }));
        return;
      }
    }

    // Check for draw
    if (board.every((cell) => cell !== "") && !winner) {
      setWinner("draw");
      setGameOver(true);
    }
  };

  const makeMove = (index) => {
    if (board[index] || gameOver || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setStartingPlayer((prev) => (prev === "X" ? "O" : "X"));
    setWinner(null);
    setGameOver(false);
    setWinningLine([]);
    setGameCount((prev) => prev + 1);
  };

  const getCellColor = (index) => {
    if (winningLine.includes(index)) {
      return winner === "X"
        ? "bg-blue-500/20 border-blue-400"
        : "bg-red-500/20 border-red-400";
    }
    return "bg-gray-800/50 border-gray-600";
  };

  return (
    <div className="flex justify-center items-start flex-wrap">
      <div
        className="w-1/2 flex justify-center items-start px-2
        md:w-1/4
        lg:w-1/5"
      >
        <div className="w-full justify-items-center rounded-md text-lg text-center bg-sky-950/80 border border-sky-800 px-4 py-2">
          <div className="flex items-start gap-x-2 mb-4">
            <User className="" />
            <span className="font-semibold">Player X </span>
          </div>
          <span className="text-2xl font-medium">{scores.X}</span>
        </div>
      </div>
      <div
        className="w-1/2 h-20 md:order-1 px-2
        md:w-1/4
        lg:w-1/5"
      >
        <div className="w-full justify-items-center rounded-md text-lg text-center bg-red-950/80 border border-red-800 px-4 py-2">
          <div className="flex items-start gap-x-2 mb-4">
            <User className="" />
            <span className="font-semibold">Player O </span>
          </div>
          <span className="text-2xl font-medium">{scores.O}</span>
        </div>
      </div>
      <div className="w-full mt-6 flex-1 flex justify-center items-start">
        <div
          className="w-full grid grid-cols-3 gap-3
          md:max-w-sm"
        >
          {board.map((cell, i) => {
            return (
              <button
                key={i}
                onClick={() => makeMove(i)}
                className={`${getCellColor(
                  i
                )} aspect-square rounded-xl border-2 transition-all duration-300 flex items-center justify-center text-6xl font-bold cursor-pointer
              ${
                !cell && !gameOver
                  ? "hover:scale-105 hover:bg-gray-700/50 cursor-pointer"
                  : "cursor-default"
              }
              `}
              >
                {cell}
              </button>
            );
          })}
        </div>
      </div>
      {gameOver && <GameOver winner={winner} resetGame={resetGame} />}
    </div>
  );
};

export default Board;
