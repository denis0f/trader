from sqlalchemy.orm import Session
from sqlalchemy import func
from models import Account, Position

def get_dashboard_data(db: Session):
    # Stats
    stats_query = db.query(
        func.sum(Position.profit).label("net_profit"),
        func.count(Position.id).label("total_trades"),
        (func.count(Position.id).filter(Position.profit > 0) * 100.0 / func.count(Position.id)).label("win_rate"),
        (func.count(Position.id).filter(Position.profit < 0) * 100.0 / func.count(Position.id)).label("loss_rate")
    ).filter(Position.is_open == False).one()

    # Cumulative profit
    cumulative = db.query(func.sum(Position.profit)).filter(Position.is_open == False).scalar() or 0

    # Daily profit
    daily_profit = (
        db.query(
            Position.date.label("date"),
            func.sum(Position.profit).label("profit")
        )
        .filter(Position.is_open == False)
        .group_by(Position.date)
        .order_by(Position.date)
        .all()
    )

    # Symbols
    symbols = (
        db.query(
            Position.symbol.label("name"),
            func.count(Position.id).label("trades"),
            func.sum(Position.profit).label("profit")
        )
        .filter(Position.is_open == False)
        .group_by(Position.symbol)
        .all()
    )

    # Accounts performance
    accounts = db.query(
        Account.name.label("account"),
        ((Account.equity - Account.balance) * 100.0 / Account.balance).label("pl_percent")
    ).all()

    return {
        "stats": {
            "netProfit": float(stats_query.net_profit or 0),
            "cumulativeNetProfit": float(cumulative),
            "winRate": float(stats_query.win_rate or 0),
            "lossRate": float(stats_query.loss_rate or 0),
            "totalTrades": stats_query.total_trades,
        },
        "dailyProfit": [{"date": d.date, "profit": float(d.profit)} for d in daily_profit],
        "accountPerformance": [{"account": a.account, "plPercent": float(a.pl_percent)} for a in accounts],
        "symbols": [{"name": s.name, "trades": s.trades, "profit": float(s.profit)} for s in symbols],
    }


def get_accounts(db: Session):
    return db.query(Account).all()


def get_open_positions(db: Session):
    return db.query(Position).filter(Position.is_open == True).all()


def get_closed_positions(db: Session):
    return db.query(Position).filter(Position.is_open == False).all()
