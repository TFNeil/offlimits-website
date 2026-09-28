import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/landing/primitives"

/**
 * The one place the accent runs as a full field: the closing poster statement.
 * data-close: the mobile sticky CTA hides while this is on screen.
 */
export function ClosingCta() {
  return (
    <section data-close className="bg-brand text-background">
      <Container className="pt-16 pb-18 lg:grid lg:grid-cols-3 lg:items-end lg:gap-9 lg:py-24">
        {/* The line break moves: "Your limits / are off limits." on mobile, "Your limits are / off limits." on desktop. */}
        <h2 className="-ml-[0.058em] font-heading text-5xl leading-none font-extrabold tracking-[-0.025em] lg:col-span-2 lg:text-[clamp(44px,5.6vw,72px)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-anim="mask" className="block">
              Your limits<span className="max-lg:hidden"> are</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-anim="mask" data-delay="140" className="block">
              <span className="lg:hidden">are </span>off limits.
            </span>
          </span>
        </h2>
        <Button
          variant="outline"
          data-anim="rise"
          data-delay="400"
          className="mt-9 min-h-13 w-full justify-between border-background bg-transparent px-1 text-background hover:bg-background/10 hover:text-background active:bg-background/20 lg:mt-2 lg:min-h-0"
        >
          Book a strategy call
          <ArrowRight />
        </Button>
      </Container>
    </section>
  )
}
