import yfinance as yf


def download_history(symbol: str, period="5y"):
    ticker = yf.Ticker(symbol)

    df = ticker.history(period=period)

    return df