import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-black rounded-sm"></div>
                    <span className="text-lg font-bold tracking-tight">OFFLIMITS AI</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="/#features" className="hover:text-foreground transition-colors uppercase tracking-widest text-xs">Capabilities</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/contact">
                        <Button size="sm" className="rounded-full px-6 uppercase tracking-wider text-xs font-bold">Contact Us</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
