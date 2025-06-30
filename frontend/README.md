# 🎮 Mini Game Lobby & Wallet Module

This project is part of the **Full-Stack Developer Assignment**. It simulates a mini social gaming app with a wallet system and mock multiplayer games.

---

## 📌 Features

### Game Lobby
- Two games: **Challenge & Connect** and **Snake & Ladder**
- Each game displays:
  - Entry Coin Requirement
  - Mocked Players Joined Count
  - "Join Game" button
- Joining a game:
  - Deducts coins from wallet
  - Shows a dummy placeholder game screen

### Wallet System
- Displays total coins
- Recharge options: **+10** and **+50 coins**
- Deduct coins on game join
- Show error if coins are insufficient
- Maintain transaction history (join and recharge)

---

## 🧑‍💻 Tech Stack

- **Frontend:** React
- **State Management:** React useState/useEffect
- **Styling:** Basic CSS (Responsive)
- **Backend/API:** Not required (mock data & state used)

---

## 💻 How to Run the App

```bash
# Clone the repository
git clone https://github.com/your-username/mini-game-lobby.git
cd mini-game-lobby

# Install dependencies
npm install

# Start the development server
npm start

# Open in browser
http://localhost:3000

#Backend Command
node index.js