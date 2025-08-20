import { motion } from "motion/react";
import { CircleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import FlipCoin from "./FlipCoin";

const PlayerNames = ({ mode, setMode }) => {
  const [player1, setPlayer1] = useState({ name: "", symbol: "X" });
  const [player2, setPlayer2] = useState({ name: "", symbol: "O" });
  const [isFlipOpen, setIsFlipOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (mode === "cpu") {
      setPlayer2((prev) => ({ ...prev, name: "Robot" }));
    }
  }, [mode]);

  const setSymbols = (e) => {
    setPlayer1((prv) => ({ ...prv, symbol: e.target.value }));
    setPlayer2((prv) => ({
      ...prv,
      symbol: player1.symbol == "X" ? "X" : "O",
    }));
  };
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full px-2 h-svh bg-black/20 flex justify-center items-center backdrop-blur-sm
    sm:px-4"
      >
        <form className="grid grid-cols-[auto_auto_1fr] grid-row-2 gap-x-2 md:gap-x-6 gap-y-6 items-center bg-gray-950 border-gray-100 w-full max-w-md  mb-6 rounded-xl p-4 border text-lg">
          <span className="text-blue-400">{mode === "2p" ? "player" : "You"}</span>
          <select
            id="symbol"
            value={player1.symbol}
            onChange={(e) => setSymbols(e)}
            className="w-fit md:w-10 cursor-pointer focus-visible:outline-none"
          >
            <option className="bg-dark" value="X">
              X
            </option>
            <option className="bg-dark" value="O">
              O
            </option>
          </select>
          <input
            id="player1-Name"
            type="text"
            value={player1.name}
            onChange={(e) => {
              const value = e.target.value.slice(0, 10);
              const capitalized =
                value.charAt(0).toUpperCase() + value.slice(1);
              setPlayer1((prev) => ({ ...prev, name: capitalized }));
            }}
            placeholder="Name"
            className=" w-full border rounded-sm py-1 px-4 capitalize"
            maxLength={10}
          />

          <span className="text-rose-600">
            {mode === "2p" ? "player" : "Robot"}
          </span>
          <p className="w-fit place-self-center">{player2.symbol}</p>
          {mode === "2p" ? (
            <input
              id="player2-Name"
              type="text"
              value={player2.name}
              onChange={(e) => {
                const value = e.target.value.slice(0, 10);
                const capitalized =
                  value.charAt(0).toUpperCase() + value.slice(1);
                setPlayer2((prev) => ({ ...prev, name: capitalized }));
              }}
              placeholder="Name"
              className="w-full border rounded-sm py-1 px-4 capitalize"
              maxLength={10}
            />
          ) : (
            <div className="flex justify-between items-center gap-x-8">
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="flex-1 min-w-fit cursor-pointer focus-visible:outline-none"
              >
                <option className="bg-dark" value="easy">
                  As a Child
                </option>
                <option className="bg-dark" value="normal">
                  As an Adult
                </option>
                <option className="bg-dark" value="hard">
                  As an Expert
                </option>
              </select>
              <div
                className="relative"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
              >
                <CircleAlert
                  className="cursor-pointer text-gray-300 hover:text-sky-500"
                  size={20}
                />
                {showInfo && (
                  <p className="w-54 bg-gray-800 absolute top-1/2 md:top-7 lg:top-1/2 -translate-y-1/2 md:translate-y-0 lg:-translate-y-1/2 -left-58 md:left-1/2 md:-translate-x-1/2 lg:translate-x-0 lg:left-10 p-2 border rounded-md text-sm leading-loose shadow-md shadow-gray-200/50">
                    <span className="font-semibold text-sky-500 ">Child : </span>Easy mode.<br/>
                    <span className="font-semibold text-sky-500 ">Adult : </span>Normal difficulty.<br/>
                    <span className="font-semibold text-sky-500 ">Expert : </span>Hard mode.
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="col-span-3 flex gap-x-2">
            <button
              type="button"
              state={{ player1, player2 }}
              onClick={() => setIsFlipOpen(true)}
              className="basis-1/2 border-2 rounded-md hover:border-2 hover:border-sky-500 hover:text-sky-500 duration-300 cursor-pointer"
            >
              Play
            </button>
            <button
              type="button"
              onClick={() => setMode(null)}
              className="basis-1/2 border-2 rounded-md hover:border-2 hover:border-red-500 hover:text-red-400 duration-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>

      {isFlipOpen && <FlipCoin mode={mode} players={[player1, player2]} difficulty={difficulty} />}
    </>
  );
};

export default PlayerNames;
