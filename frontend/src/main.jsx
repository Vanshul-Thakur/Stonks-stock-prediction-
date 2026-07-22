import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Dashboard from './pages/Dashboard';
import Trending from "./pages/Trending";
import About from "./pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />, // Default page
    },
    {
        path: "/stock/:symbol",
        element: <Dashboard />,
    },
    {
        path: "/trending",
        element: <Trending />,
    },
    {
        path: "/about",       // about
        element: <About />,
    },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);