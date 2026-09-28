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
    <section id="who" className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-9 pt-21 pb-28">
      <div>
        <SectionHeading eyebrow="Who it's for" title="Booked, busy and stuck." className="mb-8" />
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

      {SHOW_EXAMPLES &&
        CASE_STUDIES.map((study, i) => {
          const delay = 150 + i * 150
          return (
            <article key={study.name} data-anim="rise" data-delay={delay} className="flex flex-col gap-7 bg-card p-3">
              <span className="text-[10px] tracking-[0.1em] text-brand uppercase">{study.kind}</span>
              <h3 className="font-heading text-[17px] leading-[1.2] font-extrabold">{study.name}</h3>
              <div className="grid grid-cols-2 gap-5 border-t-2 pt-6">
                {study.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-5xl leading-none font-extrabold text-brand">
                      <span data-count="1200" data-delay={delay + 250}>
                        {stat.value}
                      </span>
                    </p>
                    <p className="eyebrow mt-2.5 text-foreground/70">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="flex-1 text-[13px] opacity-80">{study.summary}</p>
            </article>
          )
        })}
    </section>
  )
}
