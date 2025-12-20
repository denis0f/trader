import React, { useEffect, useState } from "react";
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
  Cell,
} from "recharts";
import { FaChartLine, FaDollarSign, FaStar, FaChartBar } from "react-icons/fa";
import axios from "axios";
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

interface AccountPerformanceData {
  account: string;
  plPercent: number;
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

/* --- Account Performance Bar Chart --- */
interface AccountPerformanceProps {
  data: AccountPerformanceData[];
}

const AccountPerformanceBarChart = ({ data }: AccountPerformanceProps) => (
  <div className="chart-box full-width">
    <h3>Account Performance (%)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="account" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="plPercent">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.plPercent >= 0 ? "#008f0a" : "#ff5c5c"}
            />
          ))}
        </Bar>
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
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [dailyProfit, setDailyProfit] = useState<DailyProfitData[]>([]);
  const [accountPerformance, setAccountPerformance] =
    useState<AccountPerformanceData[]>([]);
  const [symbols, setSymbols] = useState<SymbolData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard")
      .then((res) => {
        setStats(res.data.stats);
        setDailyProfit(res.data.dailyProfit);
        setAccountPerformance(res.data.accountPerformance);
        setSymbols(res.data.symbols);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* ------------------ Stats Cards ------------------ */}
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

      {/* ------------------ Charts ------------------ */}
      <div className="dashboard-grid">
        <DailyProfitLineChart data={dailyProfit} />
        <ProfitBarChart data={dailyProfit} />
      </div>

      {/* ------------------ Account Performance ------------------ */}
      <AccountPerformanceBarChart data={accountPerformance} />

      {/* ------------------ Symbols Table ------------------ */}
      <TradedSymbols symbols={symbols} />
    </div>
  );
};

export default Home;
