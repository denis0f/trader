import { useEffect, useState } from "react";
import axios from "axios";
import "./../../App.css";

interface Account {
  id: number;
  name: string;
  broker: string;
  balance: number;
  equity: number;
}

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Account[]>("http://127.0.0.1:8000/accounts")
      .then((res) => setAccounts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const calculatePLPercent = (balance: number, equity: number) => {
    const diff = equity - balance;
    return ((diff / balance) * 100).toFixed(2);
  };

  if (loading) {
    return <div className="accounts-container">Loading...</div>;
  }

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
