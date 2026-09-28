/*
 * Booking rules shared by the /book form (display) and the server action
 * (re-validation). Slot times are wall-clock times in the visitor's own time
 * zone, as in the design.
 */

export const BUSINESS_TYPES = [
  "Nail salon",
  "Hair salon",
  "Barbershop",
  "Med spa",
  "Lash / brow studio",
  "Other service",
] as const
export const STAFF_SIZES = ["1–3", "4–8", "9–15", "16+"] as const
export const REVENUE_BANDS = ["Under $20k", "$20k–50k", "$50k–100k", "$100k+"] as const

export const CALL_MINUTES = 30
/** Bookable days: weekdays from tomorrow through this many days ahead. */
export const WINDOW_DAYS = 28
/** "09:00" … "16:30", every half hour. */
export const SLOT_TIMES = Array.from({ length: 16 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2)
  return `${String(hour).padStart(2, "0")}:${i % 2 ? "30" : "00"}`
})

export type Booking = {
  /** Stable per visit, so a rescheduled booking can replace the first one downstream. */
  id: string
  name: string
  email: string
  phone: string
  business: string
  businessType: string
  staff: string
  revenue: string
  web: string
  /** ISO 8601 start instant. */
  start: string
  /** The visitor's IANA time zone, e.g. "America/Los_Angeles". */
  timeZone: string
}

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
export const isValidPhone = (phone: string) => phone.replace(/\D/g, "").length >= 7

/** "2026-10-06" for a local date. */
export function dateKey(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function fromDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, m - 1, d)
}

/** Keys of the bookable days, in order. */
export function bookableDays(today = new Date()) {
  const days: string[] = []
  for (let i = 1; i <= WINDOW_DAYS; i++) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    if (day.getDay() !== 0 && day.getDay() !== 6) days.push(dateKey(day))
  }
  return days
}

/** Local start time for a picked day + "HH:MM" slot. */
export function slotStart(day: string, time: string) {
  const start = fromDateKey(day)
  const [h, m] = time.split(":").map(Number)
  start.setHours(h, m, 0, 0)
  return start
}

const MAX_LENGTH = 200
const isText = (value: unknown, required = true): value is string =>
  typeof value === "string" && value.length <= MAX_LENGTH && (!required || value.trim().length > 0)

/** Server-side check of everything the form enforces. Returns a problem, or null if valid. */
export function bookingProblem(b: Partial<Booking>, now = new Date()): string | null {
  if (!isText(b.id) || !isText(b.name) || !isText(b.business) || !isText(b.web, false)) {
    return "Some details are missing."
  }
  if (!isText(b.email) || !isValidEmail(b.email)) return "That email address doesn't look right."
  if (!isText(b.phone) || !isValidPhone(b.phone)) return "That phone number doesn't look right."
  const choices: [unknown, readonly string[]][] = [
    [b.businessType, BUSINESS_TYPES],
    [b.staff, STAFF_SIZES],
    [b.revenue, REVENUE_BANDS],
  ]
  if (choices.some(([value, options]) => !options.includes(value as string))) {
    return "Some details are missing."
  }

  const start = new Date(typeof b.start === "string" ? b.start : NaN)
  const latest = now.getTime() + (WINDOW_DAYS + 1) * 24 * 60 * 60 * 1000
  if (isNaN(start.getTime()) || start <= now || start.getTime() > latest) {
    return "That time is no longer available."
  }
  // The slot must be a weekday half-hour between 9:00 and 16:30 on the visitor's own clock.
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: b.timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(start)
    const part = (type: string) => parts.find((p) => p.type === type)?.value
    const localTime = `${part("hour")}:${part("minute")}`
    if (["Sat", "Sun"].includes(part("weekday") ?? "") || !SLOT_TIMES.includes(localTime)) {
      return "That time is no longer available."
    }
  } catch {
    return "That time is no longer available."
  }
  return null
}

// Calendar hand-offs for the confirmation screen.

const CALL_TITLE = "OFFLIMITS AI strategy call"
const utcStamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")

function callDetails(b: Pick<Booking, "business" | "email">) {
  return `${CALL_MINUTES}-minute strategy call for ${b.business || "your business"}. Video link sent to ${b.email}.`
}

export function googleCalendarUrl(b: Pick<Booking, "business" | "email">, start: Date) {
  const end = new Date(start.getTime() + CALL_MINUTES * 60_000)
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: CALL_TITLE,
    dates: `${utcStamp(start)}/${utcStamp(end)}`,
    details: callDetails(b),
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

/** RFC 5545 text escaping: backslash, semicolon, comma and newlines. */
const icsText = (text: string) => text.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n")

export function icsFile(b: Pick<Booking, "id" | "business" | "email">, start: Date) {
  const end = new Date(start.getTime() + CALL_MINUTES * 60_000)
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OFFLIMITS AI//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${b.id}@offlimits.ai`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(start)}`,
    `DTEND:${utcStamp(end)}`,
    `SUMMARY:${icsText(CALL_TITLE)}`,
    `DESCRIPTION:${icsText(callDetails(b))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")
}
