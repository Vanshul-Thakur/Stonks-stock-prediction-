import pandas as pd
from sqlalchemy.orm import Session

from app.models.stock_price import StockPrice


def load_stock_data(db: Session, stock_id: int):

    prices = (
        db.query(StockPrice)
        .filter(StockPrice.stock_id == stock_id)
        .order_by(StockPrice.date)
        .all()
    )

    data = pd.DataFrame([
        {
            "date": p.date,
            "close": p.close
        }
        for p in prices
    ])

    return data

#feature engineering

def prepare_data(df):

    df = df.copy()

    df["day"] = range(len(df))

    X = df[["day"]]

    y = df["close"]

    return X, y