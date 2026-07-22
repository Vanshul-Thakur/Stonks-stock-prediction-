from sqlalchemy.orm import Session

from app.models.stock_price import StockPrice

def history_exists(db: Session, stock_id: int):

    return (
        db.query(StockPrice)
        .filter(StockPrice.stock_id == stock_id)
        .first()
    ) is not None

def save_prices(db: Session, stock_id: int, dataframe):

    prices = []

    for date, row in dataframe.iterrows():

        prices.append(
            StockPrice(
                stock_id=stock_id,
                date=date.date(),
                open=float(row["Open"]),
                high=float(row["High"]),
                low=float(row["Low"]),
                close=float(row["Close"]),
                volume=float(row["Volume"]),
            )
        )

    db.bulk_save_objects(prices)

    db.commit()



def get_stock_history(db, stock_id):
    return (
        db.query(StockPrice)
        .filter(StockPrice.stock_id == stock_id)
        .order_by(StockPrice.date)
        .all()
    )