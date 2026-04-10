import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { realtimeHub } from "@/lib/realtime";

function sseFormat(data: unknown, event?: string) {
  const payload = `data: ${JSON.stringify(data)}\n`;
  const evt = event ? `event: ${event}\n` : "";
  return `${evt}${payload}\n`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const uid = (session as any).uid as string;

  const stream = new ReadableStream({
    start(controller) {
      const enc = new TextEncoder();
      controller.enqueue(enc.encode(`retry: 2000\n\n`));
      controller.enqueue(enc.encode(sseFormat({ ok: true }, "ready")));

      const channel = `notifications:${uid}`;
      const unsub = realtimeHub.subscribe(channel, (msg: any) => {
        controller.enqueue(enc.encode(sseFormat(msg, "notifications")));
      });

      const keepAlive = setInterval(() => {
        controller.enqueue(enc.encode(`event: ping\ndata: {}\n\n`));
      }, 15000);

      (controller as any)._cleanup = () => {
        clearInterval(keepAlive);
        unsub();
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

