import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { PageHeader } from "@/components/app/PageHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const uid = (session as any).uid as string;

  const items = await prisma.application.findMany({
    where: { userId: uid },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const groups = {
    PENDING: items.filter((i) => i.status === "PENDING"),
    SHORTLISTED: items.filter((i) => i.status === "SHORTLISTED"),
    REJECTED: items.filter((i) => i.status === "REJECTED"),
    HIRED: items.filter((i) => i.status === "HIRED"),
  } as const;

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="APPLICATION TRACKER"
        title="Track every application"
        subtitle="Know your status — Pending, Shortlisted, Rejected, or Hired — and keep your job search organized."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Object.entries(groups).map(([status, list]) => (
          <section key={status} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-brand-dark">{status}</p>
              <span className="rounded-full bg-brand-surface px-3 py-1 text-xs font-semibold text-brand-muted">
                {list.length}
              </span>
            </div>
            {list.map((a) => (
              <SpotlightCard
                key={a.id}
                spotlightColor="rgba(255, 166, 43, 0.16)"
                className="transition-transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">
                      {a.roleTitle}
                    </p>
                    <p className="mt-1 text-sm text-brand-muted">{a.company}</p>
                    <p className="mt-3 text-xs text-brand-muted">
                      Added{" "}
                      {new Date(a.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                  {a.gigId ? (
                    <Link
                      href={`/gigs/${a.gigId}`}
                      className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-amber"
                    >
                      View gig →
                    </Link>
                  ) : null}
                </div>
              </SpotlightCard>
            ))}
            {list.length === 0 ? (
              <div className="rounded-3xl border border-black/5 bg-white p-6 text-sm text-brand-muted shadow-sm">
                Nothing in {status.toLowerCase()} yet.
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}

