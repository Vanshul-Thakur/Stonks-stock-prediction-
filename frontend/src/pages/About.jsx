import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    TrendingUp,
    CalendarClock,
    CalendarRange,
    Layers,
    Monitor,
    Server,
    Database,
    ArrowRight,
    Brain,
    Repeat,
    Clock3,
    LineChart,
    ListChecks,
    Workflow,
    Table2,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * DESIGN NOTES
 * -------------------------------------------------------------------------
 * The brief asks for a "PPT style" page: white background, black borders,
 * simple and clean. Rather than generic rounded cards on a gradient, this
 * page leans into that literally — each topic is an index-card-style
 * "slide" with a hard black offset shadow, like a physical deck of cards
 * sitting on a desk. A monospace "SLIDE 0X" eyebrow reinforces the deck
 * metaphor and is justified here because the seven topics genuinely form a
 * sequence (overview -> architecture -> database -> models -> features ->
 * workflow), not decoration.
 *
 * No external animation library is used (Framer Motion is optional per the
 * brief) — a lightweight mount-triggered fade/slide is done with plain
 * React state + Tailwind transition utilities, so this file has zero extra
 * dependencies beyond lucide-react, which the project already uses.
 * ---------------------------------------------------------------------- */

/**
 * SlideCard
 * Reusable "slide" wrapper: black border, hard offset shadow, mono eyebrow
 * label, icon badge, title, and body content passed as children.
 *
 * Props:
 *  - index: number      -> used for the "SLIDE 0X" label and stagger delay
 *  - total: number      -> total slide count, e.g. "01 / 03"
 *  - eyebrow: string    -> short section label, e.g. "OVERVIEW"
 *  - title: string      -> card title
 *  - icon: LucideIcon   -> icon component to render in the badge
 *  - children: ReactNode-> card body content
 */
