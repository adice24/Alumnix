import { syne, nunito } from "@/lib/fonts";
import { prisma } from "@/lib/prisma";
import { Briefcase, Calendar, Users, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  // Fetch some aggregate stats
  const [gigCount, eventCount, userCount] = await Promise.all([
    prisma.gig.count(),
    prisma.event.count(),
    prisma.user.count(),
  ]);

  const recentGigs = await prisma.gig.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    { name: "Active Gigs", value: gigCount, icon: Briefcase, color: "bg-brand-orange" },
    { name: "Upcoming Events", value: eventCount, icon: Calendar, color: "bg-brand-sky" },
    { name: "Network Size", value: userCount, icon: Users, color: "bg-brand-yellow" },
    { name: "Applications", value: 12, icon: TrendingUp, color: "bg-brand-navy" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`${syne.className} text-4xl font-black text-brand-dark`}>
          Welcome Home, Alumni
        </h1>
        <p className={`${nunito.className} text-lg text-brand-muted mt-2`}>
          Here&apos;s what&apos;s happening in your network today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm border border-transparent hover:border-brand-orange/20 transition-all">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color} text-white shadow-lg`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-wider text-brand-muted">{stat.name}</p>
              <p className={`${syne.className} text-3xl font-black text-brand-dark mt-1`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Gigs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className={`${syne.className} text-2xl font-black text-brand-dark`}>Newest Gigs</h2>
            <button className="text-sm font-bold text-brand-orange hover:underline">View All &rarr;</button>
          </div>
          <div className="space-y-4">
            {recentGigs.map((gig) => (
              <div key={gig.id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-brand-surface flex items-center justify-center text-brand-orange text-lg font-bold">
                    {gig.id.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-brand-dark group-hover:text-brand-orange transition-colors">{gig.title}</h3>
                    <p className="text-sm font-bold text-brand-muted mt-1">{gig.type} · {gig.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-lg font-black text-brand-dark">₹{gig.salaryBand || "TBD"}</p>
                    <p className="text-xs font-bold text-brand-muted uppercase">Monthly</p>
                  </div>
                  <button className="rounded-full bg-brand-orange/10 px-6 py-2 text-xs font-bold text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
                    Apply
                  </button>
                </div>
              </div>
            ))}
            {recentGigs.length === 0 && (
               <div className="rounded-3xl bg-white/50 border-2 border-dashed border-brand-orange/10 p-12 text-center">
                  <p className="text-brand-muted font-medium">No gigs posted yet. Check back soon!</p>
               </div>
            )}
          </div>
        </div>

        {/* Sidebar/Notifications */}
        <div className="space-y-4">
          <h2 className={`${syne.className} text-2xl font-black text-brand-dark px-2`}>Updates</h2>
          <div className="rounded-3xl bg-brand-navy p-6 shadow-xl text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-white/60">Next Event</p>
            <h3 className="mt-2 text-2xl font-black">Annual Alumni Meetup &apos;24</h3>
            <p className="mt-2 text-base font-medium text-white/80">April 15, 2024 · 7:00 PM</p>
            <button className="mt-6 w-full rounded-2xl bg-white/10 py-4 text-sm font-bold backdrop-blur-md hover:bg-white/20 transition">
              RSVP Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
