import "./../../App.css";
import { useState } from "react";

interface NewsItem {
  title: string;
}

interface SymbolInsight {
  symbol: string;
  technical: string[];
  fundamental: string[];
}

/* ================= NEWS DATA ================= */

const highImpactNews: NewsItem[] = [
  { title: "US CPI Inflation Release" },
  { title: "FOMC Interest Rate Decision" },
];

const mediumImpactNews: NewsItem[] = [
  { title: "EU Manufacturing PMI" },
  { title: "UK Employment Data" },
];

const lowImpactNews: NewsItem[] = [
  { title: "Retail Sales Forecast" },
  { title: "Consumer Confidence Index" },
];

/* ================= AI DATA ================= */

const availableSymbols = ["EURUSD", "XAUUSD", "GBPUSD", "USDJPY", "BTCUSD"];

const insightsData: SymbolInsight[] = [
  {
    symbol: "EURUSD",
    technical: [
      "Price holding above key support zone",
      "Bullish momentum on H4 timeframe",
      "Potential breakout above resistance",
    ],
    fundamental: [
      "Euro supported by improving economic data",
      "USD strength capped ahead of CPI release",
    ],
  },
  {
    symbol: "XAUUSD",
    technical: [
      "Gold holding above 200 EMA",
      "Bullish structure remains intact",
    ],
    fundamental: [
      "Safe-haven demand remains elevated",
      "Rate cut expectations supporting gold",
    ],
  },
  {
    symbol: "GBPUSD",
    technical: [
      "Price rejecting resistance",
      "Bearish RSI divergence forming",
    ],
    fundamental: [
      "BoE uncertainty weighing on GBP",
      "USD remains range-bound",
    ],
  },
];

/* ================= COMPONENT ================= */

const AiInsights = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([
    "EURUSD",
    "XAUUSD",
  ]);

  const toggleSymbol = (symbol: string) => {
    setSelectedSymbols((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <div className="ai-container">
      {/* ================= News Calendar ================= */}
      <section className="ai-section">
        <h2 className="ai-header">News Calendar</h2>

        <div className="news-grid">
          <div className="news-card high">
            <h3>High Impact News</h3>
            <ul>
              {highImpactNews.map((news, i) => (
                <li key={i}>{news.title}</li>
              ))}
            </ul>
          </div>

          <div className="news-card medium">
            <h3>Medium Impact News</h3>
            <ul>
              {mediumImpactNews.map((news, i) => (
                <li key={i}>{news.title}</li>
              ))}
            </ul>
          </div>

          <div className="news-card low">
            <h3>Low Impact News</h3>
            <ul>
              {lowImpactNews.map((news, i) => (
                <li key={i}>{news.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= AI Insights ================= */}
      <section className="ai-section">
        <h2 className="ai-header">AI Insights</h2>

        {/* Dropdown with checkboxes */}
        <div className="symbol-dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Select Symbols
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {availableSymbols.map((symbol) => (
                <label key={symbol} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={selectedSymbols.includes(symbol)}
                    onChange={() => toggleSymbol(symbol)}
                  />
                  {symbol}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Insights Grid */}
        <div className="ai-insights-grid">
          {insightsData
            .filter((item) => selectedSymbols.includes(item.symbol))
            .map((item) => (
              <div key={item.symbol} className="ai-insight-card">
                <h3 className="symbol-title">{item.symbol}</h3>

                <div className="ai-block">
                  <h4>Technical Overview</h4>
                  <ul>
                    {item.technical.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="ai-block">
                  <h4>Fundamental Overview</h4>
                  <ul>
                    {item.fundamental.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default AiInsights;
