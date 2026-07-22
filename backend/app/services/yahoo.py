import yfinance as yf


def get_stock_info(symbol: str):
    ticker = yf.Ticker(symbol.upper())

    # Check if the ticker has any historical data
    history = ticker.history(period="1d")

    if history.empty:
        return None

    info = ticker.info

    #current market data
    current_price = info.get("currentPrice")
    previous_close = info.get("previousClose")

    change = None
    change_percent = None

    if current_price is not None and previous_close is not None:
        change = round(current_price - previous_close, 2)
        change_percent = round((change / previous_close) * 100, 2)


    website = info.get("website")
    if website:
        website = (
            website.replace("https://", "")
                .replace("http://", "")
                .rstrip("/")
        )


    return {
        "symbol": symbol.upper(),
        "company_name": info.get("longName"),
        "exchange": info.get("exchange"),
        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "website": info.get("website"),

        "current_price": current_price,
        "change": change,
        "change_percent": change_percent,

        "market_status": (
            "Open"
            if info.get("marketState") == "REGULAR"
            else "Closed"
        )
}