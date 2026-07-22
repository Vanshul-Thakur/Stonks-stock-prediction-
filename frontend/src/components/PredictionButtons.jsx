function PredictionButtons({

    predictTomorrow,

    predictThirtyDays,

    loading

}) {

    return (
        <div className="flex gap-6">
            <button
                onClick={predictTomorrow}

                className="
                    w-56
                    border-2
                    border-black
                    bg-white
                    py-3
                    font-semibold
                    hover:bg-black
                    hover:text-white
                    transition
                "
            >
                Predict Tomorrow
            </button>

            <button

                onClick={predictThirtyDays}

                className="
                    w-56
                    border-2
                    border-black
                    bg-white
                    py-3
                    font-semibold
                    hover:bg-black
                    hover:text-white
                    transition
                "

            >
                Predict Next 30 Days
            </button>

        </div>

    );

}

export default PredictionButtons;