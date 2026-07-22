from datetime import datetime
from decimal import Decimal  # 1. Import Decimal for Python type hinting

from sqlalchemy import DateTime, Numeric, String, func  # 2. Import Numeric instead of Float
from sqlalchemy.orm import Mapped, mapped_column

from app.database.database import Base


class ModelMetric(Base):
    __tablename__ = "model_metrics"

    id: Mapped[int] = mapped_column(primary_key=True)
    model_name: Mapped[str] = mapped_column(String(50))

    # 3. Change type hint to Decimal and column type to Numeric(10, 2)
    rmse: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    mae: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    accuracy: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    
    # Example for predicted_price/actual_price if you add them later:
    # predicted_price: Mapped[Decimal] = mapped_column(Numeric(10, 2))

    trained_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )   