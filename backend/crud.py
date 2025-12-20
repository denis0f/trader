from sqlalchemy.orm import Session
from sqlalchemy import text

def get_dashboard_data(db: Session):
    stats = db.execute(text("""
        SELECT
            SUM(profit) AS net_profit,
            COUNT(*) AS total_trades,
            COUNT(*) FILTER (WHERE profit > 0) * 100.0 / COUNT(*) AS win_rate,
            COUNT(*) FILTER (WHERE profit < 0) * 100.0 / COUNT(*) AS loss_rate
        FROM trades;
    """)).fetchone()

    cumulative = db.execute(text("""
        SELECT
            SUM(profit) OVER (ORDER BY trade_date) AS cumulative_profit
        FROM trades
        ORDER BY trade_date DESC
        LIMIT 1;
    """)).fetchone()

    daily_profit = db.execute(text("""
        SELECT trade_date AS date, SUM(profit) AS profit
        FROM trades
        GROUP BY trade_date
        ORDER BY trade_date;
    """)).fetchall()

    symbols = db.execute(text("""
        SELECT symbol AS name, COUNT(*) AS trades, SUM(profit) AS profit
        FROM trades
        GROUP BY symbol;
    """)).fetchall()

    accounts = db.execute(text("""
        SELECT
            name AS account,
            (equity - balance) * 100.0 / balance AS pl_percent
        FROM accounts;
    """)).fetchall()

    return {
        "stats": {
            "netProfit": float(stats.net_profit),
            "cumulativeNetProfit": float(cumulative.cumulative_profit),
            "winRate": float(stats.win_rate),
            "lossRate": float(stats.loss_rate),
            "totalTrades": stats.total_trades,
        },
        "dailyProfit": [
            {"date": str(d.date), "profit": float(d.profit)} for d in daily_profit
        ],
        "accountPerformance": [
            {"account": a.account, "plPercent": float(a.pl_percent)} for a in accounts
        ],
        "symbols": [
            {"name": s.name, "trades": s.trades, "profit": float(s.profit)} for s in symbols
        ],
    }
