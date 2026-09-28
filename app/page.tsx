import { Motion } from "@/components/motion"
import { Automation } from "@/components/landing/automation"
import { Audience } from "@/components/landing/audience"
import { ClosingCta } from "@/components/landing/closing-cta"
import { Hero } from "@/components/landing/hero"
import { Marquee } from "@/components/landing/marquee"
import { Container, Rule } from "@/components/landing/primitives"
import { Program } from "@/components/landing/program"
import { SiteNav } from "@/components/landing/site-nav"

export default function Home() {
  return (
    <Motion className="overflow-x-hidden">
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Container>
          <Program />
          <Rule />
          <Automation />
          <Rule />
          <Audience />
        </Container>
        <ClosingCta />
      </main>
      <footer className="gutter mx-auto flex w-full max-w-[1280px] flex-wrap justify-between gap-3 py-8 text-[13px] text-foreground/70">
        <span>© 2026 OFFLIMITS AI</span>
        <span>Scaling for service businesses</span>
      </footer>
    </Motion>
  )
}
