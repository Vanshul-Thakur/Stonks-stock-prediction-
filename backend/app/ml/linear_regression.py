import os
import joblib

from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

from app.ml.preprocess import load_stock_data, prepare_data


def train_model(db, stock_id):

    df = load_stock_data(db, stock_id)

    X, y = prepare_data(df)

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        shuffle=False
    )

    model = LinearRegression()

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    mse = mean_squared_error(y_test, predictions)

    r2 = r2_score(y_test, predictions)

    os.makedirs("app/ml/models", exist_ok=True)

    joblib.dump(
        model,
        f"app/ml/models/{stock_id}.pkl"
    )

    return {
        "mse": mse,
        "r2": r2
    }