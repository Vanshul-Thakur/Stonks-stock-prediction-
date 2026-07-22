from datetime import date, datetime
from decimal import Decimal  # 1. Import Decimal
from uuid import UUID

from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String, func  # 2. Import Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id: Mapped[int] = mapped_column(primary_key=True)

    profile_id: Mapped[UUID] = mapped_column(ForeignKey("profiles.id"))

    stock_id: Mapped[int] = mapped_column(ForeignKey("stocks.id"))

    model_name: Mapped[str] = mapped_column(String(50))

    target_date: Mapped[date] = mapped_column(Date)

    # 3. Update types for financial data
    predicted_price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    
    actual_price: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)
    
    confidence: Mapped[Decimal | None] = mapped_column(Numeric(5, 4), nullable=True) 
    # Using Numeric(5, 4) for confidence to allow values like 0.9876 (high precision for 0-1 range)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    profile = relationship("Profile", back_populates="predictions")

    stock = relationship("Stock", back_populates="predictions")



    history: Mapped[list["PredictionHistory"]] = relationship(
        back_populates="prediction",
        cascade="all, delete-orphan"
    )   