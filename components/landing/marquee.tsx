import { Fragment } from "react"

const TASKS = ["Booking", "Missed calls", "No-shows", "Rebooking", "Reviews", "Reporting"]

function TaskRun() {
  return (
    <div className="flex items-center gap-10 pr-10 font-heading text-[28px] font-extrabold tracking-[-0.01em] whitespace-nowrap">
      {TASKS.map((task) => (
        <Fragment key={task}>
          <span>{task}</span>
          <span className="size-2.5 shrink-0 bg-brand" />
        </Fragment>
      ))}
    </div>
  )
}

/** Endless ticker of what gets automated. Two identical runs make the -50% loop seamless. */
export function Marquee() {
  return (
    <div aria-hidden className="overflow-hidden border-y-2 py-5">
      <div data-marquee="40000" className="flex w-max">
        <TaskRun />
        <TaskRun />
      </div>
    </div>
  )
}
