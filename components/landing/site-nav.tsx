import { Button } from "@/components/ui/button"

const LINKS = [
  { href: "#do", label: "Program" },
  { href: "#auto", label: "Automation" },
  { href: "#who", label: "Who it's for" },
]

export function SiteNav() {
  return (
    <nav data-anim="fade" data-dur="600" className="gutter flex items-center gap-4 border-b-2 py-3">
      <span className="mr-auto font-heading text-lg font-extrabold">OFFLIMITS AI</span>
      {LINKS.map((link) => (
        <a key={link.href} href={link.href} className="hidden text-sm hover:text-brand sm:inline">
          {link.label}
        </a>
      ))}
      <Button>Book a strategy call</Button>
    </nav>
  )
}
