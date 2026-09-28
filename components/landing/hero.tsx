import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/landing/primitives"

const WORDMARK = "OFFLIMITS".split("")

export function Hero() {
  return (
    <Container>
      {/* data-hero: the mobile sticky CTA stays hidden while this is on screen. */}
      <section data-hero className="@container pt-9 pb-12 lg:pt-18 lg:pb-0">
        {/*
         * Sized so "OFFLIMITS." exactly fills the column at any width, up to the
         * desktop maximum. Each letter slides up out of the clipped line, then the
         * red full stop drops in.
         */}
        <p className="-ml-[0.06em] flex overflow-hidden pb-[0.04em] font-heading text-[length:min(196px,100cqw/5.75)] leading-[0.86] font-extrabold tracking-[-0.045em] whitespace-nowrap">
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

        <div className="mt-8 lg:mt-16">
          <div data-anim="draw" data-delay="600" data-dur="1200" className="h-0.5 origin-left bg-divider" />
          {/* Mobile: one stacked column. Desktop: three ruled cells. */}
          <div className="lg:grid lg:grid-cols-3">
            <div data-anim="rise" data-delay="800" className="pt-6 lg:border-r-2 lg:pt-9 lg:pr-9 lg:pb-12">
              <h1 className="font-heading text-[34px] leading-[1.06] font-extrabold tracking-[-0.02em] lg:text-[40px] lg:leading-[1.05]">
                We scale service businesses.
              </h1>
            </div>
            <div
              data-anim="rise"
              data-delay="950"
              className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] items-end gap-5 border-y-2 py-6 lg:mt-0 lg:block lg:border-y-0 lg:border-r-2 lg:px-9 lg:pt-9 lg:pb-12"
            >
              <p className="font-heading text-[88px] leading-[0.8] font-extrabold tracking-[-0.04em] text-brand tabular-nums lg:text-[120px]">
                <span data-count="1400" data-delay="950">
                  90
                </span>
              </p>
              <p className="eyebrow leading-[18px] text-foreground/70 lg:mt-5 lg:leading-[inherit]">
                Day scaling program
              </p>
            </div>
            <div
              data-anim="rise"
              data-delay="1100"
              className="flex flex-col gap-6 pt-6 lg:justify-between lg:gap-7 lg:pt-9 lg:pb-12 lg:pl-9"
            >
              <p className="text-[17px] leading-[27px] text-foreground/80 lg:leading-7">
                Our operating knowledge plus AI for everything that can run without you.
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/book" />}
                className="min-h-13 w-full justify-between lg:mt-2 lg:min-h-0"
              >
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
