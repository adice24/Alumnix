import { prisma } from "@/lib/prisma";
import { syne, nunito } from "@/lib/fonts";
import { MessageSquare, Heart, Share2, MoreHorizontal, Megaphone } from "lucide-react";

export default async function FeedPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className={`${syne.className} text-3xl font-black text-brand-dark`}>Announcements</h1>
        <div className="flex -space-x-2">
           {[1,2,3].map(i => <div key={i} className="h-10 w-10 rounded-full border-4 border-brand-surface bg-brand-orange text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">HQ</div>)}
        </div>
      </div>

      {/* Post Composer (Mock for now) */}
      <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-brand-surface flex items-center gap-4">
         <div className="h-12 w-12 rounded-2xl bg-brand-surface" />
         <div className="flex-1 bg-brand-surface rounded-2xl px-6 py-3 text-sm font-medium text-brand-muted cursor-pointer hover:bg-brand-orange/5 transition-colors">
            Share an update or announcement...
         </div>
         <button className="h-12 w-12 rounded-2xl bg-brand-orange flex items-center justify-center text-white shadow-lg">
            <Megaphone className="h-5 w-5" />
         </button>
      </div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-brand-surface space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-[1.25rem] bg-brand-navy flex items-center justify-center text-white font-black">
                     AX
                  </div>
                  <div>
                     <h3 className="font-extrabold text-brand-dark">AlumniX Official</h3>
                     <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Global Admin · 2h ago</p>
                  </div>
               </div>
               <button className="text-brand-muted hover:text-brand-dark transition-colors">
                  <MoreHorizontal className="h-6 w-6" />
               </button>
            </div>

            <p className="text-sm font-medium leading-[1.8] text-brand-dark">
              {post.content}
            </p>

            {(post as any).metadata && (
               <div className="rounded-3xl bg-brand-surface p-4 border border-brand-orange/10 flex items-center gap-4">
                  <div className="h-16 w-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                     <Megaphone className="h-8 w-8" />
                  </div>
                  <div>
                     <p className="text-xs font-black text-brand-orange uppercase">Internal Link</p>
                     <p className="text-sm font-bold text-brand-navy">View full attachment details &rarr;</p>
                  </div>
               </div>
            )}

            <div className="pt-6 border-t flex items-center gap-8">
               <button className="flex items-center gap-2 text-xs font-black text-brand-muted hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" /> 24
               </button>
               <button className="flex items-center gap-2 text-xs font-black text-brand-muted hover:text-brand-navy transition-colors">
                  <MessageSquare className="h-5 w-5" /> 8
               </button>
               <button className="flex items-center gap-2 text-xs font-black text-brand-muted hover:text-brand-orange transition-colors">
                  <Share2 className="h-5 w-5" /> Share
               </button>
            </div>
          </article>
        ))}

        {posts.length === 0 && (
           <div className="rounded-[2.5rem] bg-white border-2 border-dashed border-brand-surface p-20 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-brand-surface flex items-center justify-center text-brand-muted">
                 <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-brand-dark">No announcements yet</h3>
              <p className="text-sm text-brand-muted mt-1">Stay tuned for official updates from the AlumniX team.</p>
           </div>
        )}
      </div>
    </div>
  );
}
