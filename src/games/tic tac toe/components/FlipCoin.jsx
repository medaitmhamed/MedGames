import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const FlipCoin = ({ mode, players, difficulty }) => {
  const [result, setResult] = useState(null); // "X" or "O"
  const [startingPlayer, setStartingPlayer] = useState(null);
  const [redirect, setRedirect] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const res = Math.random() < 0.5 ? "X" : "O";
    setResult(res);
  }, []);

  const spins = result
    ? [...Array(7).keys()].map((n) => n * 180) // multiple flips
    : [];

  // Add final position based on result
  if (result === "X") spins.push(spins[spins.length - 1] + 0);
  if (result === "O") spins.push(spins[spins.length - 1] + 180);

  useEffect(() => {
    setTimeout(() => {
      if (result) {
        const player = players.find((p) => p.symbol === result);
        setStartingPlayer(player || result);
      }
    }, 3000);
    setTimeout(() => {
      setRedirect(true);
    }, 4000);
  }, [result, players]);

  return (
    <div className="w-full h-svh absolute top-0 left-0 bg-dark flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-4 md:gap-y-8">
        <h2 className="text-3xl">Who goes first?</h2>
        <div className="w-44 h-44 rounded-full">
          <motion.div
            // animate={{ rotateY: result === "X" ? 0 : 180 }}
            // transition={{ duration: 2, ease: "easeOut" }}
            animate={{ rotateY: spins }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
            className="relative w-full h-full transform-3d text-8xl font-bold rounded-full border-4 "
          >
            <div
              className={`absolute w-full h-full rounded-full backface-hidden ${
                players[0].symbol === "X" ? "bg-blue-400" : "bg-red-500"
              }  flex justify-center items-center `}
            >
              X
            </div>
            <div
              className={`absolute w-full h-full rounded-full backface-hidden ${
                players[0].symbol === "X" ? "bg-red-500" : "bg-blue-400"
              } rotate-y-180 flex justify-center items-center `}
            >
              O
            </div>
          </motion.div>
        </div>
        {mode === "2p" && (
          <h2 className="text-3xl">
            {startingPlayer && startingPlayer.name + " will starts"}
          </h2>
        )}
        {mode === "cpu" && (
          <h2 className="text-3xl">
            {startingPlayer &&
              (startingPlayer.name === "Robot" ? "Robot" : "You") +
                " will starts"}{" "}
          </h2>
        )}
      </div>
      {redirect && (
        <Navigate
          to={mode === "cpu" ? "play_vs_robot" : "play_with_friend"}
          state={{
            mode,
            difficulty,
            players,
            whoStart: startingPlayer.symbol,
          }}
        />
      )}
    </div>
  );
};

export default FlipCoin;
