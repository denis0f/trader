import "./../../App.css";

interface Bot {
  id: number;
  name: string;
  description: string;
}

interface BotPosition {
  date: string;
  symbol: string;
  entry: number;
  stopLoss?: number;
  takeProfit?: number;
  equity: number;
  profit: number;
}

interface RunningBot {
  id: number;
  name: string;
  description: string;
  positions: BotPosition[];
}

const bots: Bot[] = [
  { id: 1, name: "ScalpX", description: "High-frequency scalping bot" },
  { id: 2, name: "TrendWave", description: "Trend-following momentum bot" },
  { id: 3, name: "MeanBot", description: "Mean reversion strategy" },
  { id: 4, name: "BreakoutPro", description: "Session breakout trader" },
  { id: 5, name: "CryptoPulse", description: "Crypto volatility sniper" },
  { id: 6, name: "IndexFlow", description: "Indices flow-based bot" },
];

const runningBots: RunningBot[] = [
  {
    id: 1,
    name: "ScalpX",
    description:
      "A fast execution scalping bot that trades short-term momentum during high-liquidity sessions.",
    positions: [
      {
        date: "2025-01-14 (Tue)",
        symbol: "EURUSD",
        entry: 1.091,
        stopLoss: 1.0875,
        takeProfit: 1.099,
        equity: 12500,
        profit: 180,
      },
    ],
  },
  {
    id: 2,
    name: "TrendWave",
    description:
      "Designed to capture strong directional moves by following higher timeframe trends.",
    positions: [],
  },
];

const Bots = () => {
  return (
    <div className="bots-container">
      {/* My Bots */}
      <section className="bots-section">
        <h2>My Bots</h2>

        <div className="bots-grid">
          {bots.map((bot) => (
            <div key={bot.id} className="bot-card">
              <h3>{bot.name}</h3>
              <p>{bot.description}</p>

              <div className="bot-actions">
                <button className="btn start">Start</button>
                <button className="btn stop">Stop</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Running Bots */}
      <section className="bots-section">
        <h2>Running Bots</h2>

        {runningBots.map((bot) => (
          <div key={bot.id} className="running-bot-card">
            {/* Header */}
            <div className="running-bot-header">
              <h3>{bot.name}</h3>
              <button className="stats-btn">Stats</button>
            </div>

            {/* Description */}
            <p className="running-bot-description">{bot.description}</p>

            {/* Open Positions */}
            <h4 className="open-positions-title">Open Positions</h4>

            {bot.positions.length === 0 ? (
              <div className="no-positions">
                No open positions, still waiting for my setup!
              </div>
            ) : (
              <table className="journal-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Symbol</th>
                    <th>Entry</th>
                    <th>Stop Loss</th>
                    <th>Take Profit</th>
                    <th>Equity</th>
                    <th>P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {bot.positions.map((pos, index) => (
                    <tr key={index}>
                      <td>{pos.date}</td>
                      <td>{pos.symbol}</td>
                      <td>{pos.entry}</td>
                      <td>{pos.stopLoss ?? "—"}</td>
                      <td>{pos.takeProfit ?? "—"}</td>
                      <td>${pos.equity.toLocaleString()}</td>
                      <td className={pos.profit >= 0 ? "profit" : "loss"}>
                        ${pos.profit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Bots;
