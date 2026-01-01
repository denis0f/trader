from pydantic import BaseModel
from typing import List, Optional

class DashboardStats(BaseModel):
    netProfit: float
    cumulativeNetProfit: float
    winRate: float
    totalTrades: int
    lossRate: float


class DailyProfit(BaseModel):
    date: str
    profit: float


class AccountPerformance(BaseModel):
    account: str
    plPercent: float


class SymbolStats(BaseModel):
    name: str
    trades: int
    profit: float


class DashboardResponse(BaseModel):
    stats: DashboardStats
    dailyProfit: List[DailyProfit]
    accountPerformance: List[AccountPerformance]
    symbols: List[SymbolStats]


class AccountOut(BaseModel):
    id: int
    name: str
    broker: str
    balance: float
    equity: float

    class Config:
        from_attributes = True

class PositionOut(BaseModel):
    id: int
    date: str
    symbol: str
    entry: float
    exit: Optional[float]
    stop_loss: Optional[float]
    take_profit: Optional[float]
    equity: float
    profit: float
    status: str
    is_open: bool
    account_id: int

    class Config:
        from_attributes = True

class BotOut(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        from_attributes = True

class BotPositionOut(BaseModel):
    date: str
    symbol: str
    entry: float
    stopLoss: Optional[float]  # note: camelCase matches dict keys
    takeProfit: Optional[float]
    equity: float
    profit: float

    class Config:
        from_attributes = True  # allows Pydantic to read from object attributes or dict keys

class RunningBotOut(BaseModel):
    id: int
    name: str
    description: str
    positions: List[BotPositionOut]

    class Config:
        from_attributes = True