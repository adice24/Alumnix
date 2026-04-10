"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { syne } from "@/lib/fonts";

export function FeedComposer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const canPost = useMemo(() => text.trim().length >= 8 && !loading, [text, loading]);

  async function submit() {
    if (!canPost) return;
    setLoading(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text.trim() }),
    }).catch(() => null);
    setLoading(false);
    if (!res?.ok) return;
    setText("");
    window.location.reload();
  }

  return (
    <div className="rounded-3xl border border-black/5 bg-brand-surface p-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share an update, an opportunity, or an event link…"
        className="min-h-[110px] w-full resize-none rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
      />
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-brand-muted">
          Tip: Keep it actionable — include role, company, link, and deadline.
        </p>
        <motion.button
          type="button"
          onClick={submit}
          disabled={!canPost}
          whileHover={canPost ? { scale: 1.03 } : undefined}
          whileTap={canPost ? { scale: 0.98 } : undefined}
          className={`${syne.className} inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-orange/20 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <Send className="h-4 w-4" />
          {loading ? "Posting..." : "Post"}
        </motion.button>
      </div>
    </div>
  );
}

