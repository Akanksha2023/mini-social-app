// backend/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let wallet = {
  coins: 50,
  transactions: [
    { type: "add", amount: 50, note: "Initial coins" }
  ]
};

const games = [
  { id: 1, name: "Challenge & Connect", entryFee: 10, players: 5 },
  { id: 2, name: "Snake & Ladder", entryFee: 15, players: 3 }
];

// APIs
app.get("/api/games", (req, res) => res.json(games));
app.get("/api/wallet", (req, res) => res.json(wallet));

app.post("/api/wallet/add", (req, res) => {
  const { amount } = req.body;
  wallet.coins += amount;
  wallet.transactions.push({ type: "add", amount, note: "Recharge" });
  res.json(wallet);
});

app.post("/api/join-game", (req, res) => {
  const { entryFee, gameName } = req.body;
  if (wallet.coins < entryFee) {
    return res.status(400).json({ error: "Insufficient coins" });
  }
  wallet.coins -= entryFee;
  wallet.transactions.push({ type: "deduct", amount: entryFee, note: `Joined ${gameName}` });
  res.json({ success: true });
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
app.get("/", (req, res) => {
  res.send("Backend is running");
});
