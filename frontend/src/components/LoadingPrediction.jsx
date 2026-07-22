export default function Loading() {
    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md rounded-lg border-2 border-black bg-white p-6 text-center">

                <h2 className="text-xl font-semibold text-black">
                    Training LSTM Model...
                </h2>

                <p className="mt-3 text-gray-700">
                    Please wait while the model trains.
                </p>

                <div className="mt-5 flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
                </div>

            </div>
        </div>
    );
}