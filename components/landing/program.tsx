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
    <section id="do" className="pt-21 pb-24">
      <div className="mb-14 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-x-9 gap-y-6">
        <SectionHeading eyebrow="What we do" title="Fix. Automate. Scale." />
        <p data-anim="rise" data-delay="120" className="max-w-[52ch] text-[17px] leading-7 text-foreground/78">
          Three phases, thirty days each. We work inside your business, not beside it.
        </p>
      </div>

      {/* Timeline: the line draws across, then each phase's marker pops as it's reached. */}
      <div className="relative">
        <div
          data-anim="draw"
          data-dur="1600"
          className="absolute inset-x-0 top-1 h-0.5 origin-left bg-foreground"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-y-12">
          {PHASES.map((phase, i) => (
            <div key={phase.days} className="relative flex flex-col gap-4 pr-9">
              <span data-anim="pop" data-delay={100 + i * 500} className="size-2.5 bg-brand" />
              <div data-anim="rise" data-delay={200 + i * 500} className="flex flex-col gap-4">
                <p className="eyebrow mt-2 text-foreground/70 tabular-nums">{phase.days}</p>
                <h3 className="font-heading text-[28px] leading-[1.12] font-extrabold tracking-[-0.01em]">
                  {phase.title}
                </h3>
                <p className="text-base leading-[26px] text-foreground/78">{phase.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
