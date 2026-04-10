"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { syne } from "@/lib/fonts";

type Notif = {
  id: string;
  title: string;
  body: string;
  href: string | null;
  readAt: string | Date | null;
  createdAt: string | Date;
  userId: string;
};

export function NotificationsClient({ initial }: { initial: Notif[] }) {
  const [items, setItems] = useState<Notif[]>(initial);
  const unread = useMemo(
    () => items.filter((n) => !n.readAt).length,
    [items],
  );

  async function refresh() {
    const res = await fetch("/api/notifications").catch(() => null);
    if (!res?.ok) return;
    const data = (await res.json()) as { ok: boolean; items: Notif[] };
    setItems(data.items);
  }

  async function markRead(id: string) {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => null);
    await refresh();
  }

  useEffect(() => {
    const es = new EventSource("/api/stream/notifications");
    es.addEventListener("notifications", () => void refresh());
    return () => es.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-brand-muted">
          {unread > 0 ? (
            <>
              <span className={`${syne.className} font-extrabold text-brand-dark`}>
                {unread}
              </span>{" "}
              unread updates
            </>
          ) : (
            "All caught up."
          )}
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => void refresh()}
          className={`${syne.className} rounded-full border-2 border-brand-navy px-5 py-2 text-sm font-extrabold text-brand-navy hover:bg-brand-navy hover:text-white`}
        >
          Refresh
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {items.map((n) => {
          const card = (
            <SpotlightCard
              spotlightColor="rgba(134, 197, 255, 0.25)"
              className={`transition-transform hover:-translate-y-1 ${!n.readAt ? "ring-1 ring-brand-orange/25" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-brand-dark">{n.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {n.body}
                  </p>
                  <p className="mt-3 text-xs text-brand-muted">
                    {new Date(n.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {!n.readAt ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => void markRead(n.id)}
                    className={`${syne.className} shrink-0 rounded-full bg-brand-orange px-4 py-2 text-xs font-extrabold text-white`}
                  >
                    Mark read
                  </motion.button>
                ) : (
                  <span className="shrink-0 rounded-full bg-brand-surface px-3 py-1 text-xs font-semibold text-brand-muted">
                    Read
                  </span>
                )}
              </div>
            </SpotlightCard>
          );

          return n.href ? (
            <Link key={n.id} href={n.href} className="block">
              {card}
            </Link>
          ) : (
            <div key={n.id}>{card}</div>
          );
        })}
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-black/5 bg-white p-7 text-sm text-brand-muted shadow-sm">
          No notifications yet.
        </div>
      ) : null}
    </div>
  );
}

