import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { FaChartLine, FaDollarSign, FaStar, FaChartBar } from "react-icons/fa";
import "./../../App.css";

/* ---------------------- TYPES ---------------------- */
interface SymbolData {
  name: string;
  trades: number;
  profit: number;
}

interface DailyProfitData {
  date: string;
  profit: number;
}

interface DashboardStats {
  netProfit: number;
  cumulativeNetProfit: number;
  winRate: number;
  totalTrades: number;
  lossRate: number;
}

/* ---------------------- COMPONENTS ---------------------- */

/* --- StatsCard Props --- */
interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => (
  <div className="stats-card">
    <div className="stats-icon">{icon}</div>
    <h3>{title}</h3>
    <p className="stats-value">{value}</p>
  </div>
);

/* --- Daily Profit Line Chart --- */
interface LineChartProps {
  data: DailyProfitData[];
}

const DailyProfitLineChart = ({ data }: LineChartProps) => (
  <div className="chart-box">
    <h3>Daily Profit (Line)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="profit" stroke="#4caf50" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

/* --- Daily Profit Bar Chart --- */
interface BarChartProps {
  data: DailyProfitData[];
}

const ProfitBarChart = ({ data }: BarChartProps) => (
  <div className="chart-box">
    <h3>Daily Profit (Bar)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="profit" fill="#00b7ff" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

/* --- Traded Symbols Table --- */
interface TradedSymbolsProps {
  symbols: SymbolData[];
}

const TradedSymbols = ({ symbols }: TradedSymbolsProps) => {
  const [search, setSearch] = useState("");

  const filtered = symbols.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chart-box full-width-table">
      <h3>Traded Symbols</h3>

      {/* Search Input */}
      <input
        className="symbol-search"
        type="text"
        placeholder="Search Symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="symbols-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Trades</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.trades}</td>
              <td>${s.profit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ---------------------- MAIN DASHBOARD ---------------------- */

const Home = () => {
  const [stats] = useState<DashboardStats>({
    netProfit: 12000,
    cumulativeNetProfit: 100000,
    winRate: 75,
    totalTrades: 250,
    lossRate: 25,
  });

  const [dailyProfit] = useState<DailyProfitData[]>([
    { date: "2025-12-01", profit: 500 },
    { date: "2025-12-02", profit: -200 },
    { date: "2025-12-03", profit: 300 },
    { date: "2025-12-04", profit: 400 },
  ]);

  const [symbols] = useState<SymbolData[]>([
    { name: "AAPL", trades: 50, profit: 3500 },
    { name: "TSLA", trades: 30, profit: 2500 },
    { name: "BTC/USD", trades: 100, profit: 5000 },
  ]);

  return (
    <div className="dashboard-container">
      
      {/* ------------------ 5 Stats Cards ------------------ */}
      <div className="stats-row stats-five">
        <StatsCard
          title="Net Profit"
          value={`$${stats.netProfit.toFixed(2)}`}
          icon={<FaDollarSign />}
        />
        <StatsCard
          title="Cumulative Profit"
          value={`$${stats.cumulativeNetProfit.toFixed(2)}`}
          icon={<FaChartBar />}
        />
        <StatsCard
          title="Win Rate"
          value={`${stats.winRate}%`}
          icon={<FaStar />}
        />
        <StatsCard
          title="Loss Rate"
          value={`${stats.lossRate}%`}
          icon={<FaChartLine />}
        />
        <StatsCard
          title="Total Trades"
          value={stats.totalTrades}
          icon={<FaChartLine />}
        />
      </div>

      {/* ------------------ Charts Row ------------------ */}
      <div className="dashboard-grid">
        <DailyProfitLineChart data={dailyProfit} />
        <ProfitBarChart data={dailyProfit} />
      </div>

      {/* ------------------ Symbols Table ------------------ */}
      <TradedSymbols symbols={symbols} />
    </div>
  );
};

export default Home;
