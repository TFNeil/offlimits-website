import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/landing/primitives"

const WORDMARK = "OFFLIMITS".split("")

export function Hero() {
  return (
    <Container>
      <section className="pt-18">
        {/* Each letter slides up out of the clipped line, then the red full stop drops in. */}
        <p className="-ml-[0.06em] flex overflow-hidden pb-[0.04em] font-heading text-[clamp(40px,15.3vw,196px)] leading-[0.86] font-extrabold tracking-[-0.045em]">
          <span className="sr-only">OFFLIMITS.</span>
          {WORDMARK.map((letter, i) => (
            <span key={i} aria-hidden data-anim="mask" data-delay={100 + i * 50} className="inline-block">
              {letter}
            </span>
          ))}
          <span aria-hidden data-anim="drop" data-delay="1000" className="inline-block text-brand">
            .
          </span>
        </p>

        <div className="mt-16">
          <div data-anim="draw" data-delay="600" data-dur="1200" className="h-0.5 origin-left bg-divider" />
          <div className="grid lg:grid-cols-3">
            <div
              data-anim="rise"
              data-delay="800"
              className="pt-9 pb-12 max-lg:border-b-2 lg:border-r-2 lg:pr-9"
            >
              <h1 className="font-heading text-[40px] leading-[1.05] font-extrabold tracking-[-0.02em]">
                We scale service businesses.
              </h1>
            </div>
            <div
              data-anim="rise"
              data-delay="950"
              className="pt-9 pb-12 max-lg:border-b-2 lg:border-r-2 lg:px-9"
            >
              <p className="font-heading text-[120px] leading-[0.8] font-extrabold tracking-[-0.04em] text-brand tabular-nums">
                <span data-count="1400" data-delay="950">
                  90
                </span>
              </p>
              <p className="eyebrow mt-5 text-foreground/70">Day scaling program</p>
            </div>
            <div
              data-anim="rise"
              data-delay="1100"
              className="flex flex-col justify-between gap-7 pt-9 pb-12 lg:pl-9"
            >
              <p className="text-[17px] leading-7 text-foreground/80">
                Our operating knowledge plus AI for everything that can run without you.
              </p>
              <Button className="mt-2 w-full justify-between">
                Book a strategy call
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
