from datetime import date
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
from models import Account, Trade

def seed():
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()

    try:
        # ---- Clear existing data (optional) ----
        db.query(Trade).delete()
        db.query(Account).delete()

        # ---- Accounts ----
        accounts = [
            Account(
                id=101,
                name="Main Trading Account",
                broker="IC Markets",
                balance=12000,
                equity=12480,
            ),
            Account(
                id=102,
                name="Swing Account",
                broker="Pepperstone",
                balance=8500,
                equity=8320,
            ),
            Account(
                id=103,
                name="Scalping Account",
                broker="Exness",
                balance=5000,
                equity=5175,
            ),
            Account(
                id=104,
                name="Crypto Account",
                broker="Binance",
                balance=15000,
                equity=14820,
            ),
            Account(
                id=105,
                name="Evaluation Account",
                broker="FTMO",
                balance=100000,
                equity=100950,
            ),
        ]

        db.add_all(accounts)
        db.flush()  # ensures FK safety

        # ---- Trades ----
        trades = [
            Trade(account_id=101, symbol="AAPL", trade_date=date(2025, 12, 1), profit=500),
            Trade(account_id=101, symbol="AAPL", trade_date=date(2025, 12, 2), profit=-200),
            Trade(account_id=102, symbol="TSLA", trade_date=date(2025, 12, 3), profit=300),
            Trade(account_id=103, symbol="EUR/USD", trade_date=date(2025, 12, 4), profit=400),
            Trade(account_id=104, symbol="BTC/USD", trade_date=date(2025, 12, 5), profit=1200),
            Trade(account_id=104, symbol="BTC/USD", trade_date=date(2025, 12, 6), profit=-500),
            Trade(account_id=105, symbol="NASDAQ", trade_date=date(2025, 12, 7), profit=950),
        ]

        db.add_all(trades)

        db.commit()
        print("✅ Database seeded successfully!")

    except Exception as e:
        db.rollback()
        print("❌ Seeding failed:", e)
    finally:
        db.close()


if __name__ == "__main__":
    seed()
