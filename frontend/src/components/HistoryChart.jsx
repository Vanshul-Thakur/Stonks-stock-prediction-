import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function HistoryChart({ history, prediction }) {

    if (!history || history.length === 0) return null;

    // for prediction line
    let chartData = [...history];

    if (prediction) {

        if (Array.isArray(prediction)) {

            prediction.forEach((price, index) => {

                chartData.push({

                    date: `P${index + 1}`,

                    prediction: price

                });

            });

        } else {

            chartData.push({

                date: "Tomorrow",

                prediction: prediction

            });

        }

    }

    return (

        <div className="bg-white border-2 border-black p-6 h-[525px]">

            <h2 className="text-2xl font-bold mb-6 ">
                Price History
            </h2>

            <ResponsiveContainer width="100%" height="90%">

                <LineChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 10
                    }}
                >

                    <CartesianGrid
                        stroke="#d4d4d4"
                        strokeDasharray="4 4"
                    />

                    <XAxis
                        dataKey="date"
                        interval="preserveStartEnd"
                        tick={{ fill: "#000", fontSize: 12 }}
                        tickFormatter={(date) =>
                            new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                year: "2-digit"
                            })
                        }
                        tickLine={false}
                        axisLine={{ stroke: "#000" }}
                    />

                    <YAxis
                        domain={["auto", "auto"]}
                        tickFormatter={(value) => `$${value}`}
                        tick={{ fill: "#000", fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: "#000" }}
                    />

                    <Tooltip
                        formatter={(value) => [`$${value}`, "Price"]}
                        labelFormatter={(label) =>
                            new Date(label).toLocaleDateString()
                        }
                        contentStyle={{
                            background: "#fff",
                            border: "2px solid black",
                            borderRadius: "0px"
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#000"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5 }}
                        isAnimationActive={true}
                        animationDuration={1000}
                    />

                    <Line
                        type="monotone"
                        dataKey="prediction"
                        stroke="#000"
                        strokeDasharray="8 6"
                        strokeWidth={2}
                        dot={false}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );
}

export default HistoryChart;