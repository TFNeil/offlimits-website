import Link from "next/link"

import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/landing/mobile-menu"
import { NAV_LINKS } from "@/components/landing/nav-links"

/** Sticky 60px bar with a menu button on small screens; inline links on desktop. */
export function SiteNav() {
  return (
    <header
      data-anim="fade"
      data-dur="600"
      className="gutter sticky top-0 z-10 flex h-15 items-center gap-4 border-b-2 bg-background lg:static lg:h-auto lg:py-3"
    >
      <span className="mr-auto font-heading text-lg font-extrabold tracking-[-0.01em] lg:tracking-normal">
        OFFLIMITS AI
      </span>
      <nav className="flex items-center gap-4 max-lg:hidden">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="text-sm hover:text-brand">
            {link.label}
          </a>
        ))}
        <Button nativeButton={false} render={<Link href="/book" />}>
          Book a strategy call
        </Button>
      </nav>
      <div className="lg:hidden">
        <MobileMenu />
      </div>
    </header>
  )
}
