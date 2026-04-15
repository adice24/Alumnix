"use client";

import Link from "next/link";
import { Sun, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { syne, nunito } from "@/lib/fonts";

export default function Footer() {
  const columns = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Gig Board", href: "/gigs" },
        { name: "Events", href: "/events" },
        { name: "Alumni Network", href: "/network" },
        { name: "Feed", href: "/feed" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Press Kit", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { name: "Help Center", href: "#" },
        { name: "hello@alumnix.in", href: "mailto:hello@alumnix.in" },
        { name: "Report an Issue", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative z-10 bg-black py-16 lg:pt-24 lg:pb-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Sun className="h-6 w-6 text-brand-orange" />
              <span className={`${syne.className} text-2xl font-bold text-white`}>
                AlumniX
              </span>
            </Link>
            <p className={`${nunito.className} mt-4 text-sm font-medium text-white/40`}>
              The Intern Alumni Network. Reconnecting professionals across the globe.
            </p>
            <div className="mt-8 flex gap-4">
              {[Linkedin, Twitter, Instagram, Github].map((Icon, i) => (
                <Link key={i} href="#" className="text-white/30 transition hover:text-brand-orange">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className={`${syne.className} text-xs font-bold uppercase tracking-[0.2em] text-white`}>
                {col.title}
              </h3>
              <ul className="mt-6 flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`${nunito.className} text-sm font-medium text-white/40 transition hover:text-white`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className={`${nunito.className} text-sm font-medium text-white/20`}>
            &copy; 2024 AlumniX. Made with ❤️ in India.
          </p>
          <p className={`${nunito.className} text-sm font-medium text-white/20`}>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
