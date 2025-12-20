from pydantic import BaseModel
from typing import List

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
