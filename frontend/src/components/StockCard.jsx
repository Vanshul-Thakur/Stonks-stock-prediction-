function StockCard({ stock }) {

    if (!stock) return null;

    const positive = stock.change >= 0;

    return (

        <div className="bg-white border-2 border-black p-6">

            {/* Logo */}

            <div className="flex justify-center">

                <div className="flex justify-center">

                    {stock.logo_url ? (

                        <img
                            src={stock.logo_url}
                            alt={stock.company_name}
                            className="w-16 h-16 rounded-xl object-contain border border-black p-2"
                        />

                    ) : (

                        <div className="w-16 h-16 border-2 border-black rounded-xl flex items-center justify-center text-xl font-bold">
                            {stock.symbol[0]}
                        </div>

                    )}

                </div>

            </div>

            {/* Company */}

            <div className="mt-5 text-center">

                <h2 className="text-3xl font-bold text-black">
                    {stock.company_name}
                </h2>

                <p className="text-gray-500 mt-1">
                    {stock.symbol} • {stock.exchange}
                </p>

                <p
                    className={`mt-2 font-semibold ${stock.market_status === "Open"
                        ? "text-green-600"
                        : "text-gray-600"
                        }`}
                >
                    ● {stock.market_status}
                </p>

            </div>

            <hr className="border-black my-6" />

            {/* Price */}

            <div className="text-center">

                <h1 className="text-3xl font-bold text-black">
                    ${stock.current_price}
                </h1>

                <p
                    className={`mt-3 text-xl font-semibold ${positive
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                >
                    {positive ? "+" : ""}
                    {stock.change}

                    {" "}

                    ({positive ? "+" : ""}
                    {stock.change_percent}%)
                </p>

            </div>

            <hr className="border-black my-6" />

            {/* Details */}

            <div className="space-y-5">

                <div>

                    <p className="text-gray-500 text-sm uppercase tracking-wide">
                        Sector
                    </p>

                    <p className="text-lg font-medium text-black">
                        {stock.sector}
                    </p>

                </div>

                <div>

                    <p className="text-gray-500 text-sm uppercase tracking-wide">
                        Industry
                    </p>

                    <p className="text-lg font-medium text-black">
                        {stock.industry}
                    </p>

                </div>

            </div>

        </div>

    );
}

export default StockCard;