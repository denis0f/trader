from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey, Boolean
from database import Base
from sqlalchemy.orm import relationship

class Position(Base):
    __tablename__ = "positions"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    symbol = Column(String, nullable=False)

    entry = Column(Numeric(12, 5), nullable=False)
    exit = Column(Numeric(12, 5), nullable=True)

    stop_loss = Column(Numeric(12, 5), nullable=True)
    take_profit = Column(Numeric(12, 5), nullable=True)

    equity = Column(Numeric(12, 2), nullable=False)
    profit = Column(Numeric(12, 2), nullable=False)

    status = Column(String, nullable=False)  # "Win" | "Loss"
    is_open = Column(Boolean, default=True)

    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    bot_name = Column(String, nullable=True)


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

class Bot(Base):
    __tablename__ = "bots"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=False)


