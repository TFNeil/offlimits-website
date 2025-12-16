import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background font-sans selection:bg-black selection:text-white">
            <Navbar />

            <main className="flex-1 container mx-auto px-6 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Contact Information Column */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let's start a conversation.</h1>
                        <p className="text-muted-foreground text-lg mb-12 max-w-lg leading-relaxed">
                            Ready to break the limits? We help brands grow with data-driven marketing strategies that get smarter over time.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Email Us</h3>
                                <a
                                    href="mailto:hi@offlimits.ai"
                                    className="text-2xl md:text-3xl font-bold hover:text-muted-foreground transition-colors flex items-center gap-3"
                                >
                                    <Mail className="h-6 w-6 md:h-8 md:w-8" />
                                    hi@offlimits.ai
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Follow Us</h3>
                                <div className="flex gap-4">
                                    <Link href="https://twitter.com" target="_blank" className="p-3 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors group">
                                        {/* X Logo */}
                                        <svg className="h-5 w-5 text-foreground/70 group-hover:text-foreground fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </Link>
                                    <Link href="https://instagram.com" target="_blank" className="p-3 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors group">
                                        <Instagram className="h-5 w-5 text-foreground/70 group-hover:text-foreground" />
                                    </Link>
                                    <Link href="https://linkedin.com" target="_blank" className="p-3 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors group">
                                        <Linkedin className="h-5 w-5 text-foreground/70 group-hover:text-foreground" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div className="bg-secondary/20 p-8 md:p-12 rounded-3xl border">
                        <h2 className="text-2xl font-bold mb-8">Let us call you</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" placeholder="John" className="bg-background" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" placeholder="Doe" className="bg-background" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" className="bg-background" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-background" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message (Optional)</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your project..."
                                    className="min-h-[150px] bg-background resize-none"
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-full text-base font-semibold">
                                Request Call
                            </Button>
                        </form>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
