import { useNavigate } from "react-router-dom";

function TrendingList({ title, stocks }) {

    const navigate = useNavigate();

    return (

        <div className="border-2 border-black bg-white">

            {/* Title */}

            <div className="border-b-2 border-black px-5 py-3">

                <h2 className="text-2xl font-bold">
                    {title}
                </h2>

            </div>

            {stocks.map((stock, index) => (

                <div
                    key={stock.symbol}
                    onClick={() => navigate(`/stock/${stock.symbol}`)}
                    className="grid grid-cols-4 items-center px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 transition"
                >

                    {/* Rank */}

                    <div className="font-bold text-lg">

                        {index + 1}

                    </div>

                    {/* Logo + Company */}

                    <div className="flex items-center gap-4">

                        <img
                            src={stock.logo_url}
                            alt={stock.symbol}
                            className="w-10 h-10 rounded-full border border-gray-300"
                            onError={(e) => {

                                e.target.style.display = "none";

                                e.target.nextSibling.style.display = "flex";

                            }}
                        />

                        {/* Fallback */}

                        <div
                            className="hidden w-10 h-10 rounded-full border border-gray-300 bg-gray-100 items-center justify-center font-bold text-gray-700"
                        >

                            {stock.symbol[0]}

                        </div>

                        <div>

                            <div className="font-bold">

                                {stock.symbol}

                            </div>

                            <div className="text-sm text-gray-500">

                                {stock.company_name}

                            </div>

                        </div>

                    </div>

                    {/* Price */}

                    <div className="font-semibold">

                        ${stock.price?.toFixed(2)}

                    </div>

                    {/* Change */}

                    <div
                        className={`font-bold ${stock.change >= 0
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                    >

                        {stock.change >= 0 ? "▲" : "▼"}{" "}
                        {stock.change_percent?.toFixed(2)}%

                    </div>

                </div>

            ))}

        </div>

    );

}

export default TrendingList;