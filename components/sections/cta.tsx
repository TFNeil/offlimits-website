import { Button } from "@/components/ui/button";
import { Mail, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
    return (
        <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Ready to break the limits?</h2>

                <p className="text-gray-400 max-w-xl mb-8 text-lg">
                    Reach out directly. We response to every inquiry within 24 hours.
                </p>

                <a
                    href="mailto:hi@offlimits.ai"
                    className="text-3xl md:text-5xl font-bold hover:text-gray-300 transition-colors mb-12 flex items-center gap-4"
                >
                    <Mail className="h-8 w-8 md:h-12 md:w-12" />
                    hi@offlimits.ai
                </a>

                <div className="flex gap-6">
                    <Link href="https://twitter.com" target="_blank" className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                        <Twitter className="h-6 w-6 text-gray-400 group-hover:text-white" />
                    </Link>
                    <Link href="https://instagram.com" target="_blank" className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                        <Instagram className="h-6 w-6 text-gray-400 group-hover:text-white" />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                        <Linkedin className="h-6 w-6 text-gray-400 group-hover:text-white" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
