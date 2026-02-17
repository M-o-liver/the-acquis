
import Link from 'next/link';
import { Agreement } from '@/lib/types';

export function AgreementList({ agreements }: { agreements: Agreement[] }) {
    return (
        <div className="overflow-x-auto border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-sm text-left text-slate-600">
                <thead className="bg-[#F5F7FA] text-xs uppercase font-bold text-slate-500 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 font-serif tracking-wider">Ref No.</th>
                        <th className="px-6 py-3 font-serif tracking-wider">Year</th>
                        <th className="px-6 py-3 font-serif tracking-wider">Title</th>
                        <th className="px-6 py-3 font-serif tracking-wider">Category</th>
                        <th className="px-6 py-3 font-serif tracking-wider text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {agreements.map((agreement) => (
                        <tr key={agreement.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                            <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                EU-{agreement.year}-{agreement.id.toString().padStart(4, '0')}
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-800 font-serif">{agreement.year}</td>
                            <td className="px-6 py-4 font-bold text-primary group-hover:underline decoration-primary/30 underline-offset-4">
                                <Link href={`/agreements/${agreement.id}`} className="block">
                                    {agreement.name}
                                </Link>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 uppercase tracking-wide border border-slate-200">
                                    {agreement.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-xs font-bold text-[#FFCC00] border-2 border-[#FFCC00] px-2 py-1 transform -rotate-2 inline-block opacity-80 mix-blend-multiply tracking-widest stamp">
                                    RATIFIED
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
