"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { syne } from "@/lib/fonts";

export function ApplyToGigButton({
  gigId,
  company,
  roleTitle,
}: {
  gigId: string;
  company: string;
  roleTitle: string;
}) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function apply() {
    setLoading(true);
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gigId, company, roleTitle }),
    }).catch(() => null);
    setLoading(false);
    if (!res?.ok) return;
    setDone(true);
  }

  return (
    <motion.button
      type="button"
      onClick={apply}
      disabled={loading || done}
      whileHover={!loading && !done ? { scale: 1.03 } : undefined}
      whileTap={!loading && !done ? { scale: 0.98 } : undefined}
      className={`${syne.className} inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-orange/20 disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {done ? <CheckCircle2 className="h-4 w-4" /> : null}
      {done ? "Applied" : loading ? "Applying..." : "Apply now"}
    </motion.button>
  );
}

