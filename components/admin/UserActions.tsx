"use client";

import { useState } from "react";
import { CheckCircle2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserActions({ userId }: { userId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function approve() {
    setLoading(true);
    const res = await fetch("/api/admin/users/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }).catch(() => null);
    
    setLoading(false);
    if (res?.ok) {
      router.refresh();
    }
  }

  return (
    <div className="flex gap-2">
      <button 
        onClick={approve}
        disabled={loading}
        className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition disabled:opacity-50"
      >
        <CheckCircle2 className="h-5 w-5" />
      </button>
      <button 
        disabled={loading}
        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition disabled:opacity-50"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
