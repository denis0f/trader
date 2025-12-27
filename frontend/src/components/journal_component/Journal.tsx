import { useEffect, useState } from "react";
import axios from "axios";
import "./../../App.css";

/* ---------------------- TYPES ---------------------- */

interface OpenPosition {
  date: string;
  symbol: string;
  entry: number;
  stopLoss?: number;
  takeProfit?: number;
  equity: number;
  profit: number;
}

interface TradeHistory {
  date: string;
  symbol: string;
  entry: number;
  exit: number;
  status: "Win" | "Loss";
  profit: number;
}

/* ---------------------- COMPONENT ---------------------- */

const Journal = () => {
  const [openPositions, setOpenPositions] = useState<OpenPosition[]>([]);
  const [tradeHistory, setTradeHistory] = useState<TradeHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://127.0.0.1:8000/journal/open"),
      axios.get("http://127.0.0.1:8000/journal/history"),
    ])
      .then(([openRes, historyRes]) => {
        /* ---- map OPEN positions (snake_case → camelCase) ---- */
        const open = openRes.data.map((p: any) => ({
          date: p.date,
          symbol: p.symbol,
          entry: Number(p.entry),
          stopLoss: p.stop_loss ?? undefined,
          takeProfit: p.take_profit ?? undefined,
          equity: Number(p.equity),
          profit: Number(p.profit),
        }));

        /* ---- map HISTORY ---- */
        const history = historyRes.data.map((p: any) => ({
          date: p.date,
          symbol: p.symbol,
          entry: Number(p.entry),
          exit: Number(p.exit),
          status: p.status,
          profit: Number(p.profit),
        }));

        setOpenPositions(open);
        setTradeHistory(history);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="journal-container">Loading...</div>;
  }

  return (
    <div className="journal-container">
      {/* ---------------- OPEN POSITIONS ---------------- */}
      <section className="journal-section">
        <h2>Open Positions</h2>

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
            {openPositions.map((pos, index) => (
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
      </section>

      {/* ---------------- TRADE HISTORY ---------------- */}
      <section className="journal-section">
        <h2>Trade History</h2>

        <table className="journal-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Entry</th>
              <th>Exit</th>
              <th>Status</th>
              <th>Profit</th>
            </tr>
          </thead>

          <tbody>
            {tradeHistory.map((trade, index) => (
              <tr key={index}>
                <td>{trade.date}</td>
                <td>{trade.symbol}</td>
                <td>{trade.entry}</td>
                <td>{trade.exit}</td>
                <td className={trade.status === "Win" ? "profit" : "loss"}>
                  {trade.status}
                </td>
                <td className={trade.profit >= 0 ? "profit" : "loss"}>
                  ${trade.profit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Journal;
