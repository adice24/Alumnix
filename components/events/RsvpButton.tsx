"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck2 } from "lucide-react";
import { syne } from "@/lib/fonts";

export function RsvpButton({ eventId, title }: { eventId: string; title: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function rsvp() {
    setLoading(true);
    const res = await fetch("/api/events/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    }).catch(() => null);
    setLoading(false);
    if (!res?.ok) return;
    setDone(true);
  }

  return (
    <motion.button
      type="button"
      onClick={rsvp}
      disabled={loading || done}
      whileHover={!loading && !done ? { scale: 1.03 } : undefined}
      whileTap={!loading && !done ? { scale: 0.98 } : undefined}
      className={`${syne.className} inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-orange/20 disabled:cursor-not-allowed disabled:opacity-60`}
    >
      <CalendarCheck2 className="h-4 w-4" />
      {done ? `RSVP'd` : loading ? "Saving..." : `RSVP`}
      <span className="sr-only">for {title}</span>
    </motion.button>
  );
}

