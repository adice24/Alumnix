import type { Metadata } from "next";
import { nunito } from "@/lib/fonts";
import "./globals.css";
import NeonCursor from "@/components/ui/NeonCursor";
import { SessionProvider } from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "AlumniX — The Intern Alumni Network",
  description:
    "Connect with 10,000+ alumni. Discover gigs, attend events, and build the career network that your internship started.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${nunito.className} overflow-x-hidden`}>
        <SessionProvider>
          <NeonCursor />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

