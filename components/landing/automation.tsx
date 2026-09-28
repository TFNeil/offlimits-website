import { SectionHeading } from "@/components/landing/primitives"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ROWS = [
  { task: "Missed calls", today: "Lost to voicemail", after: "Texted back in under a minute, then booked" },
  { task: "Booking", today: "Phone and DMs, when the desk is free", after: "24/7 by text, DM or web, synced to your calendar" },
  { task: "No-shows", today: "Reminders when someone remembers", after: "Automatic reminders, confirmations and deposits" },
  { task: "Rebooking", today: "Asked at checkout, sometimes", after: "Prompted every visit, followed up if skipped" },
  { task: "Reviews", today: "Rare", after: "Requested after every appointment" },
  { task: "Reporting", today: "Spreadsheet, end of month", after: "On your phone, every morning" },
]

const headClass =
  "h-auto p-2 text-[11px] font-normal tracking-[0.08em] text-foreground/60 uppercase"
const cellClass = "border-b p-2 whitespace-normal"

export function Automation() {
  return (
    <section id="auto" className="scroll-mt-15 pt-14 pb-16 lg:scroll-mt-0 lg:pt-21 lg:pb-24">
      <SectionHeading eyebrow="What we automate" title="Before and after." className="mb-7 lg:mb-12" />

      {/* Mobile: one ruled block per task. */}
      <ul className="flex flex-col border-t-2 lg:hidden">
        {ROWS.map((row) => (
          <li key={row.task} data-anim="rise" className="flex flex-col gap-3 border-b-2 py-5">
            <h3 className="font-heading text-xl font-extrabold">{row.task}</h3>
            <dl className="grid grid-cols-[76px_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[15px] leading-[22px]">
              <dt className="pt-px text-xs tracking-[0.08em] text-foreground/70 uppercase">Today</dt>
              <dd className="text-foreground/70">{row.today}</dd>
              <dt className="pt-px text-xs font-extrabold tracking-[0.08em] text-brand-700 uppercase">After</dt>
              <dd className="font-semibold">{row.after}</dd>
            </dl>
          </li>
        ))}
      </ul>

      {/* Desktop: the before/after table. */}
      <div className="max-lg:hidden">
        <Table className="text-[14px]">
          <TableHeader>
            <TableRow data-anim="fade" className="border-b-2 hover:bg-transparent">
              <TableHead className={`${headClass} w-[22%]`}>Task</TableHead>
              <TableHead className={`${headClass} w-[36%]`}>Today</TableHead>
              <TableHead className={headClass}>With OFFLIMITS AI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((row, i) => (
              <TableRow key={row.task} data-anim="rise" data-delay={i * 90} className="hover:bg-brand-100">
                <TableCell className={`${cellClass} font-extrabold`}>{row.task}</TableCell>
                <TableCell className={cellClass}>{row.today}</TableCell>
                <TableCell className={cellClass}>{row.after}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
