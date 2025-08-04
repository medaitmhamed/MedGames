import { Bot, Globe, Users } from "lucide-react"
import { Link } from "react-router-dom"

const GameModes = () => {
  return (
    <div className="flex-1 flex items-start justify-center  mt-[10svh] md:mt-[5vh] overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-col w-full items-center justify-center px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300 font-medium mb-2">
            Choose your game mode
          </p>
          <p className="text-gray-400">
            Select how many players will be playing
          </p>
        </div>

        {/* Game Mode Buttons */}
        <div className="w-full max-w-xl flex flex-col my-6 items-center gap-8 px-10">
          {/* Single Player Button */}
          <Link
            to="/tic-tac-toe/play_with_friend"
            className="w-full md:w-1/2 py-2 px-4 rounded-md flex items-center gap-x-2 bg-gradient-to-r from-gray-950 to-sky-500 shadow ring ring-gray-100/60 "
          >
            <Users className="w-6 h-6 self-baseline" />
            <h3 className="flex-1 text-lg font-bold text-center">Play with a frind</h3>
          </Link>

          {/* Two Players Button */}
          <Link
            to="/tic-tac-toe/single-player"
            className="w-full md:w-1/2 py-2 px-4 rounded-md flex items-center gap-x-2 bg-gradient-to-r from-gray-950 to-sky-500 shadow ring ring-gray-100/60 "
          >
            <Bot className="w-6 h-6 self-baseline" />
            <h3 className="flex-1 text-lg font-bold text-center">Play vs robot</h3>
          </Link>
          <Link
            to="/tic-tac-toe/single-player"
            className="w-full md:w-1/2 py-2 px-4 rounded-md flex items-center gap-x-2 bg-gradient-to-r from-gray-950 to-sky-500 shadow ring ring-gray-100/60 "
          >
            <Globe className="w-6 h-6 self-baseline" />
            <h3 className="flex-1 text-lg font-bold text-center">Play online</h3>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-10 text-center max-w-md">
          <p className="text-gray-400 text-sm">
            🎯 Get three in a row to win! Play horizontally, vertically, or
            diagonally.
          </p>
        </div>
      </div>
    </div>
  )
}

export default GameModes