function SlideCard({ index, total, eyebrow, title, icon: Icon, children }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Stagger each card's entrance slightly so the deck feels dealt out
        // one at a time rather than popping in all at once.
        const timer = setTimeout(() => setVisible(true), index * 120);
        return () => clearTimeout(timer);
    }, [index]);

    const slideNumber = String(index + 1).padStart(2, "0");
    const totalNumber = String(total).padStart(2, "0");

    return (

        <section
            aria-labelledby={`slide-${index}-title`}
            className={[
                "relative w-full bg-white border-2 border-black rounded-none",
                "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                "transition-all duration-500 ease-out",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: `${index * 60}ms` }}
        >

            <div className="p-6 sm:p-8 md:p-10">
                {/* Eyebrow: mono "slide number" label, encodes the deck sequence */}
                <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs tracking-widest text-black/60 uppercase">
                        Slide {slideNumber} / {totalNumber} — {eyebrow}
                    </span>
                    <span
                        aria-hidden="true"
                        className="hidden sm:block font-mono text-[11px] tracking-widest text-black/30 uppercase"
                    >
                        AI Stock Predictor
                    </span>
                </div>

                {/* Header: icon badge + title */}
                <div className="flex items-center gap-4 mb-6">
                    <div
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-white"
                    >
                        <Icon size={22} strokeWidth={2} className="text-black" />
                    </div>
                    <h2 id={`slide-${index}-title`} className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                        {title}
                    </h2>
                </div>

                {/* Body content, provided per-slide below */}
                <div className="text-black/80 leading-relaxed">{children}</div>
            </div>
        </section>
    );
}

/**
 * StatChip
 * Small pill used to highlight a capability or tech-stack item, e.g.
 * "Next-Day Forecast" or "FastAPI". Kept as its own component since it's
 * reused across multiple slides.
 */
function StatChip({ icon: Icon, label }) {
    return (
        <span className="inline-flex items-center gap-1.5 border border-black px-3 py-1.5 text-xs sm:text-sm font-semibold text-black bg-white">
            {Icon && <Icon size={14} aria-hidden="true" />}
            {label}
        </span>
    );
}

/**
 * ArchLayer
 * A small bordered tile with an icon, a mono label, a name, and a
 * description. Used for the Architecture slide's layer grid (Client /
 * API / Data) and reused as-is for the Database Design slide's table
 * grid (stocks / stock_prices / predictions / watchlist), since both
 * are "a labelled set of things" laid out the same way.
 */
function ArchLayer({ icon: Icon, layer, name, description }) {
    return (
        <div className="border-2 border-black p-4 sm:p-5 bg-white h-full">
            <div className="flex items-center gap-2 mb-2">
                <Icon size={18} aria-hidden="true" className="text-black" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-black/50">
                    {layer}
                </span>
            </div>
            <h3 className="font-bold text-black text-base mb-1">{name}</h3>
            <p className="text-sm text-black/70 leading-snug">{description}</p>
        </div>
    );
}

export default function About() {
    const totalSlides = 7;

    return (
        <main className="min-h-screen w-full bg-white">

            <Navbar />
            {/* Page header */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-8 text-center">
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-black/50 mb-3">
                    Documentation
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
                    About This Project
                </h1>
                <p className="mt-3 text-black/60 text-sm sm:text-base">
                    A quick walkthrough of what the app does, how it's built, and the
                    model behind the predictions.
                </p>
            </div>

            {/* Deck of slides — single column, stacked, as requested */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 flex flex-col gap-10">
                {/* ---------------------------------------------------------- */}
                {/* SLIDE 1 — Project Overview                                  */}
                {/* ---------------------------------------------------------- */}
                <SlideCard index={0} total={totalSlides} eyebrow="Overview" title="Project Overview" icon={TrendingUp}>
                    <p className="mb-5">
                        This app predicts stock closing prices using a deep learning
                        model trained on historical market data. Instead of relying on
                        fixed rules, it learns price patterns directly from the data and
                        projects how they might continue.
                    </p>
                    <p className="mb-5">
                        Two forecast modes are available depending on how far ahead you
                        want to look:
                    </p>
                    <div className="flex flex-wrap gap-2.5" role="list" aria-label="Forecast capabilities">
                        <StatChip icon={Clock3} label="Next-Day Forecast" />
                        <StatChip icon={CalendarRange} label="Next 30-Day Trend" />
                        <StatChip icon={CalendarClock} label="Historical Price Charts" />
                    </div>
                </SlideCard>

                {/* ---------------------------------------------------------- */}
                {/* SLIDE 2 — System Architecture                               */}
                {/* ---------------------------------------------------------- */}
                <SlideCard index={1} total={totalSlides} eyebrow="Architecture" title="System Architecture" icon={Layers}>
                    <p className="mb-6">
                        The app is split into three independent layers, each doing one
                        job well:
                    </p>

                    {/* 3-column layer grid: stacks on mobile, row on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <ArchLayer
                            icon={Monitor}
                            layer="Client"
                            name="React + Vite"
                            description="Tailwind CSS UI where you search tickers and view charts. Fast dev server, instant feedback."
                        />
                        <ArchLayer
                            icon={Server}
                            layer="API"
                            name="FastAPI"
                            description="High-performance Python API that fetches market data and serves model predictions."
                        />
                        <ArchLayer
                            icon={Database}
                            layer="Data"
                            name="Supabase (PostgreSQL)"
                            description="Stores search and prediction history with real-time-capable Postgres."
                        />
                    </div>

                    {/* Flow strip: literally encodes the request/response path,
              so this ordering (unlike a generic 01/02/03) carries real
              information about how a request travels through the system. */}
                    <div
                        className="flex items-center justify-between gap-2 border-2 border-black px-4 py-3 bg-white overflow-x-auto"
                        role="img"
                        aria-label="Data flow: Client sends requests to the API, the API reads and writes to the Database"
                    >
                        <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">Client</span>
                        <ArrowRight size={16} className="text-black/40 shrink-0" aria-hidden="true" />
                        <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">API</span>
                        <ArrowRight size={16} className="text-black/40 shrink-0" aria-hidden="true" />
                        <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">Database</span>
                    </div>
                </SlideCard>

                {/* ---------------------------------------------------------- */}
                {/* SLIDE 3 — Database Design                                   */}
                {/* ---------------------------------------------------------- */}
                <SlideCard index={2} total={totalSlides} eyebrow="Database" title="Database Design" icon={Table2}>
                    <p className="mb-6">
                        The schema is small and normalised: four tables cover stock
                        metadata, price history, predictions, and the watchlist, and
                        every child table links back to a single stock through a
                        <code className="mx-1 px-1.5 py-0.5 border border-black/20 bg-black/5 font-mono text-[13px]">
                            stock_id
                        </code>
                        foreign key.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ArchLayer
                            icon={Database}
                            layer="Table"
                            name="stocks"
                            description="Symbol, company name, exchange, sector, industry, and website."
                        />
                        <ArchLayer
                            icon={Database}
                            layer="Table"
                            name="stock_prices"
                            description="Daily open, high, low, close, and volume for a stock."
                        />
                        <ArchLayer
                            icon={Database}
                            layer="Table"
                            name="predictions"
                            description="Model name, predicted price, and prediction date."
                        />
                        <ArchLayer
                            icon={Database}
                            layer="Table"
                            name="watchlist"
                            description="Stocks a user has chosen to track."
                        />
                    </div>
                </SlideCard>

                {/* ---------------------------------------------------------- */}
                {/* SLIDE 4 — Linear Regression                                 */}
                {/* ---------------------------------------------------------- */}
                <SlideCard index={3} total={totalSlides} eyebrow="Model 1" title="Linear Regression" icon={LineChart}>
                    <p className="mb-5">
                        The first prediction model is a{" "}
                        <strong className="text-black">Linear Regression</strong>{" "}
                        baseline. It treats each trading day as a point on a line and
                        fits the straight-line trend that best matches a stock's recent
                        closing prices.
                    </p>
                    <p className="mb-5">
                        Predicting tomorrow (or day 30) just means extending that line
                        forward. It won't catch sudden reversals, but it's fast, simple,
                        and a useful sanity check against the LSTM model.
                    </p>
                    <div className="flex flex-wrap gap-2.5" role="list" aria-label="Linear regression characteristics">
                        <StatChip icon={Clock3} label="Fast to Train" />
                        <StatChip icon={TrendingUp} label="Trend-Following" />
                        <StatChip icon={LineChart} label="Simple Baseline" />
                    </div>
                </SlideCard>

                {/* ---------------------------------------------------------- */}
                {/* SLIDE 5 — The AI Model (LSTM)                                */}
                {/* ---------------------------------------------------------- */}
                <SlideCard index={4} total={totalSlides} eyebrow="Model 2" title="The AI Model (LSTM)" icon={Brain}>
                    <p className="mb-5">
                        The second model is an{" "}
                        <strong className="text-black">LSTM (Long Short-Term Memory)</strong>{" "}
                        network — a type of Recurrent Neural Network (RNN) built to learn
                        order dependence in sequence data.
                    </p>
                    <p className="mb-5">
                        In plain terms: an LSTM reads a stock's price history the way you
                        would, step by step, and keeps a memory of what mattered earlier
                        in the sequence, not just the most recent value.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border-2 border-black p-4 bg-white">
                            <div className="flex items-center gap-2 mb-2">
                                <Repeat size={16} aria-hidden="true" />
                                <span className="font-mono text-[11px] tracking-widest uppercase text-black/50">
                                    Why sequence matters
                                </span>
                            </div>
                            <p className="text-sm text-black/70 leading-snug">
                                Stock prices are ordered in time — yesterday's price
                                influences today's. Standard models that treat each day in
                                isolation miss that context.
                            </p>
                        </div>
                        <div className="border-2 border-black p-4 bg-white">
                            <div className="flex items-center gap-2 mb-2">
                                <Brain size={16} aria-hidden="true" />
                                <span className="font-mono text-[11px] tracking-widest uppercase text-black/50">
                                    Why LSTM specifically
                                </span>
                            </div>
                            <p className="text-sm text-black/70 leading-snug">
                                LSTMs are explicitly designed to remember long-term
                                dependencies in a sequence, which fits noisy, trend-driven
                                data like stock markets better than simpler models.
                            </p>
                        </div>
                    </div>
                </SlideCard>

                {/* ---------------------------------------------------------- */}
                {/* SLIDE 6 — Application Features                              */}
                {/* ---------------------------------------------------------- */}
                <SlideCard index={5} total={totalSlides} eyebrow="Features" title="Application Features" icon={ListChecks}>
                    <p className="mb-6">
                        Everything below is implemented and working in the current
                        version of the app:
                    </p>
                    <div className="flex flex-wrap gap-2.5" role="list" aria-label="Implemented application features">
                        <StatChip icon={TrendingUp} label="Stock Search" />
                        <StatChip icon={Database} label="Historical Price Download" />
                        <StatChip icon={LineChart} label="Interactive Price Chart" />
                        <StatChip icon={Clock3} label="One-Day Prediction" />
                        <StatChip icon={CalendarRange} label="30-Day Prediction" />
                        <StatChip icon={ArrowRight} label="Top Gainers / Losers" />
                        <StatChip icon={Monitor} label="Most Active Stocks" />
                        <StatChip icon={CalendarClock} label="Responsive UI" />
                    </div>
                </SlideCard>

                {/* ---------------------------------------------------------- */}
                {/* SLIDE 7 — Project Workflow                                   */}
                {/* ---------------------------------------------------------- */}
                <SlideCard index={6} total={totalSlides} eyebrow="Workflow" title="Project Workflow" icon={Workflow}>
                    <p className="mb-6">
                        A single search-to-prediction request moves through the system
                        in five stages:
                    </p>
                    <div
                        className="flex flex-wrap items-center justify-between gap-2 border-2 border-black px-4 py-3 bg-white overflow-x-auto"
                        role="img"
                        aria-label="Workflow: Search, then Fetch and Store, then Visualize, then Predict, then Display"
                    >
                        <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">Search</span>
                        <ArrowRight size={16} className="text-black/40 shrink-0" aria-hidden="true" />
                        <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">Fetch &amp; Store</span>
                        <ArrowRight size={16} className="text-black/40 shrink-0" aria-hidden="true" />
                        <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">Visualize</span>
                        <ArrowRight size={16} className="text-black/40 shrink-0" aria-hidden="true" />
                        <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">Predict</span>
                        <ArrowRight size={16} className="text-black/40 shrink-0" aria-hidden="true" />
                        <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">Display</span>
                    </div>
                    <p className="mt-5 text-sm text-black/70 leading-snug">
                        The user searches a ticker; the backend fetches and stores its
                        data; the frontend visualises the history; the selected model
                        predicts future prices; and the result is displayed back to the
                        user.
                    </p>
                </SlideCard>
            </div>
        </main>
    );
}
