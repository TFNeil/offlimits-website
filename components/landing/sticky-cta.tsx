"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

/**
 * Mobile-only booking bar pinned to the bottom of the screen. It slides up
 * once the hero's own button has scrolled away, and back down when the
 * closing banner (which has its own button) comes into view.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector("[data-hero]")
    const close = document.querySelector("[data-close]")
    if (!hero || !close) return
    const onScreen = new Map<Element, boolean>([
      [hero, true],
      [close, false],
    ])
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) onScreen.set(entry.target, entry.isIntersecting)
      setVisible(!onScreen.get(hero) && !onScreen.get(close))
    })
    io.observe(hero)
    io.observe(close)
    return () => io.disconnect()
  }, [])

  return (
    <div
      inert={!visible}
      className={cn(
        "gutter fixed inset-x-0 bottom-0 z-10 border-t-2 bg-background pt-3 pb-5 transition-transform duration-320 ease-[cubic-bezier(.2,.7,0,1)] motion-reduce:transition-none lg:hidden",
        visible ? "translate-y-0" : "translate-y-[110%]",
      )}
    >
      <Button nativeButton={false} render={<Link href="/book" />} className="min-h-13 w-full justify-between">
        Book a strategy call
        <ArrowRight />
      </Button>
    </div>
  )
}
