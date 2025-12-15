import { Marquee } from "@/components/ui/marquee";

const reviews = [
    {
        name: "TechCorp",
        username: "@techcorp",
        body: "Sales increased by 40% in the first month. The AI optimization is real.",
        img: "https://avatar.vercel.sh/techcorp",
    },
    {
        name: "GrowthLabs",
        username: "@growthlabs",
        body: "Finally an agency that cares about data more than vibes. Incredible results.",
        img: "https://avatar.vercel.sh/growthlabs",
    },
    {
        name: "NextGen",
        username: "@nextgen",
        body: "OFFLIMITS AI completely overhauled our paid acquisition strategy.",
        img: "https://avatar.vercel.sh/nextgen",
    },
    {
        name: "Starlight",
        username: "@starlight",
        body: "Minimal inputs, maximum outputs. The automation is seamless.",
        img: "https://avatar.vercel.sh/starlight",
    },
    {
        name: "BlueSky",
        username: "@bluesky",
        body: "We saw a 3x ROAS improvement within weeks. Highly recommended.",
        img: "https://avatar.vercel.sh/bluesky",
    },
    {
        name: "Momentum",
        username: "@momentum",
        body: "The dashboard is beautiful and the results are even better.",
        img: "https://avatar.vercel.sh/momentum",
    },
];

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function SocialProofSection() {
    return (
        <section className="py-12 border-y bg-secondary/30">
            <div className="container mx-auto px-6 mb-8 text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Trusted by forward-thinking brands
            </div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {reviews.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
            </div>
        </section>
    );
}
