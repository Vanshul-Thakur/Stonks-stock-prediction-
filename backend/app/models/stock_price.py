from __future__ import annotations

from datetime import date

from sqlalchemy import Date, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class StockPrice(Base):
    __tablename__ = "stock_prices"

    id: Mapped[int] = mapped_column(primary_key=True)

    stock_id: Mapped[int] = mapped_column(
        ForeignKey("stocks.id"),
        nullable=False
    )

    date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    open: Mapped[float] = mapped_column(Float)

    high: Mapped[float] = mapped_column(Float)

    low: Mapped[float] = mapped_column(Float)

    close: Mapped[float] = mapped_column(Float)

    volume: Mapped[float] = mapped_column(Float)

    stock: Mapped["Stock"] = relationship(
        back_populates="prices"
    )