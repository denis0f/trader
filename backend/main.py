from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
import crud
from crud import get_dashboard_data, get_bots, get_running_bots
from schemas import DashboardResponse, AccountOut, PositionOut, BotOut, RunningBotOut

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        Base.metadata.create_all(bind=engine)
        print("🚀 Backend started")
        yield
    finally:
        print("🛑 Backend stopped")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/dashboard", response_model=DashboardResponse)
def dashboard(db: Session = Depends(get_db)):
    return get_dashboard_data(db)

@app.get("/accounts", response_model=list[AccountOut])
def read_accounts():
    db = SessionLocal()
    accounts = crud.get_accounts(db)
    db.close()
    return accounts

@app.get("/journal/open", response_model=list[PositionOut])
def read_open_positions():
    db = SessionLocal()
    data = crud.get_open_positions(db)
    db.close()
    return data

@app.get("/journal/history", response_model=list[PositionOut])
def read_trade_history():
    db = SessionLocal()
    data = crud.get_closed_positions(db)
    db.close()
    return data

@app.get("/bots", response_model=list[BotOut])
def list_bots(db: Session = Depends(get_db)):
    return get_bots(db)


@app.get("/bots_running", response_model=list[RunningBotOut])
def running_bots(db: Session = Depends(get_db)):
    data = get_running_bots(db)

    # map SQLAlchemy models → schema-friendly dict
    return [
        {
            "id": b["id"],
            "name": b["name"],
            "description": b["description"],
            "positions": [
                {
                    "date": p["date"],
                    "symbol": p["symbol"],
                    "entry": float(p["entry"]),
                    "stopLoss": float(p["stop_loss"]) if p.get("stop_loss") else None,
                    "takeProfit": float(p["take_profit"]) if p.get("take_profit") else None,
                    "equity": float(p["equity"]),
                    "profit": float(p["profit"]),
                }
                for p in b["positions"]
            ],
        }
        for b in data
    ]



