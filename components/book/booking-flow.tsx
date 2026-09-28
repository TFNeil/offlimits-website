"use client"

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react"
import Link from "next/link"
import { ArrowRight, CalendarPlus, Download } from "lucide-react"
import { cn } from "cn"

import { submitBooking } from "@/app/book/actions"
import { ChoiceGroup } from "@/components/book/choice-group"
import { formatTime, TimePicker } from "@/components/book/time-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BUSINESS_TYPES,
  CALL_MINUTES,
  fromDateKey,
  googleCalendarUrl,
  icsFile,
  isValidEmail,
  isValidPhone,
  REVENUE_BANDS,
  slotStart,
  STAFF_SIZES,
} from "@/lib/booking"

type Step = 1 | 2 | 3 | 4

// crypto.randomUUID only exists in secure contexts (https, localhost), so
// testing over plain http on a LAN address needs the fallback.
const newBookingId = () =>
  typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
const STEP_LABELS = ["You", "Your business", "Time"]

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  business: "",
  businessType: "",
  staff: "",
  revenue: "",
  web: "",
}

export function BookingFlow() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState(EMPTY)
  const [day, setDay] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  // Reused on "Change time", so the new slot replaces the first booking downstream.
  const [bookingId] = useState(newBookingId)

  const set = (field: keyof typeof EMPTY) => (value: string) => setForm((f) => ({ ...f, [field]: value }))
  const start = day && time ? slotStart(day, time) : null
  const timeZone = typeof window === "undefined" ? "" : Intl.DateTimeFormat().resolvedOptions().timeZone

  const canContinue = {
    1: form.name.trim() !== "" && isValidEmail(form.email) && isValidPhone(form.phone),
    2: form.business.trim() !== "" && !!form.businessType && !!form.staff && !!form.revenue,
    3: !!start,
  }

  // Each new step fades up, the page returns to the top, and focus moves to
  // the step's heading so screen readers announce it.
  const stepRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const el = stepRef.current
    if (!el) return
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!reduceMotion) {
      el.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], {
        duration: 500,
        easing: "cubic-bezier(.2,.7,0,1)",
      })
    }
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
    el.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true })
  }, [step])

  const goTo = (next: Step) => {
    setError(null)
    setStep(next)
  }
  const advance = (event: FormEvent) => {
    event.preventDefault()
    if (step < 3 && canContinue[step as 1 | 2]) goTo((step + 1) as Step)
  }
  const confirm = () => {
    if (!start) return
    setError(null)
    startTransition(async () => {
      const result = await submitBooking({ id: bookingId, ...form, start: start.toISOString(), timeZone })
      if (result.ok) goTo(4)
      else setError(result.error)
    })
  }

  return (
    <>
      <StepProgress step={step} />
      <div ref={stepRef}>
        {step === 1 && (
          <form onSubmit={advance} noValidate>
            <StepHeading title="About you" subtitle="So we know who we're talking to." />
            <div className="flex flex-col gap-5">
              <Field id="f-name" label="Full name" autoComplete="name" value={form.name} onChange={set("name")} />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
                <Field id="f-email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} />
                <Field id="f-phone" label="Phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
              </div>
            </div>
            <Actions>
              <ContinueButton disabled={!canContinue[1]}>Continue</ContinueButton>
            </Actions>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={advance} noValidate>
            <StepHeading title="Your business" subtitle="Four quick answers so the call starts with your numbers." />
            <div className="flex flex-col gap-7">
              <Field id="f-biz" label="Business name" autoComplete="organization" value={form.business} onChange={set("business")} />
              <ChoiceGroup legend="Business type" name="businessType" options={BUSINESS_TYPES} value={form.businessType} onChange={set("businessType")} />
              <ChoiceGroup legend="Staff or chairs" name="staff" options={STAFF_SIZES} value={form.staff} onChange={set("staff")} minTileWidth={100} />
              <ChoiceGroup legend="Monthly revenue" name="revenue" options={REVENUE_BANDS} value={form.revenue} onChange={set("revenue")} />
              <Field
                id="f-web"
                label={
                  <>
                    Instagram or website <span className="opacity-80">(optional)</span>
                  </>
                }
                placeholder="@yoursalon or yoursalon.com"
                value={form.web}
                onChange={set("web")}
              />
            </div>
            <Actions>
              <ContinueButton disabled={!canContinue[2]}>Continue</ContinueButton>
              <BackButton onClick={() => goTo(1)} />
            </Actions>
          </form>
        )}

        {step === 3 && (
          <>
            <StepHeading
              title="Pick a time"
              subtitle={`${CALL_MINUTES} minutes, by video. Times shown in ${timeZone.replace(/_/g, " ")}.`}
            />
            <TimePicker
              day={day}
              time={time}
              onDayChange={(next) => {
                setDay(next)
                setTime(null)
              }}
              onTimeChange={setTime}
            />
            <Actions>
              <ContinueButton type="button" disabled={!canContinue[3] || pending} onClick={confirm}>
                {pending ? "Booking…" : "Confirm booking"}
              </ContinueButton>
              <BackButton onClick={() => goTo(2)} />
              {start && (
                <span className="text-[15px] font-semibold">
                  {start.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}, {formatTime(start)}
                </span>
              )}
              {error && (
                <p role="alert" className="w-full text-[15px] font-semibold text-destructive">
                  {error}
                </p>
              )}
            </Actions>
          </>
        )}

        {step === 4 && start && day && (
          <Confirmation
            booking={{ id: bookingId, ...form }}
            start={start}
            day={day}
            timeZone={timeZone}
            onReschedule={() => goTo(3)}
          />
        )}
      </div>
    </>
  )
}

