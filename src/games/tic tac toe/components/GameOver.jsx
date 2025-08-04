import { Home, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const GameOver = ({ winner, resetGame }) => {
  return (
    <div className="absolute top-0 left-0 w-full px-2 h-svh bg-black/20 flex justify-center items-center backdrop-blur-sm
    sm:px-4">
      {/* Game Over Message */}
      <div className="bg-gray-800/20 border-gray-100 w-full max-w-md text-center mb-6 backdrop-blur-sm rounded-xl p-4 border">
        {winner === "draw" ? (
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">
              It's a Draw!
            </h2>
            <p className="text-gray-300">Great game, both players!</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Player <span className={`${winner === 'X' ? "text-blue-500" : "text-red-500"} text-stroke`}>{winner}</span> Wins! 🎉
            </h2>
            <p className="text-gray-300">Congratulations!</p>
          </div>
        )}

        <div className="flex flex-col gap-2 mt-6
        xs:flex-row
        md:gap-4">
          <button
            onClick={resetGame}
            className="from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 w-full bg-gradient-to-r  text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex  items-center mx-auto cursor-pointer 
            xs:w-1/2
            sm:gap-x-4
            ease-in-out"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            New Game
          </button>
          <Link
          to="/tic-tac-toe"
            className="from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800  w-full bg-gradient-to-r text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex  items-center mx-auto 
            xs:w-1/2
            sm:gap-x-4"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
