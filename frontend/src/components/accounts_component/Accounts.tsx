import "./../../App.css";

interface Account {
  id: number;
  name: string;
  broker: string;
  balance: number;
  equity: number;
}

const accounts: Account[] = [
  {
    id: 101,
    name: "Main Trading Account",
    broker: "IC Markets",
    balance: 12000,
    equity: 12480,
  },
  {
    id: 102,
    name: "Swing Account",
    broker: "Pepperstone",
    balance: 8500,
    equity: 8320,
  },
  {
    id: 103,
    name: "Scalping Account",
    broker: "Exness",
    balance: 5000,
    equity: 5175,
  },
  {
    id: 104,
    name: "Crypto Account",
    broker: "Binance",
    balance: 15000,
    equity: 14820,
  },
  {
    id: 105,
    name: "Evaluation Account",
    broker: "FTMO",
    balance: 100000,
    equity: 100950,
  },
];

const Accounts = () => {
  const calculatePLPercent = (balance: number, equity: number) => {
    const diff = equity - balance;
    return ((diff / balance) * 100).toFixed(2);
  };

  return (
    <div className="accounts-container">
      <h2 className="accounts-header">My Accounts</h2>

      <table className="accounts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Account Name</th>
            <th>Broker</th>
            <th>Balance</th>
            <th>Equity</th>
            <th>P/L (%)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => {
            const plPercent = calculatePLPercent(
              account.balance,
              account.equity
            );

            const isProfit = account.equity >= account.balance;

            return (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.name}</td>
                <td>{account.broker}</td>
                <td>${account.balance.toLocaleString()}</td>
                <td className={isProfit ? "profit" : "loss"}>
                  ${account.equity.toLocaleString()}
                </td>
                <td className={isProfit ? "profit" : "loss"}>
                  <span className={`pl-arrow ${isProfit ? "up" : "down"}`}>
                    {isProfit ? "▲" : "▼"}
                  </span>
                  {isProfit ? "+" : ""}
                  {plPercent}%
                </td>
                <td className="actions-cell">
                  <button className="btn use-btn">Use</button>
                  <button className="btn close-btn">Close All Positions</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