function StepProgress({ step }: { step: Step }) {
  return (
    <ol aria-label="Booking steps" className="mb-10 grid grid-cols-3 gap-2">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1
        const reached = step >= n
        const active = step === n
        return (
          <li key={label} aria-current={active ? "step" : undefined} className="flex flex-col gap-2.5">
            <span aria-hidden className={cn(reached ? "h-1 bg-brand" : "mt-0.5 h-0.5 bg-divider")} />
            <span
              className={cn(
                "text-xs tracking-[0.08em] uppercase tabular-nums",
                active ? "font-extrabold text-foreground" : "text-foreground/70",
              )}
            >
              0{n} {label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h2 tabIndex={-1} className="mb-2 font-heading text-[32px] leading-[1.12] font-extrabold tracking-[-0.015em] outline-none">
        {title}
      </h2>
      <p className="mb-7 text-[15px] text-foreground/70">{subtitle}</p>
    </>
  )
}

function Field({
  id,
  label,
  onChange,
  ...input
}: {
  id: string
  label: ReactNode
  value: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
  placeholder?: string
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5">
        {label}
      </Label>
      <Input id={id} className="h-12 text-base md:text-base" onChange={(e) => onChange(e.target.value)} {...input} />
    </div>
  )
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="mt-9 flex flex-wrap items-center gap-3 border-t-2 pt-6">{children}</div>
}

function ContinueButton({ children, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button type="submit" className="min-h-12 min-w-[200px] justify-between" {...props}>
      {children}
      <ArrowRight />
    </Button>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" variant="outline" className="min-h-12" onClick={onClick}>
      Back
    </Button>
  )
}

function Confirmation({
  booking,
  start,
  day,
  timeZone,
  onReschedule,
}: {
  booking: { id: string; name: string; email: string; business: string }
  start: Date
  day: string
  timeZone: string
  onReschedule: () => void
}) {
  const end = new Date(start.getTime() + CALL_MINUTES * 60_000)

  const downloadIcs = () => {
    const url = URL.createObjectURL(new Blob([icsFile(booking, start)], { type: "text/calendar" }))
    const link = document.createElement("a")
    link.href = url
    link.download = "offlimits-strategy-call.ics"
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <>
      <span aria-hidden className="mb-5 block size-3.5 bg-brand" />
      <h2
        tabIndex={-1}
        className="-ml-[0.04em] font-heading text-[clamp(40px,5vw,56px)] leading-none font-extrabold tracking-[-0.025em] outline-none"
      >
        You&apos;re booked.
      </h2>
      <dl className="mt-9 border-t-2">
        <DetailRow term="When">
          <p className="font-heading text-[22px] font-extrabold">
            {fromDateKey(day).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <p className="mt-1 text-base">
            {formatTime(start)} – {formatTime(end)}, {timeZone.replace(/_/g, " ")}
          </p>
        </DetailRow>
        <DetailRow term="Where">
          <p className="text-base leading-6">
            Video call. The link is on its way to <strong>{booking.email}</strong>.
          </p>
        </DetailRow>
        <DetailRow term="For">
          <p className="text-base leading-6">
            {booking.name}, {booking.business}
          </p>
        </DetailRow>
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          nativeButton={false}
          render={<a href={googleCalendarUrl(booking, start)} target="_blank" rel="noopener noreferrer" />}
          className="min-h-12 min-w-[240px] justify-between"
        >
          Add to Google Calendar
          <CalendarPlus />
        </Button>
        <Button variant="outline" className="min-h-12 justify-between gap-3" onClick={downloadIcs}>
          Apple / Outlook (.ics)
          <Download />
        </Button>
      </div>
      <div className="mt-7 flex flex-wrap gap-6 text-[15px]">
        <Link href="/" className="underline underline-offset-3 hover:text-brand">
          Back to OFFLIMITS AI
        </Link>
        <button
          type="button"
          onClick={onReschedule}
          className="cursor-pointer underline underline-offset-3 hover:text-brand"
        >
          Change time
        </button>
      </div>
    </>
  )
}

function DetailRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-b-2 py-4.5">
      <dt className="pt-1 text-xs tracking-[0.08em] text-foreground/70 uppercase">{term}</dt>
      <dd>{children}</dd>
    </div>
  )
}
