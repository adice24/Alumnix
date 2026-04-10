"use client";

import { useEffect, useState } from "react";

export function FeedRealtimeClient() {
  const [status, setStatus] = useState<"connecting" | "live" | "offline">(
    "connecting",
  );

  useEffect(() => {
    let es: EventSource | null = new EventSource("/api/stream/posts");
    const onOpen = () => setStatus("live");
    const onError = () => setStatus("offline");

    es.addEventListener("open", onOpen as any);
    es.addEventListener("error", onError as any);
    es.addEventListener("posts", () => {
      // simplest robust approach: refresh for new server-rendered list
      // (keeps SSR correct and avoids client cache complexity)
      window.location.reload();
    });

    return () => {
      es?.close();
      es = null;
    };
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-brand-muted">
      <span
        className={`h-2 w-2 rounded-full ${
          status === "live"
            ? "bg-emerald-500"
            : status === "offline"
              ? "bg-red-500"
              : "bg-brand-yellow"
        }`}
      />
      <span>
        {status === "live"
          ? "Live updates on"
          : status === "offline"
            ? "Offline (retrying)"
            : "Connecting…"}
      </span>
    </div>
  );
}

