import GameCard from "./GameCard";
import hangMan from "../assets/images/hangman-bg.png";
import { useEffect, useState } from "react";
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
  ]);

  const FAVORITES_KEY = "favorites";
  // Load favorite statuses from localStorage on first render
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    const updatedGames = games.map((game) => {
      const stored = storedFavorites.find((f) => f.id === game.id);
      return stored ? { ...game, isFavorite: stored.isFavorite } : game;
    });
    setGames(updatedGames);
  }, []);

  const addToFavorites = (id) => {
    const updatedGames = games.map((game) =>
      game.id === id ? { ...game, isFavorite: !game.isFavorite } : game
    );
    setGames(updatedGames);

    // Save to localStorage
    const favsToStore = updatedGames.map(({ id, isFavorite }) => ({
      id,
      isFavorite,
    }));
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favsToStore));
  };
  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 md:px-10">
      {games.map((game) => (
        <GameCard key={game.id} game={game} addToFavorites={addToFavorites} />
      ))}
    </div>
  );
};

export default GameList;
