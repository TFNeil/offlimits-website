import { Fragment } from "react"

const TASKS = ["Booking", "Missed calls", "No-shows", "Rebooking", "Reviews", "Reporting"]

function TaskRun() {
  return (
    <div className="flex items-center gap-7 pr-7 font-heading text-[22px] font-extrabold tracking-[-0.01em] whitespace-nowrap lg:gap-10 lg:pr-10 lg:text-[28px]">
      {TASKS.map((task) => (
        <Fragment key={task}>
          <span>{task}</span>
          <span className="size-2 shrink-0 bg-brand lg:size-2.5" />
        </Fragment>
      ))}
    </div>
  )
}

/** Endless ticker of what gets automated. Two identical runs make the -50% loop seamless. */
export function Marquee() {
  return (
    <div aria-hidden className="overflow-hidden border-y-2 py-4 lg:py-5">
      <div data-marquee="40000" className="flex w-max">
        <TaskRun />
        <TaskRun />
      </div>
    </div>
  )
}
