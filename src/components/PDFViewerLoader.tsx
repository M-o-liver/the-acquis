
'use client';
import dynamic from 'next/dynamic';

export const PDFViewerLoader = dynamic(() => import('./PDFViewer').then(mod => mod.PDFViewer), {
    ssr: false,
    loading: () => <div className="h-96 w-full flex items-center justify-center bg-slate-50 text-slate-400">Loading PDF View...</div>
});
