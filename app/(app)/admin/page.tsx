import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { syne, nunito } from "@/lib/fonts";
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  UserCheck
} from "lucide-react";
import { UserActions } from "@/components/admin/UserActions";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [pendingUsers, allGigs, applications] = await Promise.all([
    prisma.user.findMany({ where: { verifiedAt: null }, take: 10 }),
    prisma.gig.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.application.count(),
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`${syne.className} text-3xl font-black text-brand-dark`}>Admin Portal</h1>
          <p className={`${nunito.className} text-brand-muted`}>Manage the AlumniX ecosystem.</p>
        </div>
        <Link href="/admin/gigs/new" className="flex items-center gap-2 rounded-2xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Plus className="h-4 w-4" /> Post New Gig
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* User Approvals */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className={`${syne.className} text-xl font-bold text-brand-dark`}>Waitlist Approval</h2>
            <span className="rounded-full bg-brand-orange px-3 py-1 text-[10px] font-black text-brand-orange bg-opacity-10 uppercase tracking-widest">
              {pendingUsers.length} Pending
            </span>
          </div>
          <div className="rounded-[2rem] bg-white p-2 shadow-sm border border-brand-surface">
            {pendingUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-brand-surface/50 transition-colors rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-brand-sky/20 flex items-center justify-center text-brand-navy font-bold">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-dark">{user.name}</p>
                  </div>
                </div>
                <UserActions userId={user.id} />
              </div>
            ))}
            {pendingUsers.length === 0 && (
              <div className="p-12 text-center text-brand-muted">
                <p className="font-bold">Clear Sky!</p>
                <p className="text-xs mt-1">No users waiting for approval.</p>
              </div>
            )}
          </div>
        </section>

        {/* Global Stats */}
        <section className="space-y-4">
          <h2 className={`${syne.className} text-xl font-bold text-brand-dark px-2`}>Platform Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-brand-surface">
              <FileText className="h-8 w-8 text-brand-orange mb-4" />
              <p className="text-2xl font-black text-brand-dark">{applications}</p>
              <p className="text-xs font-bold text-brand-muted uppercase">Global Apps</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-brand-surface">
              <UserCheck className="h-8 w-8 text-brand-sky mb-4" />
              <p className="text-2xl font-black text-brand-dark">98%</p>
              <p className="text-xs font-bold text-brand-muted uppercase">Account Match</p>
            </div>
          </div>
          
          <div className="rounded-3xl bg-brand-dark p-6 text-white overflow-hidden relative">
             <div className="relative z-10">
                <h3 className="font-bold underline decoration-brand-orange underline-offset-4 decoration-2">System Health</h3>
                <p className="mt-4 text-xs text-white/60">All backend services are operational.</p>
                <div className="mt-6 flex gap-2">
                    <div className="h-1 flex-1 bg-green-500 rounded-full" />
                    <div className="h-1 flex-1 bg-green-500 rounded-full" />
                    <div className="h-1 flex-1 bg-green-500 rounded-full" />
                    <div className="h-1 flex-1 bg-brand-orange rounded-full animate-pulse" />
                </div>
             </div>
             <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-brand-orange/20 blur-3xl rounded-full" />
          </div>
        </section>
      </div>

      {/* Gig Management */}
      <section className="space-y-4">
        <h2 className={`${syne.className} text-xl font-bold text-brand-dark px-2`}>Manage Active Gigs</h2>
        <div className="overflow-x-auto rounded-[2rem] bg-white border border-brand-surface shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-brand-surface/50">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-muted">Title</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-muted">Type</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-muted">Applications</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-muted">Status</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allGigs.map((gig) => (
                <tr key={gig.id} className="border-b last:border-0 hover:bg-brand-surface/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-brand-dark">{gig.title}</p>
                    <p className="text-[10px] text-brand-muted">{gig.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-brand-surface px-3 py-1 text-[10px] font-bold text-brand-navy">
                      {gig.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-brand-sky text-[8px] flex items-center justify-center font-bold text-white">AJ</div>)}
                      <div className="h-6 w-6 rounded-full border-2 border-white bg-brand-surface text-[8px] flex items-center justify-center font-bold text-brand-muted">+5</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-green-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600" /> Active
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand-muted hover:text-brand-orange transition-colors">
                      <AlertCircle className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {allGigs.length === 0 && (
            <div className="p-12 text-center text-brand-muted font-medium">
              No gigs found. Start by adding your first opportunity.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
