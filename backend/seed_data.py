from database import SessionLocal
from models import Position

def seed_positions():
    db = SessionLocal()
    try:
        positions = [
            # ----- OPEN POSITIONS (4) -----
            Position(date="2025-01-12 (Mon)", symbol="EURUSD", entry=1.09230, exit=None, stop_loss=1.08800, take_profit=1.10000, equity=12500, profit=230, status="Running", is_open=True, account_id=101),
            Position(date="2025-01-13 (Tue)", symbol="BTCUSD", entry=42850, exit=None, stop_loss=42000, take_profit=44500, equity=12500, profit=-180, status="Running", is_open=True, account_id=101),
            Position(date="2025-01-14 (Wed)", symbol="XAUUSD", entry=2032.50, exit=None, stop_loss=2015.00, take_profit=2060.00, equity=12500, profit=340, status="Running", is_open=True, account_id=102),
            Position(date="2025-01-15 (Thu)", symbol="NAS100", entry=16850, exit=None, stop_loss=16700, take_profit=17100, equity=12500, profit=410, status="Running", is_open=True, account_id=102),

            # ----- TRADE HISTORY (10) -----
            Position(date="2025-01-01 (Mon)", symbol="GBPUSD", entry=1.2710, exit=1.2785, stop_loss=1.2650, take_profit=1.2800, equity=12000, profit=350, status="Win", is_open=False, account_id=101),
            Position(date="2025-01-02 (Tue)", symbol="NAS100", entry=16850, exit=16720, stop_loss=16950, take_profit=16500, equity=12000, profit=-260, status="Loss", is_open=False, account_id=101),
            Position(date="2025-01-03 (Wed)", symbol="EURUSD", entry=1.0800, exit=1.0860, stop_loss=1.0750, take_profit=1.0900, equity=12120, profit=120, status="Win", is_open=False, account_id=101),
            Position(date="2025-01-04 (Thu)", symbol="USDJPY", entry=146.20, exit=147.80, stop_loss=145.50, take_profit=148.00, equity=12280, profit=160, status="Win", is_open=False, account_id=102),
            Position(date="2025-01-05 (Fri)", symbol="BTCUSD", entry=42000, exit=41000, stop_loss=42500, take_profit=40000, equity=11280, profit=-1000, status="Loss", is_open=False, account_id=102),
            Position(date="2025-01-06 (Mon)", symbol="ETHUSD", entry=2250, exit=2350, stop_loss=2200, take_profit=2400, equity=11380, profit=100, status="Win", is_open=False, account_id=101),
            Position(date="2025-01-07 (Tue)", symbol="XAUUSD", entry=2000, exit=2020, stop_loss=1980, take_profit=2030, equity=11580, profit=200, status="Win", is_open=False, account_id=101),
            Position(date="2025-01-08 (Wed)", symbol="US30", entry=37000, exit=36800, stop_loss=37200, take_profit=36500, equity=11380, profit=-200, status="Loss", is_open=False, account_id=102),
            Position(date="2025-01-09 (Thu)", symbol="AUDUSD", entry=0.6650, exit=0.6720, stop_loss=0.6600, take_profit=0.6750, equity=11450, profit=70, status="Win", is_open=False, account_id=102),
            Position(date="2025-01-10 (Fri)", symbol="NZDUSD", entry=0.6100, exit=0.6050, stop_loss=0.6150, take_profit=0.6000, equity=11400, profit=-50, status="Loss", is_open=False, account_id=101),
        ]

        db.add_all(positions)
        db.commit()
        print("✅ Positions seeded successfully")
    except Exception as e:
        db.rollback()
        print("❌ Error seeding positions:", e)
    finally:
        db.close()

if __name__ == "__main__":
    seed_positions()
