import os
from app.utils.logo import get_logo_url
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.crud.stock import create_stock, get_stock_by_symbol
from app.services.yahoo import get_stock_info

from app.services.history import download_history
from app.crud.stock_price import save_prices

from app.ml.linear_regression import train_model
from app.ml.predict import predict

from app.ml.lstm import train_lstm
from app.ml.predict_lstm import predict_next_days

from app.crud.stock_price import save_prices, history_exists

from app.crud.prediction import save_prediction
from app.services.trending import get_trending_stocks

from app.crud.stock_price import (
    save_prices,
    history_exists,
    get_stock_history
)


router = APIRouter(
    prefix="/stocks",
    tags=["Stocks"]
)

@router.get("/")
def read_stocks(db: Session = Depends(get_db)):
    return []




@router.get("/search/{symbol}")
def search_stock(symbol: str, db: Session = Depends(get_db)):

    # Live data from Yahoo
    stock_data = get_stock_info(symbol)

    if stock_data is None:
        raise HTTPException(
            status_code=404,
            detail="Stock not found"
        )

    # Check database
    stock = get_stock_by_symbol(db, symbol)

    # Save company info only once
    if not stock:
        stock = create_stock(
            db,
            {
                "symbol": stock_data["symbol"],
                "company_name": stock_data["company_name"],
                "exchange": stock_data["exchange"],
                "sector": stock_data["sector"],
                "industry": stock_data["industry"],
                "website": stock_data["website"],
            }
        )
    logo_url = get_logo_url(stock.website)
    # Return DB + Live Data
    return {
        "id": stock.id,
        "symbol": stock.symbol,
        "company_name": stock.company_name,
        "exchange": stock.exchange,
        "sector": stock.sector,
        "industry": stock.industry,
        "logo_url": logo_url,

        "current_price": stock_data["current_price"],
        "change": stock_data["change"],
        "change_percent": stock_data["change_percent"],
        "market_status": stock_data["market_status"],
    }



@router.get("/{symbol}/history")
def get_history(symbol: str, db: Session = Depends(get_db)):

    stock = get_stock_by_symbol(db, symbol)

    if not stock:
        raise HTTPException(
            status_code=404,
            detail="Stock not found."
        )

    if history_exists(db, stock.id):
        return {
            "message": "Historical data already exists."
        }

    df = download_history(symbol)

    save_prices(db, stock.id, df)

    return {
        "message": "Historical data downloaded.",
        "rows": len(df)
    }


@router.post("/{symbol}/train")
def train(symbol: str, db: Session = Depends(get_db)):

    stock = get_stock_by_symbol(db, symbol)

    if not stock:
        raise HTTPException(404, "Stock not found")

    metrics = train_model(db, stock.id)

    return {
        "message": "Model trained successfully",
        "metrics": metrics
    }

@router.post("/{symbol}/train-lstm")
def train_lstm_model(
    symbol: str,
    db: Session = Depends(get_db)
):

    stock = get_stock_by_symbol(db, symbol)

    if not stock:
        raise HTTPException(
            status_code=404,
            detail="Stock not found"
        )

    result = train_lstm(
        db,
        stock.id
    )

    return {
        "message": "LSTM model trained successfully",
        "details": result
    }

@router.get("/{symbol}/predict/{day}")
def predict_price(symbol: str, day: int, db: Session = Depends(get_db)):

    stock = get_stock_by_symbol(db, symbol)

    if not stock:
        raise HTTPException(404, "Stock not found")

    price = predict(stock.id, day)

    return {
        "predicted_price": price
    }

@router.get("/{symbol}/predict-lstm/{days}")
def predict_lstm_days(
    symbol: str,
    days: int,
    db: Session = Depends(get_db)
):

    stock = get_stock_by_symbol(db, symbol)

    model_path = f"app/ml/models/lstm_{stock.id}.keras"

    if not os.path.exists(model_path):
        train_lstm(db, stock.id)

    predictions = predict_next_days(
        db,
        stock.id,
        days
    )
    # commented it because, dont want to store the lstm prediction in db for now.
    # for price in predictions:

    #     save_prediction(
    #         db,
    #         stock.id,
    #         price,
    #         "LSTM"
    #     )

    return {
        "symbol": symbol,
        "days": days,
        "predictions": predictions
    }

@router.get("/{symbol}/prediction-history")
def prediction_history(
    symbol: str,
    db: Session = Depends(get_db)
):

    stock = get_stock_by_symbol(db, symbol)

    if not stock:
        raise HTTPException(
            status_code=404,
            detail="Stock not found"
        )

    return stock.predictions



@router.get("/{symbol}/history-data")
def history_data(
    symbol: str,
    db: Session = Depends(get_db)
):

    stock = get_stock_by_symbol(db, symbol)

    if not stock:
        raise HTTPException(
            status_code=404,
            detail="Stock not found"
        )

    history = get_stock_history(db, stock.id)

    return [
        {
            "date": price.date,
            "close": price.close
        }
        for price in history
    ]


@router.get("/trending")
def trending():

    return get_trending_stocks()