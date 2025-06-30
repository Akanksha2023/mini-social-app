import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function GameLobby({ onJoinGame }) {
  const [games, setGames] = useState([]);
  const [joinedGame, setJoinedGame] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/games")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(() => setError("Failed to load games"));
  }, []);

  const handleJoin = async (game) => {
    try {
      await onJoinGame(game); // <-- delegate to parent Wallet
      setJoinedGame(game);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to join");
    }
  };

  if (joinedGame) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-100 to-purple-200 p-8 rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-4 animate-bounce">
          🎉 You joined: {joinedGame.name}
        </h2>
        <p className="text-gray-700 mb-6 text-sm sm:text-base max-w-md">
          This is a dummy screen to represent your game. The actual game is under development. Thank you for joining!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded"
          onClick={() => setJoinedGame(null)}
        >
          ⬅ Back to Lobby
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mt-8 grid gap-4 md:grid-cols-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {error && (
        <div className="col-span-2 bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300">
          {error}
        </div>
      )}
      {games.map((game) => (
        <motion.div
          key={game.id}
          whileHover={{ scale: 1.03 }}
          className="p-4 bg-white rounded-lg shadow-md border"
        >
          <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
          <p className="text-sm text-gray-600">🎟 Entry Fee: {game.entryFee} Coins</p>
          <p className="text-sm text-gray-600">👥 Players: {game.players}</p>
          <button
            onClick={() => handleJoin(game)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Join Game
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default GameLobby;
