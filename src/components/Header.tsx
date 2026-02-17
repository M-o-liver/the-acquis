
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Header() {
    return (
        <header className="border-b-4 border-primary bg-background p-6 shadow-sm">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex flex-col">
                    <h1 className="text-3xl font-black text-primary tracking-tighter uppercase">
                        Official Journal <span className="text-foreground font-serif italic text-lg lowercase block">of the Acquis</span>
                    </h1>
                </Link>
                <nav className="text-sm font-bold text-foreground/70 uppercase tracking-widest space-x-6">
                    <Link href="/" className="hover:text-primary transition-colors">Treaty Index</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">Methodology</Link>
                    <span className="text-xs text-muted-foreground border border-muted-foreground/30 px-2 py-1 rounded">
                        Vol. MMX-XXVI
                    </span>
                </nav>
            </div>
        </header>
    );
}
