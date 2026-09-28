import { SectionHeading } from "@/components/landing/primitives"

const PHASES = [
  {
    days: "Day 1–30",
    title: "Fix the foundation",
    body: "Pricing, services, schedule and staffing, audited and corrected.",
  },
  {
    days: "Day 31–60",
    title: "Automate the busywork",
    body: "Booking, follow-up, reminders and reviews handed to AI.",
  },
  {
    days: "Day 61–90",
    title: "Scale",
    body: "More clients per hour worked. Tuned weekly until the numbers hold.",
  },
]

export function Program() {
  return (
    <section id="do" className="scroll-mt-15 pt-14 pb-16 lg:scroll-mt-0 lg:pt-21 lg:pb-24">
      <div className="mb-10 grid gap-4 lg:mb-14 lg:grid-cols-2 lg:items-end lg:gap-x-9 lg:gap-y-6">
        <SectionHeading eyebrow="What we do" title="Fix. Automate. Scale." />
        <p
          data-anim="rise"
          data-delay="120"
          className="max-w-[52ch] text-base leading-[26px] text-foreground/78 lg:text-[17px] lg:leading-7"
        >
          Three phases, thirty days each. We work inside your business, not beside it.
        </p>
      </div>

      {/*
       * Timeline: the line draws down (mobile) or across (desktop), then each
       * phase's marker pops as it's reached.
       */}
      <div className="relative flex flex-col gap-10 pl-8 lg:grid lg:grid-cols-3 lg:gap-0 lg:pl-0">
        <div
          aria-hidden
          data-anim="drawY"
          data-dur="1600"
          className="absolute top-1 bottom-0 left-1 w-0.5 origin-top bg-foreground lg:hidden"
        />
        <div
          aria-hidden
          data-anim="draw"
          data-dur="1600"
          className="absolute inset-x-0 top-1 h-0.5 origin-left bg-foreground max-lg:hidden"
        />
        {PHASES.map((phase, i) => (
          <div key={phase.days} className="relative flex flex-col gap-4 lg:pr-9">
            <span
              data-anim="pop"
              data-delay={100 + i * 500}
              className="absolute top-0 -left-8 size-2.5 bg-brand lg:static"
            />
            <div data-anim="rise" data-delay={200 + i * 500} className="flex flex-col gap-2.5 lg:gap-4">
              <p className="eyebrow leading-3 text-foreground/70 tabular-nums lg:mt-2 lg:leading-[inherit]">
                {phase.days}
              </p>
              <h3 className="font-heading text-2xl leading-[1.12] font-extrabold tracking-[-0.01em] lg:text-[28px]">
                {phase.title}
              </h3>
              <p className="text-base leading-[26px] text-foreground/78">{phase.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
