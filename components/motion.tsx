"use client"

import { useEffect, useRef, type ReactNode } from "react"

/*
 * Scroll-triggered entrance animations, driven by data attributes so the
 * sections themselves stay server components:
 *
 *   data-anim="rise|fade|mask|drop|draw|drawY|pop|slide"  keyframe to play
 *   data-delay / data-dur                          ms (defaults 0 / 900)
 *   data-count="1400"                              count a "90" / "+38%" up from 0 over N ms
 *   data-marquee="40000"                           loop translateX(0 → -50%) every N ms
 *
 * mask/drop wait for their parent to enter view (the parent clips them).
 * Anything already on screen starts immediately. Everything is skipped under
 * prefers-reduced-motion.
 */

const EASE = "cubic-bezier(.2,.7,0,1)"
const BOUNCE = "cubic-bezier(.3,1.6,.5,1)"

const KEYFRAMES: Record<string, Keyframe[]> = {
  rise: [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "none" }],
  fade: [{ opacity: 0 }, { opacity: 1 }],
  mask: [{ transform: "translateY(105%)" }, { transform: "none" }],
  drop: [{ transform: "translateY(-120%)", opacity: 0 }, { transform: "none", opacity: 1 }],
  draw: [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
  drawY: [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
  pop: [{ transform: "scale(0)" }, { transform: "scale(1.6)", offset: 0.6 }, { transform: "scale(1)" }],
  slide: [{ opacity: 0, transform: "translateX(-24px)" }, { opacity: 1, transform: "none" }],
}

export function Motion({ className, children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const anims: Animation[] = []
    const counters: { node: Text; final: string; raf: number; timer: number }[] = []
    // Element to observe → what to start when it scrolls into view.
    const pending = new Map<Element, (() => void)[]>()
    const onEnter = (target: Element, fn: () => void) => {
      pending.set(target, [...(pending.get(target) ?? []), fn])
    }

    el.querySelectorAll<HTMLElement>("[data-anim]").forEach((node) => {
      const kind = node.dataset.anim!
      const keyframes = KEYFRAMES[kind]
      if (!keyframes) return
      const anim = node.animate(keyframes, {
        duration: Number(node.dataset.dur ?? 900),
        delay: Number(node.dataset.delay ?? 0),
        easing: kind === "drop" ? BOUNCE : EASE,
        fill: "both",
      })
      anim.pause()
      anims.push(anim)
      const target = kind === "mask" || kind === "drop" ? node.parentElement! : node
      onEnter(target, () => anim.play())
    })

    el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
      const text = node.firstChild
      if (!(text instanceof Text)) return
      const final = text.nodeValue ?? ""
      const match = final.match(/^(\D*)(\d+)(.*)$/)
      if (!match) return
      const [, pre, num, post] = match
      const counter = { node: text, final, raf: 0, timer: 0 }
      counters.push(counter)
      onEnter(node, () => {
        text.nodeValue = `${pre}0${post}`
        counter.timer = window.setTimeout(() => {
          const duration = Number(node.dataset.count)
          const start = performance.now()
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            text.nodeValue = p < 1 ? `${pre}${Math.round(Number(num) * eased)}${post}` : final
            if (p < 1) counter.raf = requestAnimationFrame(step)
          }
          counter.raf = requestAnimationFrame(step)
        }, Number(node.dataset.delay ?? 0))
      })
    })

    el.querySelectorAll<HTMLElement>("[data-marquee]").forEach((node) => {
      anims.push(
        node.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
          duration: Number(node.dataset.marquee) || 40000,
          iterations: Infinity,
        }),
      )
    })

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          pending.get(entry.target)?.forEach((fn) => fn())
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    )
    const viewportHeight = window.innerHeight
    pending.forEach((fns, target) => {
      const rect = target.getBoundingClientRect()
      if (rect.bottom > 0 && rect.top < viewportHeight) fns.forEach((fn) => fn())
      else io.observe(target)
    })

    // A tab opened in the background never paints, so nothing would ever
    // play; finish everything rather than leave the page blank.
    const failsafe = window.setTimeout(() => {
      if (!document.hidden) return
      anims.forEach((a) => {
        if (a.effect?.getTiming().iterations !== Infinity) a.finish()
      })
      counters.forEach((c) => {
        cancelAnimationFrame(c.raf)
        clearTimeout(c.timer)
        c.node.nodeValue = c.final
      })
    }, 3000)

    return () => {
      clearTimeout(failsafe)
      io.disconnect()
      anims.forEach((a) => a.cancel())
      counters.forEach((c) => {
        cancelAnimationFrame(c.raf)
        clearTimeout(c.timer)
        c.node.nodeValue = c.final
      })
    }
  }, [])

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  )
}
