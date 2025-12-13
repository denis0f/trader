
import "./../../App.css";

interface OpenPosition {
  date: string; // e.g. 2025-01-12 (Mon)
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

const openPositions: OpenPosition[] = [
  {
    date: "2025-01-12 (Mon)",
    symbol: "EURUSD",
    entry: 1.0923,
    stopLoss: 1.0880,
    takeProfit: 1.1000,
    equity: 12500,
    profit: 230,
  },
  {
    date: "2025-01-13 (Tue)",
    symbol: "BTCUSD",
    entry: 42850,
    stopLoss: 42000,
    takeProfit: 44500,
    equity: 12500,
    profit: -180,
  },
];

const tradeHistory: TradeHistory[] = [
  {
    date: "2025-01-10 (Mon)",
    symbol: "GBPUSD",
    entry: 1.2710,
    exit: 1.2785,
    status: "Win",
    profit: 350,
  },
  {
    date: "2025-01-09 (Wen)",
    symbol: "NAS100",
    entry: 16850,
    exit: 16720,
    status: "Loss",
    profit: -260,
  },
];

const Journal = () => {
  return (
    <div className="journal-container">
      {/* Open Positions */}
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

      {/* Trade History */}
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


