'use client';

import Link from 'next/link';
import { useNav } from './NavContext';

export default function Navbar() {
    const { links } = useNav();

    return (
        <nav className="w-full max-w-full overflow-x-hidden bg-background2 px-4 py-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-4 max-w-full">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm sm:text-base text-foreground transition hover:opacity-80 whitespace-nowrap"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}