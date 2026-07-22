from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Stock(Base):
    __tablename__ = "stocks"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    symbol: Mapped[str] = mapped_column(
        String(10),
        unique=True,
        nullable=False
    )

    company_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    exchange: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    sector: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    industry: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    # Relationships moved inside the class body
    watchlists: Mapped[list["Watchlist"]] = relationship(
        back_populates="stock",
        cascade="all, delete-orphan"
    )

    predictions: Mapped[list["Prediction"]] = relationship(
        back_populates="stock",
        cascade="all, delete-orphan"
    )

    prices: Mapped[list["StockPrice"]] = relationship(
        back_populates="stock",
        cascade="all, delete-orphan"
    )   

    website: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )