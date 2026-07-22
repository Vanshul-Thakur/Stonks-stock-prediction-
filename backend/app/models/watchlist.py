from datetime import datetime
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Watchlist(Base):
    __tablename__ = "watchlists"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    profile_id: Mapped[UUID] = mapped_column(
        ForeignKey("profiles.id"),
        nullable=False
    )

    stock_id: Mapped[int] = mapped_column(
        ForeignKey("stocks.id"),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    profile = relationship(
        "Profile",
        back_populates="watchlists"
    )

    stock = relationship(
        "Stock",
        back_populates="watchlists"
    )   