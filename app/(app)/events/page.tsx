import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/app/PageHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="EVENTS"
        title="Meet the people who will change your career"
        subtitle="RSVP to meetups, webinars, and alumni sessions. Get reminders and join with one click."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {events.map((e) => (
          <Link key={e.id} href={`/events/${e.id}`} className="block">
            <SpotlightCard
              spotlightColor="rgba(134, 197, 255, 0.28)"
              className="transition-transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-brand-dark">
                    {e.title}
                  </p>
                  <p className="mt-1 text-sm text-brand-muted">
                    {new Date(e.startsAt).toLocaleString("en-IN", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    · {e.mode}
                    {e.location ? ` · ${e.location}` : ""}
                  </p>
                </div>
                <span className="rounded-full bg-brand-sky/25 px-3 py-1 text-xs font-semibold text-brand-navy">
                  {e.attendees} attending
                </span>
              </div>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-brand-muted">
                {e.description}
              </p>
            </SpotlightCard>
          </Link>
        ))}

        {events.length === 0 ? (
          <div className="rounded-3xl border border-black/5 bg-white p-7 text-sm text-brand-muted shadow-sm">
            No events yet. Admins can publish events from the admin panel.
          </div>
        ) : null}
      </div>
    </div>
  );
}

