import type { ReactNode } from "react"
import { cn } from "cn"

/** The 1280px content column with the page gutter. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("gutter mx-auto w-full max-w-[1280px]", className)}>{children}</div>
}

/** Red eyebrow over a display-size h2; rises in on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string
  title: string
  className?: string
}) {
  return (
    <div data-anim="rise">
      <span className="eyebrow mb-5 block text-brand-700">{eyebrow}</span>
      <h2
        className={cn(
          "font-heading text-[44px] leading-[1.05] font-extrabold tracking-[-0.02em]",
          className,
        )}
      >
        {title}
      </h2>
    </div>
  )
}

/** The strong 2px rule between sections, drawn in left to right. */
export function Rule() {
  return <hr data-anim="draw" data-dur="1200" className="h-0.5 origin-left border-0 bg-divider" />
}
