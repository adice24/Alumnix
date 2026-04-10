"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search,
  ShieldCheck
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { syne, nunito } from "@/lib/fonts";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Gig Board", href: "/gigs", icon: Briefcase },
    { name: "Network", href: "/network", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Announcements", href: "/feed", icon: MessageSquare },
  ];

  const adminItems = [
    { name: "Admin Portal", href: "/admin", icon: ShieldCheck },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className={`min-h-screen bg-brand-surface ${nunito.className}`}>
      {/* Mobile Header */}
      <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-white px-4 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-orange" />
          <span className={`${syne.className} text-xl font-bold text-brand-dark`}>AlumniX</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="rounded-lg p-2 hover:bg-brand-surface">
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Sidebar (Desktop) */}
      <aside 
        className={`fixed left-0 top-0 z-50 hidden h-full border-r bg-white transition-all duration-300 lg:block ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="flex items-center gap-3 px-2 py-4">
            <div className={`h-10 w-10 shrink-0 rounded-xl bg-brand-orange shadow-lg shadow-brand-orange/20`} />
            {isSidebarOpen && (
              <span className={`${syne.className} text-2xl font-black tracking-tight text-brand-dark`}>
                AlumniX
              </span>
            )}
          </div>

          <nav className="mt-8 flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                    : "text-brand-muted hover:bg-brand-warm hover:text-brand-orange"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isSidebarOpen && <span className="text-base font-bold">{item.name}</span>}
              </Link>
            ))}

            {session?.user?.role === "ADMIN" && (
              <>
                <div className="my-4 border-t border-brand-surface" />
                {adminItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/20"
                        : "text-brand-muted hover:bg-brand-surface hover:text-brand-navy"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {isSidebarOpen && <span className="text-base font-bold">{item.name}</span>}
                  </Link>
                ))}
              </>
            )}
          </nav>

          <div className="border-t pt-4">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-brand-muted transition hover:bg-red-50 hover:text-red-500"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span className="text-base font-bold">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"} pt-16 lg:pt-0`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 hidden h-20 items-center justify-between bg-white/80 px-8 backdrop-blur-md lg:flex">
          <div className="flex w-96 items-center gap-3 rounded-2xl bg-brand-surface px-4 py-2.5">
            <Search className="h-4 w-4 text-brand-muted" />
            <input
              type="text"
              placeholder="Search alumni, gigs, events..."
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative rounded-full p-2 hover:bg-brand-surface">
              <Bell className="h-5 w-5 text-brand-muted" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-orange" />
            </button>
            <div className="flex items-center gap-3 border-l pl-6">
              <div className="text-right">
                <p className="text-base font-black text-brand-dark">{session?.user?.name || "User"}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                  {session?.user?.role || "ALUMNI"}
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-brand-sky" />
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="h-full w-4/5 max-w-sm bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className={`${syne.className} text-xl font-bold`}>Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              {/* ... same links as desktop ... */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
