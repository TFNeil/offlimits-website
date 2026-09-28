import { SectionHeading } from "@/components/landing/primitives"

/**
 * The case studies below are the design mock's sample content (its
 * `showExamples` toggle). Replace them with real client results, or set
 * this to false, before launch.
 */
const SHOW_EXAMPLES = true

const AUDIENCES = ["Nail salons", "Hair salons", "Studios and clinics", "Agencies"]

const CASE_STUDIES = [
  {
    kind: "Nail salon",
    name: "Lumi Nail Studio, 6 techs",
    stats: [
      { value: "4%", label: "No-shows, from 18%" },
      { value: "+38%", label: "Monthly revenue" },
    ],
    summary: "Missed-call text-back and deposit holds filled the gaps in the book within six weeks.",
  },
  {
    kind: "Hair salon",
    name: "Crown & Co., 2 locations",
    stats: [
      { value: "72%", label: "Rebooking, from 41%" },
      { value: "−17h", label: "Admin per week" },
    ],
    summary: "Automated rebooking and reminders freed the front desk to sell retail and fill cancellations.",
  },
]

export function Audience() {
  return (
    <section
      id="who"
      className="scroll-mt-15 pt-14 pb-16 lg:grid lg:scroll-mt-0 lg:grid-cols-3 lg:gap-9 lg:pt-21 lg:pb-28"
    >
      <div>
        <SectionHeading eyebrow="Who it's for" title="Booked, busy and stuck." className="mb-6 lg:mb-8" />
        <ul className="flex flex-col border-t-2">
          {AUDIENCES.map((audience, i) => (
            <li
              key={audience}
              data-anim="slide"
              data-delay={100 + i * 80}
              className="border-b-2 py-3.5 font-heading text-[22px] font-extrabold"
            >
              {audience}
            </li>
          ))}
        </ul>
      </div>

      {/* Stacked under the list on mobile; the cards become grid cells on desktop. */}
      {SHOW_EXAMPLES && (
        <div className="mt-8 flex flex-col gap-4 lg:contents">
          {CASE_STUDIES.map((study, i) => {
            const delay = 150 + i * 150
            return (
              <article
                key={study.name}
                data-anim="rise"
                data-delay={delay}
                className="flex flex-col gap-5 bg-card p-3 lg:gap-7"
              >
                <span className="text-[10px] tracking-[0.1em] text-brand uppercase">{study.kind}</span>
                <h3 className="font-heading text-[17px] leading-[1.2] font-extrabold">{study.name}</h3>
                <div className="grid grid-cols-2 gap-4 border-t-2 pt-5 lg:gap-5 lg:pt-6">
                  {study.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-[40px] leading-none font-extrabold text-brand lg:text-5xl">
                        <span data-count="1200" data-delay={delay + 250}>
                          {stat.value}
                        </span>
                      </p>
                      <p className="mt-2 text-xs tracking-[0.08em] text-foreground/70 uppercase lg:mt-2.5 lg:text-[13px]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="flex-1 text-[13px] opacity-80">{study.summary}</p>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
