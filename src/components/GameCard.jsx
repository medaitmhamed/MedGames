import { Heart, Star, StarHalf } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

const GameCard = ({ game, addToFavorites }) => {
  const handleAddToFavorites = () => {
    addToFavorites(game.id);
  };
  return (
    <div className="rounded-lg border p-6 shadow-sm border-gray-700 bg-gray-800">
      <div className="h-56 w-full">
          <img className="mx-auto h-full" src={game.image} alt={game.title} />
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 capitalize text-sm font-medium text-active bg-primary-900 ">
            new
          </span>
          <button
            type="button"
            onClick={handleAddToFavorites}
            className="group relative flex items-center justify-between text-sm p-2 w-44 h-8  text-white cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {game.isFavorite ? (
                <motion.p
                  key="added"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center text-active"
                >
                  Added to Favorites
                </motion.p>
              ) : (
                <motion.p
                  key="add"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  Add to Favorites
                </motion.p>
              )}
            </AnimatePresence>

            <Heart
              className={`h-5 transition ${
                game.isFavorite
                  ? "fill-active stroke-active"
                  : "stroke-gray-200"
              }`}
            />
          </button>
        </div>

        <h3
          className="text-lg font-semibold leading-tight text-white"
        >
          {game.title}
        </h3>
        <div className="mt-2 mb-4 flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => {
              const isFull = index < Math.floor(game.rating);
              const isHalf =
                index === Math.floor(game.rating) && game.rating % 1 >= 0.5;

              return (
                <div key={index} className="relative inline-block w-4 h-4">
                  {/* Outline star (always visible) */}
                  <Star className="w-4 h-4 text-gray-400 stroke-current" />

                  {/* Full star for filled or half-filled */}
                  {(isFull || isHalf) && (
                    <Star
                      className="w-4 h-4 text-active fill-current stroke-current absolute top-0 left-0"
                      style={{
                        clipPath: isHalf ? "inset(0 50% 0 0)" : "none",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-sm font-medium text-white">{game.rating}</p>
          <p className="text-sm font-medium text-gray-400">
            ({game.ratesCount})
          </p>
        </div>
        <p className="mt-2 text-sm text-gray-400">{game.description}</p>

        <Link
          to={game.path}
          className="w-full mx-auto mt-4 inline-flex justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-active"
        >
          Play Now
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
