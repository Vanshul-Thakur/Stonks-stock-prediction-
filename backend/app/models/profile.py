from datetime import datetime
from uuid import UUID

from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[UUID] = mapped_column(primary_key=True)

    username: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False
    )

    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    avatar_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # Relationships moved inside the class body
    watchlists: Mapped[list["Watchlist"]] = relationship(
        back_populates="profile",
        cascade="all, delete-orphan"
    )

    predictions: Mapped[list["Prediction"]] = relationship(
        back_populates="profile",
        cascade="all, delete-orphan"
    )

    search_history: Mapped[list["SearchHistory"]] = relationship(
        back_populates="profile",
        cascade="all, delete-orphan"
    )   