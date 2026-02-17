
import { sql } from '@/lib/db';
import { Agreement, Analysis } from '@/lib/types';
import { RadarChart } from '@/components/RadarChart';
import { Header } from '@/components/Header';
import { PDFViewer } from '@/components/PDFViewer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AgreementPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
        notFound();
    }

    const agreementResult = await sql<Agreement>`
    SELECT * FROM agreements WHERE id = ${id}
  `;
    const agreement = agreementResult.rows[0];

    if (!agreement) {
        notFound();
    }

    const analysisResult = await sql<Analysis>`
    SELECT * FROM semantic_scores WHERE agreement_id = ${id}
  `;
    const analysis = analysisResult.rows[0];

    return (
        <div className="min-h-screen bg-[#F5F7FA] font-serif text-slate-800 pb-20">
            <Header />

            <main className="container mx-auto px-6 py-12 space-y-8">
                {/* Breadcrumbs */}
                <nav className="text-xs uppercase font-bold tracking-widest text-slate-400">
                    <Link href="/" className="hover:text-primary">Index</Link> /
                    <span className="ml-2 text-slate-600">{agreement.year}</span> /
                    <span className="ml-2 text-primary">{agreement.category}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content: Text */}
                    <div className="lg:col-span-8 space-y-8">
                        <header className="border-b-2 border-primary pb-6">
                            <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4 font-sans uppercase tracking-tighter">
                                {agreement.name}
                            </h1>
                            <div className="flex items-center space-x-6 text-sm font-sans font-bold text-slate-500 uppercase tracking-wide">
                                <span>Year: {agreement.year}</span>
                                <span>Signatories: {agreement.signatories ? agreement.signatories.length : 'N/A'}</span>
                                <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs">
                                    {agreement.category}
                                </span>
                            </div>
                        </header>

                        <div className="prose prose-slate prose-lg max-w-none font-serif leading-relaxed">
                            <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">Official Summary</h3>
                            <p className="bg-white p-6 border-l-4 border-slate-300 italic text-slate-600 shadow-sm">
                                {agreement.summary}
                            </p>

                            <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-slate-400 mb-4 mt-8">Full Text (PDF View)</h3>
                            <div className="bg-white p-1 border border-gray-100 shadow-sm">
                                <PDFViewer title={agreement.name} content={agreement.full_text || "Full text not available."} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Analysis */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Status Stamp */}
                        <div className="bg-white p-8 border border-gray-200 text-center shadow-lg transform rotate-1">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current Status</div>
                            <div className="text-2xl font-black text-[#FFCC00] uppercase tracking-widest font-sans border-4 border-[#FFCC00] px-4 py-2 inline-block opacity-90 mix-blend-multiply stamp border-double">
                                ENTERED INTO FORCE
                            </div>
                        </div>

                        {/* AI Analysis */}
                        <div className="bg-slate-800 text-slate-100 p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-6 -mt-6 text-white opacity-5 text-9xl font-black pointer-events-none icon-print">
                                AI
                            </div>

                            <h3 className="text-xs font-bold text-[#FFCC00] uppercase tracking-widest mb-6 border-b border-slate-700 pb-2">
                                Semantic Analysis (Commission AI)
                            </h3>

                            {analysis ? (
                                <div className="space-y-6">
                                    <div className="h-64 bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                        <RadarChart data={analysis} />
                                    </div>

                                    <div className="space-y-4 font-mono text-xs leading-relaxed opacity-90">
                                        <p className="uppercase text-slate-500 font-bold mb-1">// Analyst Note</p>
                                        <blockquote className="border-l-2 border-[#FFCC00] pl-3 text-slate-300">
                                            "{analysis.analysis_notes}"
                                        </blockquote>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                                            <div>
                                                <span className="block text-slate-500">Sovereignty</span>
                                                <span className="font-bold text-[#FFCC00]">{analysis.sovereignty_score}/100</span>
                                            </div>
                                            <div>
                                                <span className="block text-slate-500">Binding</span>
                                                <span className="font-bold text-[#FFCC00]">{analysis.binding_score}/100</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-slate-500 italic font-mono text-sm">
                                    Analysis Pending...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
