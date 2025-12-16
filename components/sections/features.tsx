import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { BrainCircuit, LineChart, ShieldCheck, Zap } from "lucide-react";

const features = [
    {
        name: "AI-Powered Analytics",
        description: "Deep insights into your campaign performance with predictive modeling.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-40 transition-opacity">
                <BrainCircuit className="h-32 w-32" />
            </div>
        ),
        Icon: BrainCircuit,
    },
    {
        name: "Real-time Optimization",
        description: "Our algorithms adjust bids and targeting in real-time to maximize ROAS.",
        href: "#",
        cta: "See how",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-40 transition-opacity">
                <Zap className="h-32 w-32" />
            </div>
        ),
        Icon: Zap,
    },
    {
        name: "Data Security First",
        description: "Enterprise-grade security for your proprietary marketing data.",
        href: "#",
        cta: "Security details",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-40 transition-opacity">
                <ShieldCheck className="h-32 w-32" />
            </div>
        ),
        Icon: ShieldCheck,
    },
    {
        name: "Growth Tracking",
        description: "Watch your sales skyrocket with comprehensive growth dashboards.",
        href: "#",
        cta: "View dashboard",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-40 transition-opacity">
                <LineChart className="h-32 w-32" />
            </div>
        ),
        Icon: LineChart,
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 px-6 md:px-0 bg-white">
            <div className="container mx-auto">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Beyond Automation</h2>
                    <p className="text-muted-foreground text-lg">
                        We combine proprietary AI models with expert strategy to deliver results that compound over time.
                    </p>
                </div>

                <BentoGrid className="max-w-3xl mx-auto auto-rows-[20rem]">
                    {features.map((feature) => (
                        <BentoCard key={feature.name} {...feature} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
