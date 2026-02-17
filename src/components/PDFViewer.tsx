
'use client';

import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

interface PDFViewerProps {
    title: string;
    content: string;
}

export function PDFViewer({ title, content }: PDFViewerProps) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        const generatePDF = () => {
            const doc = new jsPDF();

            // Header
            doc.setFont("times", "bold");
            doc.setFontSize(20);
            doc.text(title, 20, 20);

            doc.setFontSize(12);
            doc.setFont("times", "normal");

            // Content processing
            const splitText = doc.splitTextToSize(content, 170);

            let y = 30;
            let pageCount = 1;
            // Add text page by page
            for (let i = 0; i < splitText.length; i++) {
                if (y > 280) {
                    doc.addPage();
                    pageCount++;
                    y = 20;
                }
                doc.text(splitText[i], 20, y);
                y += 7;
            }

            // Footer
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.text(`Official Journal of the Acquis - Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
            }

            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
        };

        generatePDF();

        return () => {
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
    }, [title, content]);

    if (!pdfUrl) {
        return <div className="h-96 w-full flex items-center justify-center bg-slate-100 text-slate-400">Generaring PDF...</div>;
    }

    return (
        <div className="w-full h-[800px] border border-slate-300 shadow-md bg-white">
            <iframe src={pdfUrl} className="w-full h-full" title={title} />
        </div>
    );
}
