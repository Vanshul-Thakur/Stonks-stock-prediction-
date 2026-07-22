from sqlalchemy.orm import Session

from app.models.stock import Stock


def get_all_stocks(db: Session):
    return db.query(Stock).all()


def get_stock_by_symbol(db: Session, symbol: str):
    return (
        db.query(Stock)
        .filter(Stock.symbol == symbol.upper())
        .first()
    )


def create_stock(db: Session, stock_data: dict):

    stock = Stock(
        symbol=stock_data["symbol"],
        company_name=stock_data["company_name"],
        exchange=stock_data["exchange"],
        sector=stock_data["sector"],
        industry=stock_data["industry"],
        website=stock_data["website"]
    )

    db.add(stock)
    db.commit()
    db.refresh(stock)

    return stock