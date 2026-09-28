import { Motion } from "@/components/motion"
import { Automation } from "@/components/landing/automation"
import { Audience } from "@/components/landing/audience"
import { ClosingCta } from "@/components/landing/closing-cta"
import { Hero } from "@/components/landing/hero"
import { Marquee } from "@/components/landing/marquee"
import { Container, Rule } from "@/components/landing/primitives"
import { Program } from "@/components/landing/program"
import { SiteNav } from "@/components/landing/site-nav"
import { StickyCta } from "@/components/landing/sticky-cta"

export default function Home() {
  return (
    // overflow-x-clip, not -hidden: hidden would turn this into a scroll
    // container and stop the mobile header from sticking.
    <Motion className="overflow-x-clip">
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
      <footer className="gutter mx-auto flex w-full max-w-[1280px] flex-col gap-1 pt-6 pb-8 text-[13px] leading-5 text-foreground/70 lg:flex-row lg:flex-wrap lg:justify-between lg:gap-3 lg:py-8">
        <span>© 2026 OFFLIMITS AI</span>
        <span>Scaling for service businesses</span>
      </footer>
      <StickyCta />
    </Motion>
  )
}
