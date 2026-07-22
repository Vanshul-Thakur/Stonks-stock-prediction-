from pydantic import BaseModel


class StockBase(BaseModel):
    symbol: str
    company_name: str
    exchange: str


class StockCreate(StockBase):
    pass


class StockResponse(StockBase):
    id: int

    model_config = {
        "from_attributes": True
    }