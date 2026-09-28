"use client"

import { useRef, useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NAV_LINKS } from "@/components/landing/nav-links"

const iconButton = "size-11 text-brand hover:bg-brand/10 hover:text-brand active:bg-brand/20 [&_svg:not([class*='size-'])]:size-5.5"

/** Full-screen menu behind the hamburger on small screens. */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  // Jumping to a section has to wait until the menu has closed and released
  // its scroll lock, or the browser scrolls a page that can't move.
  const pendingHash = useRef<string | null>(null)

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        if (isOpen || !pendingHash.current) return
        window.location.hash = pendingHash.current
        pendingHash.current = null
      }}
    >
      <SheetTrigger render={<Button variant="ghost" size="icon" className={iconButton} />}>
        <Menu />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="gap-0 border-0 bg-background text-foreground shadow-none data-[side=top]:bottom-0 data-[side=top]:h-dvh data-[side=top]:border-b-0"
      >
        <div className="gutter flex h-15 shrink-0 items-center justify-between border-b-2">
          <SheetTitle className="text-lg font-extrabold tracking-[-0.01em]">OFFLIMITS AI</SheetTitle>
          <SheetClose render={<Button variant="ghost" size="icon" className={iconButton} />}>
            <X />
            <span className="sr-only">Close menu</span>
          </SheetClose>
        </div>
        <nav className="gutter flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault()
                pendingHash.current = link.href
                setOpen(false)
              }}
              className="border-b-2 py-5.5 font-heading text-4xl font-extrabold tracking-[-0.02em] hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="gutter mt-auto pt-5 pb-8">
          <Button className="min-h-13 w-full justify-between" onClick={() => setOpen(false)}>
            Book a strategy call
            <ArrowRight />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
