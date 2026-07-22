import joblib
import numpy as np

from tensorflow.keras.models import load_model

from app.ml.preprocess import load_stock_data


LOOKBACK = 60


def predict_next_days(db, stock_id, days):

    model = load_model(
        f"app/ml/models/lstm_{stock_id}.keras"
    )

    scaler = joblib.load(
        f"app/ml/models/scaler_{stock_id}.pkl"
    )

    df = load_stock_data(db, stock_id)

    prices = df["close"].values.reshape(-1, 1)

    scaled = scaler.transform(prices)

    sequence = scaled[-LOOKBACK:]

    predictions = []

    for _ in range(days):

        X = np.expand_dims(sequence, axis=0)

        pred = model.predict(X, verbose=0)

        predicted_price = scaler.inverse_transform(pred)[0][0]

        predictions.append(float(predicted_price))

        sequence = np.vstack((sequence[1:], pred))

    return predictions