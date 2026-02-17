
import { sql } from '@/lib/db';
import { Agreement, Analysis } from '@/lib/types';
import { AgreementList } from '@/components/AgreementList';
import { RadarChart } from '@/components/RadarChart';
import { Header } from '@/components/Header';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let agreements: Agreement[] = [];
  let averageScore: Analysis | null = null;
  let connectionError = false;

  try {
    const result = await sql<Agreement>`
      SELECT * FROM agreements 
      ORDER BY year DESC, id DESC
    `;
    agreements = result.rows;

    if (agreements.length > 0) {
      // Fetch scores to compute average
      const scoresResult = await sql<Analysis>`
        SELECT * FROM semantic_scores
      `;
      const scores = scoresResult.rows;

      if (scores.length > 0) {
        const total = scores.reduce((acc, curr) => ({
          sovereignty_score: acc.sovereignty_score + curr.sovereignty_score,
          binding_score: acc.binding_score + curr.binding_score,
          human_centricity_score: acc.human_centricity_score + curr.human_centricity_score,
          economic_weight: acc.economic_weight + curr.economic_weight,
          analysis_notes: '', id: 0, agreement_id: 0
        }), { sovereignty_score: 0, binding_score: 0, human_centricity_score: 0, economic_weight: 0, analysis_notes: '', id: 0, agreement_id: 0 });

        averageScore = {
          ...total,
          sovereignty_score: Math.round(total.sovereignty_score / scores.length),
          binding_score: Math.round(total.binding_score / scores.length),
          human_centricity_score: Math.round(total.human_centricity_score / scores.length),
          economic_weight: Math.round(total.economic_weight / scores.length),
        };
      }
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    connectionError = true;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-serif text-slate-800 pb-20">
      <Header />

      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Status Banner */}
        {connectionError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 font-mono text-sm text-red-700">
            <strong>SYSTEM ALERT:</strong> UNABLE TO CONNECT TO ARCHIVE. PLEASE VERIFY CREDENTIALS.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content: Agreement List */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight flex items-center justify-between">
              <span>Agreement Index</span>
              <span className="text-sm font-normal text-slate-500 bg-white px-3 py-1 rounded border border-gray-200">
                Total Records: {agreements.length}
              </span>
            </h2>
            <AgreementList agreements={agreements} />
          </div>

          {/* Sidebar: Analytics */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">
                Semantic Landscape
              </h3>
              {averageScore ? (
                <div className="h-64">
                  <RadarChart data={averageScore} />
                  <p className="text-center text-xs text-slate-400 mt-4 italic">
                    Average Semantic Profile of the Acquis
                  </p>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-300 text-sm font-mono bg-slate-50 border border-dashed border-slate-200">
                  NO DATA AVAILABLE
                </div>
              )}
            </div>

            <div className="bg-[#003399] text-white p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 text-[#FFCC00] opacity-10 text-9xl font-black select-none pointer-events-none">
                EU
              </div>
              <h3 className="text-xs font-bold text-[#FFCC00] uppercase tracking-widest mb-2">
                Directive 2026-X
              </h3>
              <p className="text-sm leading-relaxed opacity-90 font-serif">
                "The semantic mapping of the Acquis is a prerequisite for the preservation of institutional memory in the digital age."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
