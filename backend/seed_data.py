from database import SessionLocal
from models import Account

def seed_accounts():
    db = SessionLocal()

    if db.query(Account).count() > 0:
        print("Accounts already seeded")
        db.close()
        return

    accounts = [
        Account(id=101, name="Main Trading Account", broker="IC Markets", balance=12000, equity=12480),
        Account(id=102, name="Swing Account", broker="Pepperstone", balance=8500, equity=8320),
        Account(id=103, name="Scalping Account", broker="Exness", balance=5000, equity=5175),
        Account(id=104, name="Crypto Account", broker="Binance", balance=15000, equity=14820),
        Account(id=105, name="Evaluation Account", broker="FTMO", balance=100000, equity=100950),
    ]

    db.add_all(accounts)
    db.commit()
    db.close()
    print("✅ Accounts seeded")

if __name__ == "__main__":
    seed_accounts()
