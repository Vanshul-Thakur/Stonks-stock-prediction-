import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="border-b-2 border-black bg-blue-500 text-white">
            <div className="mx-auto flex h-16 items-center justify-between px-6">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/stonkslogo.png" alt="S" className="h-8 w-auto" />
                    <h1 className="text-xl font-bold">STONKS</h1>
                </Link>


                {/* Navigation Links */}
                <div className="flex gap-6">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>

                    <Link to="/trending" className="hover:underline">
                        Trending
                    </Link>

                    <Link to="/about" className="hover:underline">
                        About
                    </Link>
                </div>

            </div>
        </nav>
    );
}