
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#F5F7FA] font-serif text-slate-800 pb-20">
            <Header />

            <main className="container mx-auto px-6 py-12 max-w-4xl space-y-12">
                {/* Breadcrumbs */}
                <nav className="text-xs uppercase font-bold tracking-widest text-slate-400">
                    <Link href="/" className="hover:text-primary">Index</Link> /
                    <span className="ml-2 text-primary">Methodology</span>
                </nav>

                <header className="border-b-4 border-double border-slate-300 pb-6">
                    <h1 className="text-4xl font-black text-slate-900 leading-tight mb-2 font-sans uppercase tracking-tighter">
                        Methodology & Mandate
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                        Directorate-General for Informatics (DIGIT)
                    </p>
                </header>

                <div className="prose prose-slate prose-lg max-w-none font-serif">
                    <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">01. Objective</h3>
                    <p>
                        The <strong>ACQUIS</strong> project aims to provide a semantic map of the post-1945 international order.
                        By analyzing key treaties and agreements, we seek to quantify the shifting tides of sovereignty,
                        human rights, and economic integration.
                    </p>

                    <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-slate-400 mb-4 mt-8">02. Semantic Scoring Dimensions</h3>
                    <ul className="list-none pl-0 space-y-4">
                        <li className="bg-white p-4 border-l-4 border-[#003399] shadow-sm">
                            <strong className="text-[#003399] block font-sans uppercase text-xs tracking-wider mb-1">Sovereignty Score</strong>
                            Measures the extent to which a state retains absolute authority versus surrendering power to supranational bodies.
                            <br /><span className="text-xs text-slate-400">0 (Supranational) — 100 (Nationalist)</span>
                        </li>
                        <li className="bg-white p-4 border-l-4 border-[#FFCC00] shadow-sm">
                            <strong className="text-[#B38F00] block font-sans uppercase text-xs tracking-wider mb-1">Binding Score</strong>
                            Evaluates the legal enforceability of the agreement.
                            <br /><span className="text-xs text-slate-400">0 (Voluntary) — 100 (Strict Enforcement)</span>
                        </li>
                        <li className="bg-white p-4 border-l-4 border-slate-600 shadow-sm">
                            <strong className="text-slate-700 block font-sans uppercase text-xs tracking-wider mb-1">Human Centricity</strong>
                            Assesses whether the focus is on individual rights or abstract state interests.
                            <br /><span className="text-xs text-slate-400">0 (State-focused) — 100 (Individual-focused)</span>
                        </li>
                        <li className="bg-white p-4 border-l-4 border-slate-400 shadow-sm">
                            <strong className="text-slate-500 block font-sans uppercase text-xs tracking-wider mb-1">Economic Weight</strong>
                            Determines the direct financial, trade, or market impact of the treaty.
                            <br /><span className="text-xs text-slate-400">0 (Symbolic) — 100 (Market Moving)</span>
                        </li>
                    </ul>

                    <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-slate-400 mb-4 mt-8">03. Automated Analysis</h3>
                    <p>
                        Analysis is performed by the <strong>European Commission High-Dimensional Semantic Engine</strong> (powered by Google Gemini 1.5 Pro).
                        Scores are generated based on textual analysis of the treaty's preamble and articles, referenced against a corpus of diplomatic precedent.
                    </p>
                </div>

                <div className="bg-slate-200 p-8 text-center text-xs font-mono uppercase tracking-widest text-slate-500 border-t border-slate-300 mt-12">
                    Official Journal of the Acquis • Vol. MMX-XXVI • Status: Classified
                </div>
            </main>
        </div>
    );
}
