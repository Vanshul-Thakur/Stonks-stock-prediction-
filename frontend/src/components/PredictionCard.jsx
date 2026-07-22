function PredictionCard({ prediction }) {

    if (!prediction) return null;

    return (

        <div className="mx-auto w-full max-w-4xl border-2 border-black bg-white p-6">

            <h2 className="text-2xl font-bold mb-4">
                Prediction
            </h2>

            {
                Array.isArray(prediction)

                    ?

                    <div>

                        <p className="mb-3 font-semibold">
                            Next 30 Days
                        </p>

                        <div className="grid grid-cols-3 gap-4">

                            <div>

                                <p className="text-gray-500">
                                    Highest
                                </p>

                                <p className="text-xl font-bold">

                                    $
                                    {Math.max(...prediction).toFixed(2)}

                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Lowest
                                </p>

                                <p className="text-xl font-bold">

                                    $
                                    {Math.min(...prediction).toFixed(2)}

                                </p>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Average
                                </p>

                                <p className="text-xl font-bold">

                                    $

                                    {(
                                        prediction.reduce((a, b) => a + b, 0)
                                        /
                                        prediction.length
                                    ).toFixed(2)}

                                </p>

                            </div>

                        </div>

                    </div>

                    :

                    <div>

                        <p className="text-gray-500">
                            Tomorrow's Price
                        </p>

                        <p className="text-5xl font-bold mt-2">

                            ${prediction.toFixed(2)}

                        </p>

                    </div>

            }

        </div>

    );

}

export default PredictionCard;