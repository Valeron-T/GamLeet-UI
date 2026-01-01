# 🎨 GamLeet UI — The Dashboard of Your Financial Doom

**GamLeet UI** is the visual command center for **GamLeet**, where you can watch your financial future crumble in real-time if you skip your DSA practice. It provides a sleek, "premium" interface to track your streaks, manage integrations, and buy power-ups (to save your wallet).

---

## ✨ Features

- **📊 Visual Dashboard**: See your `Lifetime Loss`, `Current Streak`, and `Available Balance` at a glance.
- **🗺️ Interactive Walkthrough**: New user? Get a guided tour of the carnage (and features) with our integrated `driver.js` walkthrough.
- **🔌 Integrations Manager**: seamlessly connect your **LeetCode** (for tracking) and **Zerodha** (for suffering) accounts.
- **🛒 Power-up Store**: Spent `GamCoins` earned from consistency to buy `Streak Freezes` and `Penalty Shields`.
- **📈 Progress Tracking**: Visual progress bars for your daily 3-problem quota (Easy/Medium/Hard).
- **💅 Premium Aesthetics**: Built with Tailwind CSS, Shadcn UI, and Framer Motion for that "it hurts less if it looks good" vibe.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: Shadcn UI + Radix Primitives
- **State Management**: React Context (`StatsContext`, `AuthContext`)
- **Walkthrough**: `driver.js`
- **Icons**: Tabler Icons & Lucide React

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- The **GamLeet Backend** running (usually on port `8000`)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/valeron-t/gamleet-ui.git
   cd gamleet-ui
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_GOOGLE_CLIENT_ID="your-google-client-id"
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📸 Snapshots

*Imagine beautiful screenshots here of:*
- *The Dashboard showing "Rs 500 Lifetime Loss"*
- *The Power-up Store selling "Streak Freezes"*
- *The Integration settings page*

---

## 🤝 Contributing

1. Fork it.
2. Create your feature branch (`git checkout -b feature/cool-new-agony`).
3. Commit your changes (`git commit -m 'Added more ways to lose money'`).
4. Push to the branch (`git push origin feature/cool-new-agony`).
5. Open a Pull Request.

---

### Built by @valerontoscano
