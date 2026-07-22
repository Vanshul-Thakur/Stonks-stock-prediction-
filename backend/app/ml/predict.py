import joblib


def predict(stock_id, day):

    model = joblib.load(
        f"app/ml/models/{stock_id}.pkl"
    )

    prediction = model.predict([[day]])

    return float(prediction[0])