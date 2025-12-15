import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { SocialProofSection } from "@/components/sections/social-proof";
import { FeaturesSection } from "@/components/sections/features";
import { CtaSection } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans selection:bg-black selection:text-white">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <SocialProofSection />
        <FeaturesSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
