import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { BookingFlow } from "@/components/book/booking-flow"

export const metadata: Metadata = {
  title: "Book a strategy call · OFFLIMITS AI",
  description:
    "A free 30-minute video call: we look at your numbers and tell you what to fix first, what to automate and whether the 90-day program fits.",
}

const FACTS = [
  { value: "30 min", label: "Length" },
  { value: "Video", label: "Format" },
  { value: "Free", label: "Cost" },
]

export default function BookPage() {
  return (
    <div className="min-h-dvh">
      <nav className="gutter flex items-center justify-between gap-4 border-b-2 py-3">
        <Link href="/" className="font-heading text-lg font-extrabold hover:text-brand">
          OFFLIMITS AI
        </Link>
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm hover:text-brand">
          <ArrowLeft className="size-4" />
          Back to site
        </Link>
      </nav>

      <main className="gutter mx-auto flex max-w-[1200px] flex-wrap items-start gap-x-24 gap-y-12 pt-[clamp(36px,6vw,72px)] pb-24">
        <aside className="max-w-[420px] flex-[1_1_300px]">
          <span className="eyebrow mb-4 block text-brand-700">Strategy call</span>
          <h1 className="-ml-[0.05em] font-heading text-[clamp(40px,5.4vw,64px)] leading-none font-extrabold tracking-[-0.025em]">
            Book a strategy call<span className="text-brand">.</span>
          </h1>
          <dl className="mt-8 grid grid-cols-3 border-t-2">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col-reverse pt-3.5 not-last:border-r-2 not-first:pl-3 not-last:pr-3"
              >
                <dt className="mt-1 text-xs tracking-[0.08em] text-foreground/70 uppercase">{fact.label}</dt>
                <dd className="font-heading text-[22px] font-extrabold">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 max-w-[40ch] text-base leading-[26px] text-foreground/78">
            We look at your numbers and tell you what to fix first, what to automate and whether the 90-day
            program fits.
          </p>
        </aside>

        <section aria-label="Booking form" className="min-w-0 flex-[2_1_460px]">
          <BookingFlow />
        </section>
      </main>
    </div>
  )
}
