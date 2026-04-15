import { syne, nunito } from "@/lib/fonts";

export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-3">
        <div className="h-10 w-64 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-6 w-96 bg-slate-200 rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 rounded-3xl bg-white p-6 shadow-sm border border-transparent animate-pulse">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-slate-200" />
               <div className="space-y-2">
                  <div className="h-4 w-24 bg-slate-200 rounded-full" />
                  <div className="h-8 w-16 bg-slate-200 rounded-full" />
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
           <div className="h-8 w-40 bg-slate-200 rounded-full animate-pulse" />
           <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 rounded-3xl bg-white p-6 shadow-sm animate-pulse" />
              ))}
           </div>
        </div>
        <div className="h-64 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}
