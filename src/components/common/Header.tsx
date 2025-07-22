import Link from 'next/link';
import { CalendarRange } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <CalendarRange className="h-7 w-7" />
            <span className="text-xl font-bold tracking-tight">RendezView</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
