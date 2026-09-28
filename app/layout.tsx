import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OFFLIMITS AI",
  description:
    "A 90-day scaling program for service businesses: our operating knowledge plus AI for everything that can run without you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds the `motion`
    // class before hydration, so the server and client className differ.
    <html
      lang="en"
      className={`${archivo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so entrance animations start hidden instead of flashing. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('motion')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
