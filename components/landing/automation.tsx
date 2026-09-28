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
    <section id="auto" className="pt-21 pb-24">
      <SectionHeading eyebrow="What we automate" title="Before and after." className="mb-12" />
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
    </section>
  )
}
