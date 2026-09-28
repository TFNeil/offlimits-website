"use server"

import { bookingProblem, CALL_MINUTES, type Booking } from "@/lib/booking"

export type BookingResult = { ok: true } | { ok: false; error: string }

const FAILED = "We couldn't confirm your booking just now. Please try again in a minute."

/**
 * Validates a booking and forwards it as JSON to BOOKING_WEBHOOK_URL (an n8n,
 * Zapier or Make webhook, for example), which is responsible for putting it
 * on the calendar and emailing the video link.
 *
 * With no webhook configured, bookings succeed in development (logged to the
 * server console) but fail in production, so a lead is never silently lost.
 */
export async function submitBooking(booking: Booking): Promise<BookingResult> {
  const problem = bookingProblem(booking)
  if (problem) return { ok: false, error: problem }

  const webhook = process.env.BOOKING_WEBHOOK_URL
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("[book] BOOKING_WEBHOOK_URL is not set; booking was not delivered.")
      return { ok: false, error: FAILED }
    }
    console.info("[book] BOOKING_WEBHOOK_URL is not set; development booking not sent:", booking)
    return { ok: true }
  }

  const start = new Date(booking.start)
  const payload = {
    ...booking,
    end: new Date(start.getTime() + CALL_MINUTES * 60_000).toISOString(),
    submittedAt: new Date().toISOString(),
  }
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) throw new Error(`webhook responded ${response.status}`)
  } catch (error) {
    console.error("[book] Booking webhook failed:", error)
    return { ok: false, error: FAILED }
  }
  return { ok: true }
}
