import { prisma } from "@/lib/prisma";
import { syne, nunito } from "@/lib/fonts";
import { Search, MapPin, Briefcase, Filter, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function GigBoard() {
  const gigs = await prisma.gig.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className={`${syne.className} text-4xl font-black text-brand-dark`}>Gig Board</h1>
          <p className={`${nunito.className} text-brand-muted max-w-md`}>
            Exclusive opportunities curated for our intern alumni network. Connect with companies that already know your value.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 rounded-2xl border border-brand-surface bg-white px-5 py-3 text-xs font-bold text-brand-dark hover:border-brand-orange/30 transition-all">
              <Filter className="h-4 w-4" /> Filter
           </button>
           <button className="flex items-center gap-2 rounded-2xl bg-brand-orange px-8 py-3.5 text-xs font-black text-white shadow-xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Latest Matches
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Filters - Desktop Only */}
        <aside className="hidden lg:block space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-brand-surface">
            <h3 className="text-sm font-black uppercase tracking-wider text-brand-dark mb-4">Categories</h3>
            <div className="space-y-2">
              {["Engineering", "Design", "Marketing", "Product", "Operations"].map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className="h-5 w-5 rounded border-2 border-brand-surface group-hover:border-brand-orange transition-colors" />
                  <span className="text-sm font-bold text-brand-muted group-hover:text-brand-dark transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-brand-orange/5 p-6 border-2 border-dashed border-brand-orange/10">
            <h3 className="text-sm font-black text-brand-orange mb-2">Pro Tip</h3>
            <p className="text-xs font-medium text-brand-orange/70 leading-relaxed">
              Complete your profile to get matched with gigs before they go live on the public board.
            </p>
          </div>
        </aside>

        {/* Gig Listings */}
        <div className="lg:col-span-3 grid grid-cols-1 gap-4">
          {gigs.map((gig) => (
            <Link 
              key={gig.id} 
              href={`/gigs/${gig.id}`}
              className="group relative overflow-hidden flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-[2.5rem] border border-brand-surface p-2 shadow-sm transition hover:shadow-xl hover:border-brand-orange/20"
            >
              <div className="flex flex-1 items-center gap-6 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-brand-surface text-2xl font-black text-brand-orange transition group-hover:bg-brand-orange group-hover:text-white">
                   {gig.title.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-black text-brand-dark group-hover:text-brand-orange transition-colors">{gig.title}</h3>
                    {new Date().getTime() - new Date(gig.createdAt).getTime() < 86400000 && (
                      <span className="bg-brand-orange/10 text-brand-orange text-[8px] font-black uppercase px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1 text-xs font-bold text-brand-muted">
                      <MapPin className="h-3 w-3" /> {gig.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-brand-muted">
                      <Briefcase className="h-3 w-3" /> {gig.type}
                    </div>
                    <div className="text-xs font-black text-brand-navy">₹{gig.salaryBand || "Competitive"}</div>
                  </div>
                </div>
              </div>
              
              <div className="sm:border-l p-6 flex items-center justify-between sm:justify-start gap-4">
                 <div className="text-right hidden xl:block">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Organization</p>
                    <p className="text-xs font-bold text-brand-dark">{gig.company || "AlumniX Verified"}</p>
                 </div>
                 <div className="h-10 w-10 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-lg transition group-hover:rotate-45 group-hover:scale-110">
                    <ChevronRight className="h-6 w-6" />
                 </div>
              </div>
            </Link>
          ))}
          {gigs.length === 0 && (
            <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-brand-surface p-20 text-center space-y-4">
               <div className="mx-auto w-16 h-16 rounded-full bg-brand-surface flex items-center justify-center text-brand-muted">
                  <Briefcase className="h-8 w-8" />
               </div>
               <div>
                  <h3 className="font-bold text-brand-dark">No live gigs at the moment</h3>
                  <p className="text-sm text-brand-muted mt-1">Our HR team is currently vetting new opportunities. Turn on notifications to be alerted first.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
