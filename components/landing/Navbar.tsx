"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun } from "lucide-react";
import { syne, nunito } from "@/lib/fonts";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Network", href: "#network" },
    { name: "Events", href: "#events" },
    { name: "Gigs", href: "#gigs" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 py-4 shadow-sm backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange shadow-lg shadow-brand-orange/20">
              <Sun className="h-5 w-5 text-white" />
            </div>
            <span className={`${syne.className} text-2xl font-extrabold tracking-tight text-brand-dark`}>
              AlumniX
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className={`${nunito.className} hidden items-center gap-8 lg:flex`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-brand-muted transition hover:text-brand-navy"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className={`${nunito.className} hidden items-center gap-4 lg:flex`}>
            <Link
              href="/auth/login"
              className="rounded-full border border-brand-navy px-6 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white active:scale-95"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-brand-orange px-6 py-2 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition hover:bg-brand-amber active:scale-95"
            >
              Join Free
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-lg p-2 text-brand-dark lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-[70] w-full max-w-xs bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className={`${syne.className} text-xl font-bold text-brand-dark`}>
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-2 hover:bg-brand-surface"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className={`${nunito.className} flex flex-col gap-6`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-brand-dark hover:text-brand-orange"
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="border-brand-surface" />
                <Link
                  href="/auth/login"
                  className="flex w-full items-center justify-center rounded-full border border-brand-navy py-3 font-semibold text-brand-navy"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex w-full items-center justify-center rounded-full bg-brand-orange py-3 font-bold text-white shadow-lg shadow-brand-orange/20"
                >
                  Join Free
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
