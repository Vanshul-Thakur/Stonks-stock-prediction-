import { useState } from "react";

export default function SearchBar({ searchStock }) {

    const [symbol, setSymbol] = useState("");

    const handleSearch = () => {
        if (!symbol.trim()) return;

        searchStock(symbol.toUpperCase());
    };

    return (
        <div className="mx-auto mt-8 flex w-full max-w-xl gap-3">

            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter stock symbol"
                className="flex-1 rounded-lg border-2 border-black bg-white px-4 py-2 outline-none"
            />

            <button
                onClick={handleSearch}
                className="rounded-lg border-2 border-black bg-white px-6 py-2 hover:bg-black hover:text-white"
            >
                Search
            </button>

        </div>
    );
}