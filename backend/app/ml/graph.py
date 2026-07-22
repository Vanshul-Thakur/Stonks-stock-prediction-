import matplotlib.pyplot as plt


def save_graph(actual, predicted):

    plt.figure(figsize=(12,6))

    plt.plot(actual)

    plt.plot(predicted)

    plt.legend([
        "Actual",
        "Predicted"
    ])

    plt.savefig("prediction.png")

    plt.close()