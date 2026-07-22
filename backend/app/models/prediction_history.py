from datetime import datetime
from decimal import Decimal  # 1. Import Decimal for type hinting

from sqlalchemy import DateTime, Numeric, ForeignKey, func  # 2. Import Numeric instead of Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id: Mapped[int] = mapped_column(primary_key=True)

    prediction_id: Mapped[int] = mapped_column(
        ForeignKey("predictions.id")
    )

    # 3. Change type hint to Decimal and column type to Numeric(5, 2)
    # Numeric(5, 2) allows values like 999.99 (3 digits before, 2 after)
    # Adjust precision/scale if you need larger percentages (e.g., Numeric(6, 3))
    error_percentage: Mapped[Decimal] = mapped_column(Numeric(5, 2))

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    prediction = relationship(
        "Prediction",
        back_populates="history"
    )   