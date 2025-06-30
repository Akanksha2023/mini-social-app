import React, { useEffect, useState } from "react";
import GameLobby from "./GameLobby";
import { motion } from "framer-motion";
import axios from "axios";

function Wallet() {
  const [coins, setCoins] = useState(0);
  const [history, setHistory] = useState([]);

  // Load wallet from backend
  useEffect(() => {
    axios.get("http://localhost:4000/api/wallet")
      .then(res => {
        setCoins(res.data.coins);
        const formatted = res.data.transactions.map(t =>
          t.type === "add"
            ? `${t.note} — +${t.amount} coins`
            : `${t.note} — -${t.amount} coins`
        );
        setHistory(formatted.reverse());
      });
  }, []);

  const recharge = async (amount) => {
    const res = await axios.post("http://localhost:4000/api/wallet/add", { amount });
    setCoins(res.data.coins);
    const formatted = res.data.transactions.map(t =>
      t.type === "add"
        ? `${t.note} — +${t.amount} coins`
        : `${t.note} — -${t.amount} coins`
    );
    setHistory(formatted.reverse());
  };

  const handleJoinGame = async (game) => {
    try {
      const res = await axios.post("http://localhost:4000/api/join-game", {
        entryFee: game.entryFee,
        gameName: game.name
      });
      if (res.data.success) {
        const walletRes = await axios.get("http://localhost:4000/api/wallet");
        setCoins(walletRes.data.coins);
        const formatted = walletRes.data.transactions.map(t =>
          t.type === "add"
            ? `${t.note} — +${t.amount} coins`
            : `${t.note} — -${t.amount} coins`
        );
        setHistory(formatted.reverse());
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to join game");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <motion.h1
        className="text-4xl font-bold mb-2 flex items-center gap-2"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        🎮 Mini Game Lobby
      </motion.h1>

      <motion.div
        className="mb-6 flex items-center gap-4"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-2xl">💰 Wallet</span>
        <span className="text-xl">Total Coins: {coins}</span>
        <button
          onClick={() => recharge(10)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +10 Coins
        </button>
        <button
          onClick={() => recharge(50)}
          className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800"
        >
          +50 Coins
        </button>
      </motion.div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧾 Transaction History</h2>
        <ul className="list-disc ml-5 text-sm space-y-1 max-h-52 overflow-y-auto pr-2">
          {history.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <GameLobby onJoinGame={handleJoinGame} />
    </div>
  );
}

export default Wallet;
