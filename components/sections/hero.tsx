import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative px-6 py-24 md:py-32 lg:py-48 overflow-hidden">
            <div className="container mx-auto relative z-10 flex flex-col items-center text-center">

                <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-balance">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-black animate-gradient-x">
                        Marketing That Learns.
                    </span>
                </h1>

                <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-12 text-balance leading-relaxed">
                    Skyrocket sales with data-driven campaigns that get smarter over time.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link href="/contact">
                        <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-105 transition-all duration-300">
                            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gray-200/50 to-transparent rounded-full blur-3xl -z-10 opacity-50 pointer-events-none"></div>
        </section>
    );
}
