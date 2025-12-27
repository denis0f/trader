from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
import crud
from crud import get_dashboard_data
from schemas import DashboardResponse, AccountOut, PositionOut

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



