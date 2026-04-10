"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { syne } from "@/lib/fonts";

export function ConnectButton({
  toUserId,
  disabled,
}: {
  toUserId: string;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(Boolean(disabled));

  async function connect() {
    setLoading(true);
    const res = await fetch("/api/network/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toUserId }),
    }).catch(() => null);
    setLoading(false);
    if (!res?.ok) return;
    setDone(true);
  }

  return (
    <motion.button
      type="button"
      onClick={connect}
      disabled={loading || done}
      whileHover={!loading && !done ? { scale: 1.03 } : undefined}
      whileTap={!loading && !done ? { scale: 0.98 } : undefined}
      className={`${syne.className} inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-orange/20 disabled:cursor-not-allowed disabled:opacity-60`}
    >
      <UserPlus className="h-4 w-4" />
      {done ? "Connected" : loading ? "Connecting..." : "Connect"}
    </motion.button>
  );
}

