"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { bookableDays, dateKey, fromDateKey, SLOT_TIMES, slotStart } from "@/lib/booking"

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

export const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })

const monthHeading = "flex items-center border-b-2 pb-3 font-heading text-xl font-extrabold"

/** Month calendar of bookable weekdays, then that day's half-hour slots. */
export function TimePicker({
  day,
  time,
  onDayChange,
  onTimeChange,
}: {
  day: string | null
  time: string | null
  onDayChange: (day: string) => void
  onTimeChange: (time: string) => void
}) {
  const available = useMemo(() => bookableDays(), [])
  const today = new Date()
  // Open on the month of the picked day, or the current month.
  const [monthOffset, setMonthOffset] = useState(() => {
    if (!day) return 0
    const picked = fromDateKey(day)
    return (picked.getFullYear() - today.getFullYear()) * 12 + picked.getMonth() - today.getMonth()
  })

  const lastDay = fromDateKey(available.at(-1)!)
  const maxOffset = (lastDay.getFullYear() - today.getFullYear()) * 12 + lastDay.getMonth() - today.getMonth()
  const month = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
  const leadingBlanks = (month.getDay() + 6) % 7 // weeks start on Monday
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const pickedDate = day ? fromDateKey(day) : null

  return (
    <div className="flex flex-wrap gap-9">
      <div className="min-w-0 flex-[1_1_300px]">
        <div className={cn(monthHeading, "justify-between")}>
          <span aria-live="polite">{month.toLocaleDateString([], { month: "long", year: "numeric" })}</span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-11"
              aria-label="Previous month"
              disabled={monthOffset <= 0}
              onClick={() => setMonthOffset((m) => m - 1)}
            >
              <ChevronLeft className="size-4.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-11"
              aria-label="Next month"
              disabled={monthOffset >= maxOffset}
              onClick={() => setMonthOffset((m) => m + 1)}
            >
              <ChevronRight className="size-4.5" />
            </Button>
          </div>
        </div>
        <div aria-hidden className="mt-3 grid grid-cols-7 gap-1 text-xs tracking-[0.08em] text-foreground/70 uppercase">
          {WEEKDAYS.map((weekday) => (
            <span key={weekday}>{weekday}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {Array.from({ length: leadingBlanks }, (_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(month.getFullYear(), month.getMonth(), i + 1)
            const key = dateKey(date)
            const open = available.includes(key)
            const picked = key === day
            return (
              <button
                key={key}
                type="button"
                disabled={!open}
                aria-pressed={picked}
                aria-label={date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
                onClick={() => onDayChange(key)}
                className={cn(
                  "flex aspect-square min-h-11 items-start border-2 p-1.5 text-left text-[15px] tabular-nums transition-colors",
                  !open && "border-transparent opacity-35",
                  open && !picked && "cursor-pointer border-foreground font-extrabold hover:bg-brand-100",
                  picked && "border-brand bg-brand font-extrabold text-background",
                )}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
      </div>

      <div className="min-w-0 flex-[1_1_220px]">
        <div className={cn(monthHeading, "min-h-11")}>
          {pickedDate
            ? pickedDate.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })
            : "Open times"}
        </div>
        {day ? (
          <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2">
            {SLOT_TIMES.map((slot) => {
              const picked = slot === time
              return (
                <button
                  key={slot}
                  type="button"
                  aria-pressed={picked}
                  onClick={() => onTimeChange(slot)}
                  className={cn(
                    "min-h-11 cursor-pointer border-2 px-3 text-left text-[15px] font-semibold tabular-nums transition-colors",
                    picked ? "border-brand bg-brand text-background" : "border-divider hover:border-brand",
                  )}
                >
                  {formatTime(slotStart(day, slot))}
                </button>
              )
            })}
          </div>
        ) : (
          <p className="mt-4 text-[15px] leading-6 text-foreground/70">Pick a day to see open times.</p>
        )}
      </div>
    </div>
  )
}
