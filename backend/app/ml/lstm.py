import os
import joblib
import numpy as np

from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Input
from tensorflow.keras.callbacks import EarlyStopping

from app.ml.preprocess import load_stock_data


LOOKBACK = 60


def create_sequences(data):
    X = []
    y = []

    for i in range(LOOKBACK, len(data)):
        X.append(data[i - LOOKBACK:i])
        y.append(data[i])

    return np.array(X), np.array(y)


def train_lstm(db, stock_id):

    df = load_stock_data(db, stock_id)

    prices = df["close"].values.reshape(-1, 1)

    scaler = MinMaxScaler(feature_range=(0, 1))

    scaled = scaler.fit_transform(prices)

    split = int(len(scaled) * 0.8)

    train = scaled[:split]
    test = scaled[split - LOOKBACK:]

    X_train, y_train = create_sequences(train)
    X_test, y_test = create_sequences(test)

    model = Sequential([
        Input(shape=(LOOKBACK, 1)),
        LSTM(128, return_sequences=True),
        Dropout(0.2),

        LSTM(64),
        Dropout(0.2),

        Dense(25, activation="relu"),
        Dense(1)
    ])

    model.compile(
        optimizer="adam",
        loss="mse",
        metrics=["mae"]
    )

    early_stop = EarlyStopping(
        monitor="val_loss",
        patience=10,
        restore_best_weights=True
    )

    history = model.fit(
        X_train,
        y_train,
        validation_data=(X_test, y_test),
        epochs=100,
        batch_size=32,
        callbacks=[early_stop],
        verbose=1
    )

    os.makedirs("app/ml/models", exist_ok=True)

    model.save(
        f"app/ml/models/lstm_{stock_id}.keras"
    )

    joblib.dump(
        scaler,
        f"app/ml/models/scaler_{stock_id}.pkl"
    )

    predictions = model.predict(X_test, verbose=0)

    predictions = scaler.inverse_transform(predictions)

    actual = scaler.inverse_transform(y_test.reshape(-1, 1))

    mae = mean_absolute_error(actual, predictions)
    rmse = np.sqrt(mean_squared_error(actual, predictions))
    r2 = r2_score(actual, predictions)

    return {
        "epochs": len(history.history["loss"]),
        "MAE": float(mae),
        "RMSE": float(rmse),
        "R2": float(r2)
    }