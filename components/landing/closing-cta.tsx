import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/landing/primitives"

const LINES = ["Your limits are", "off limits."]

/** The one place the accent runs as a full field: the closing poster statement. */
export function ClosingCta() {
  return (
    <section className="bg-brand text-background">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-9 py-24">
        <h2 className="col-span-full -ml-[0.058em] font-heading text-[clamp(44px,5.6vw,72px)] leading-none font-extrabold tracking-[-0.025em] lg:col-span-2">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span data-anim="mask" data-delay={i * 140} className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>
        <Button
          variant="outline"
          data-anim="rise"
          data-delay="400"
          className="mt-2 w-full justify-between border-background bg-transparent px-1 text-background hover:bg-background/10 hover:text-background active:bg-background/20"
        >
          Book a strategy call
          <ArrowRight />
        </Button>
      </Container>
    </section>
  )
}
