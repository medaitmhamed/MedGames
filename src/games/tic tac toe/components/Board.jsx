import { User } from "lucide-react";
import {useEffect, useState } from "react";
import GameOver from "./GameOver";
import { Navigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../../Hooks/useLocalStorage";
const Board = () => {
  const { state } = useLocation();
    // stop direct access 

    const { mode, difficulty, players, whoStart } = state || {};
    const [player1, player2] = players || [];
    const [board, setBoard] = useState(Array(9).fill(""));
    const [startingPlayer, setStartingPlayer] = useState(whoStart);
    const [currentPlayer, setCurrentPlayer] = useState(startingPlayer);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [winningLine, setWinningLine] = useState([]);
    const [gameCount, setGameCount] = useState(0);
    const [scores, setScores] = useLocalStorage("scores", {
      X: 0,
      O: 0,
      draws: 0,
    });
    if (!state){return <Navigate to="/tic-tac-toe" replace/>}

  const p1Score = scores?.[player1?.symbol] ?? 0;
  const p2Score = scores?.[player2?.symbol] ?? 0;

  const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

  useEffect(() => {
    setCurrentPlayer(startingPlayer);
  }, [startingPlayer]);

  useEffect(() => {
    if (
      mode === "cpu" &&
      currentPlayer === player2.symbol &&
      !gameOver &&
      winner === null
    ) {
      const emptyCells = board
        .map((cell, index) => (cell === "" ? index : null))
        .filter((index) => index !== null);
      let rebotMove = null;
      if (emptyCells.length > 0) {
        const randomMove =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (difficulty === "easy") {
          rebotMove = randomMove;
        } else if (difficulty === "normal") {
          // Simple AI: try to win, then block, then random
          rebotMove =
            findBestMove(board, player2.symbol, player1.symbol) || randomMove;
        } else if (difficulty === "hard") {
          rebotMove = bestMoveMinimax(board, player2.symbol, player1.symbol);
        }
        // Small delay for realism
        const timer = setTimeout(() => {
          makeMove(rebotMove);
        }, 700);

        return () => clearTimeout(timer); // cleanup
      }
    }
  }, [board, currentPlayer, mode, gameOver, winner, player2.symbol]);

  // Simple AI logic
  const findBestMove = (board, aiSymbol, playerSymbol) => {

    // Try to win
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] === aiSymbol && board[b] === aiSymbol && board[c] === "")
        return c;
      if (board[a] === aiSymbol && board[c] === aiSymbol && board[b] === "")
        return b;
      if (board[b] === aiSymbol && board[c] === aiSymbol && board[a] === "")
        return a;
    }

    // Try to block player
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        board[a] === playerSymbol &&
        board[b] === playerSymbol &&
        board[c] === ""
      )
        return c;
      if (
        board[a] === playerSymbol &&
        board[c] === playerSymbol &&
        board[b] === ""
      )
        return b;
      if (
        board[b] === playerSymbol &&
        board[c] === playerSymbol &&
        board[a] === ""
      )
        return a;
    }

    // Take center if available
    if (board[4] === "") return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((i) => board[i] === "");
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }

    return null;
  };

  // Check for winner
useEffect(() => {
  const winnerData = checkGameResult(board, players, true);

  if (winnerData) {
    const { result, combination } = winnerData;

    if (result !== "draw") {
      const winnerPlayer = players.find((p) => p.symbol === result);
      setWinner(winnerPlayer);
      setWinningLine(combination); 
      setScores((prev) => ({ ...prev, [result]: prev[result] + 1 }));
      setTimeout(() => setGameOver(true), 500);
    } else {
      setWinner("draw");
      setTimeout(() => setGameOver(true), 500);
    }
  }
}, [board, players]);


  const checkGameResult = (board, players, withCombination = false) => {
  // Check for winner
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const winnerSymbol = board[a];
      const winnerPlayer = players?.find(p => p.symbol === winnerSymbol);
      const result = winnerPlayer?.symbol || winnerSymbol;
      
      return withCombination 
        ? { result, combination: combo }
        : result;
    }
  }
  
  // Check for draw
  if (board.every(cell => cell !== "")) {
    return withCombination
      ? { result: "draw", combination: [] }
      : "draw";
  }
  
  return null;
};


  const minimax = (newBoard, depth, isMaximizing, aiSymbol, humanSymbol) => {
    const result = checkGameResult(newBoard, [
      { symbol: aiSymbol },
      { symbol: humanSymbol },
    ]);

    if (result === aiSymbol) return 10 - depth;
    if (result === humanSymbol) return depth - 10;
    if (result === "draw") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === "") {
          newBoard[i] = aiSymbol;
          let score = minimax(
            newBoard,
            depth + 1,
            false,
            aiSymbol,
            humanSymbol
          );
          newBoard[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === "") {
          newBoard[i] = humanSymbol;
          let score = minimax(newBoard, depth + 1, true, aiSymbol, humanSymbol);
          newBoard[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const bestMoveMinimax = (board, aiSymbol, humanSymbol) => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = aiSymbol;
        let score = minimax(board, 0, false, aiSymbol, humanSymbol);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
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
      return winner.symbol === player1.symbol
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
        <div
          className={`${
            currentPlayer === player1.symbol
              ? "opacity-100 brightness-110"
              : "opacity-50"
          } w-full justify-items-center rounded-md text-lg text-center bg-sky-950/80 border border-sky-800 px-4 py-2`}
        >
          <div className="flex items-start gap-x-2 mb-4">
            <User className="" />
            <span className="font-semibold capitalize">
              {mode !== "2p" ? (player1.name || "you") : (player1.name || "player")} {player1.symbol}
            </span>
          </div>
          <span className="text-2xl font-medium">{p1Score}</span>
        </div>
      </div>
      <div
        className="w-1/2 h-20 md:order-1 px-2
        md:w-1/4
        lg:w-1/5"
      >
        <div
          className={`${
            currentPlayer === player2.symbol
              ? "opacity-100 brightness-110"
              : "opacity-50"
          } w-full justify-items-center rounded-md text-lg text-center bg-red-950/80 border border-red-800 px-4 py-2`}
        >
          <div className="flex items-start gap-x-2 mb-4">
            <User className="" />
            <span className="font-semibold">
              {player2.name || "player"} {player2.symbol}
            </span>
          </div>
          <span className="text-2xl font-medium">{p2Score}</span>
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
      {gameOver && (
        <GameOver mode={mode} winner={winner} p1={player1} resetGame={resetGame} />
      )}
    </div>
  );
};

export default Board;
