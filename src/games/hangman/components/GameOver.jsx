import React from 'react';
import { Trophy, X, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const GameOver = ({ msg="win" }) => {
  const isWin = msg === "win";

  return (
    <div className='w-full h-svh absolute top-0 left-0  flex justify-center items-center bg-gray-900  overflow-hidden z-50 font-[poppins]'>
      {/* Background effects */}
      <div className="absolute inset-0">
        {isWin ? (
          // Win background with particles/confetti effect
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-green-900/20 to-blue-900/20"></div>
            {/* Animated particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-yellow-400/50 rounded-full animate-bounce`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        ) : (
          // Lose background with dark overlay
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-gray-900 to-black"></div>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Icon */}
        <div className="mb-8">
          {isWin ? (
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg ">
              <Trophy size={48} className="text-white" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg">
              <X size={48} className="text-white" />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="mb-6">
          {isWin ? (
            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
                Victory!
              </h1>
              <p className="text-xl text-gray-300 font-medium">
            Congratulations! You've guessed the word right!
              </p>
              <p className="text-green-400 text-lg mt-2">
                🎉 Well played! 🎉
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent mb-4">
                Game Over
              </h1>
              <p className="text-xl text-gray-300 font-medium">
                Don't give up! Try again and show what you're made of.
              </p>
              <p className="text-red-400 text-lg mt-2">
                💪 You can do better! 💪
              </p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 max-w-max mx-auto">
         

          <Link
          to={"/hangman"}
            className="w-full md:w-auto flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-gray-300 border-2 border-gray-600 hover:border-gray-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <Home size={20} />
            Home
          </Link>
        </div>

        {/* To do Next */}

        {/* Additional stats (optional) */}
        {/* {isWin && (
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Game Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Score:</span>
                <span className="ml-2 text-yellow-400 font-bold">1,250</span>
              </div>
              <div>
                <span className="text-gray-400">Time:</span>
                <span className="ml-2 text-blue-400 font-bold">05:42</span>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gray-700 rounded-full opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-gray-700 rounded-full opacity-10"></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 border-2 border-gray-700 rounded-full opacity-15"></div>
    </div>
  );
};

export default GameOver;