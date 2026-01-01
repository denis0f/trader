import { useEffect, useState } from "react";
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
  stop_loss?: number;
  take_profit?: number;
  equity: number;
  profit: number;
}

interface RunningBot {
  id: number;
  name: string;
  description: string;
  positions: BotPosition[];
}

const Bots = () => {
  const [bots, setBots] = useState<Bot[] | null>(null);
  const [runningBots, setRunningBots] = useState<RunningBot[] | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/bots").then((res) => res.json()),
      fetch("http://127.0.0.1:8000/bots_running").then((res) => res.json()),
    ])
      .then(([botsData, runningBotsData]) => {
        setBots(botsData);
        setRunningBots(runningBotsData);
      })
      .catch((err) => {
        console.error("Failed to load bots:", err);
      });
  }, []);

  if (!bots || !runningBots) {
    return (
      <div className="bots-container">
        <h2>Loading bots...</h2>
      </div>
    );
  }

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
                      <td>{pos.stop_loss ?? "—"}</td>
                      <td>{pos.take_profit ?? "—"}</td>
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
