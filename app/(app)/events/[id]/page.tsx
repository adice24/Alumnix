import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { syne } from "@/lib/fonts";
import { RsvpButton } from "@/components/events/RsvpButton";

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) return notFound();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
          Event details
        </p>
        <h1 className={`${syne.className} mt-3 text-3xl font-extrabold text-brand-dark`}>
          {event.title}
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          {new Date(event.startsAt).toLocaleString("en-IN", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          · {event.mode}
          {event.location ? ` · ${event.location}` : ""}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <RsvpButton eventId={event.id} title={event.title} />
          <span className="rounded-full bg-brand-sky/25 px-4 py-2 text-sm font-semibold text-brand-navy">
            {event.attendees} attending
          </span>
        </div>

        <div className="mt-7 rounded-2xl bg-brand-surface p-5">
          <p className="text-sm font-semibold text-brand-dark">About</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-brand-muted">
            {event.description}
          </p>
        </div>
      </section>
    </div>
  );
}

