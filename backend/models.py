from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey
from database import Base

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    broker = Column(String, nullable=False)
    balance = Column(Numeric, nullable=False)
    equity = Column(Numeric, nullable=False)


class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    symbol = Column(String, nullable=False)
    trade_date = Column(Date, nullable=False)
    profit = Column(Numeric, nullable=False)
