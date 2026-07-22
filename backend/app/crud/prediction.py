from sqlalchemy.orm import Session

from app.models.prediction import Prediction


def save_prediction(
    db: Session,
    stock_id: int,
    predicted_price: float,
    model_name: str
):

    prediction = Prediction(
        stock_id=stock_id,
        predicted_price=predicted_price,
        model_name=model_name
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return prediction