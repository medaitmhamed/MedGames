import GameCard from "./GameCard";
import hangMan from "../assets/images/games/hangman/bg.png";
import guessMyNbr from "../assets/images/games/guessMyNbr/tumbnail.png";
import xo_tumbnail from "../assets/images/games/tic tac toe/tumbnail.png";
import { useEffect, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
const GameList = () => {
  const [games, setGames] = useState([
    {
      id: 1,
      title: "Hangman",
      description: "A classic word guessing game",
      image: hangMan,
      isFavorite: false,
      rating: 4.5,
      ratesCount: 100,
      playingCount: 2000,
      path: "/hangman",
    },
    {
      id: 2,
      title: "Tic-Tac-Toe (XO)",
      description: "Challenge your mind and play (XO) game",
      image: xo_tumbnail,
      isFavorite: false,
      rating: 4,
      ratesCount: 56,
      playingCount: 1245,
      path: "/tic-tac-toe",
    },
    {
      id: 3,
      title: "Guess My Number",
      description: "Try to guess the secret number with hints.",
      image: guessMyNbr,
      isFavorite: false,
      rating: 5,
      ratesCount: 20,
      playingCount: 1245,
      path: "/guess-my-number",
    },
  ]);
  
  const FAVORITES_KEY = "favorites";
  const [favorites, setFavorites] = useLocalStorage(FAVORITES_KEY, []);
  // Load favorite statuses from localStorage on first render
  useEffect(() => {
    setGames((prevGames) =>
      prevGames.map((game) => {
        const stored = favorites.find((f) => f.id === game.id);
        return stored
          ? { ...game, isFavorite: stored.isFavorite }
          : { ...game, isFavorite: false };
      })
    );
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = (gameId) => {
    const exists = favorites.find(f => f.id === gameId);
    if (exists) {
      // Remove from favorites
      setFavorites(favorites.filter(f => f.id !== gameId));
    } else {
      // Add to favorites
      setFavorites([...favorites, { id: gameId, isFavorite: true }]);
    }
  };

  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 md:px-10">
      {games.map((game) => (
        <GameCard key={game.id} game={game} addToFavorites={toggleFavorite} />
      ))}
    </div>
  );
};

export default GameList;
