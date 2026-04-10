import { prisma } from "@/lib/prisma";
import { syne, nunito } from "@/lib/fonts";
import { Search, MapPin, Briefcase, Sparkles, Users, Linkedin } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ConnectButton } from "@/components/network/ConnectButton";

export default async function NetworkHub() {
  const session = await getServerSession(authOptions);
  const uid = (session as any)?.uid;

  const alumni = await prisma.user.findMany({
    where: { role: "USER", verifiedAt: { not: null } },
    include: { 
      profile: true,
      connectionsIn: uid ? { where: { fromId: uid } } : false
    },
    take: 20
  });

  return (
    <div className="space-y-8">
      {/* Header with Search */}
      <div className="rounded-[3rem] bg-brand-dark p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className={`${syne.className} text-4xl md:text-5xl font-black leading-tight`}>
            The Network that <br /> <span className="text-brand-orange underline decoration-white/20 underline-offset-8">Never Stops</span> Growing.
          </h1>
          <p className="mt-6 text-lg text-white/70 font-medium italic">
             &quot;Connecting verified alumni across the globe to build the career network that your internship started.&quot;
          </p>
          
          <div className="mt-10 flex items-center gap-2 rounded-2xl bg-white/10 p-2 backdrop-blur-xl border border-white/10">
            <div className="flex flex-1 items-center gap-3 px-4">
              <Search className="h-5 w-5 text-white/40" />
              <input 
                type="text" 
                placeholder="Search by batch, skill, or current company..." 
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-white/30 text-white"
              />
            </div>
            <button className="rounded-xl bg-brand-orange px-6 py-3 text-sm font-[900] shadow-lg shadow-brand-orange/20 hover:scale-[1.02] transition-transform text-white">
              Find Alumni
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-brand-orange/20 to-transparent flex items-center justify-center p-12">
           <Sparkles className="h-48 w-48 text-white/5 opacity-10 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {alumni.map((person) => {
          const isConnected = person.connectionsIn && person.connectionsIn.length > 0;
          const isMe = person.id === uid;

          return (
            <div key={person.id} className="group relative rounded-[2.5rem] bg-white p-6 shadow-sm border border-brand-surface hover:shadow-xl hover:-translate-y-1.5 transition-all">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-[2rem] bg-brand-surface flex items-center justify-center text-2xl font-black text-brand-orange">
                     {person.name?.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-lg bg-green-500 border-2 border-white" />
                </div>
                
                <h3 className={`${syne.className} mt-6 text-xl font-black text-brand-dark group-hover:text-brand-orange transition-colors`}>
                  {person.name}
                </h3>
                <p className="text-[10px] font-black text-brand-muted/60 uppercase tracking-[0.2em] mt-2">Batch of {person.profile?.batchYear ?? 2024}</p>
                
                <div className="mt-6 w-full space-y-3">
                   <div className="flex items-center justify-center gap-2 text-sm font-bold text-brand-dark bg-brand-surface py-2.5 rounded-2xl">
                      <Briefcase className="h-4 w-4 text-brand-orange" /> {person.profile?.title ?? "Alumni Intern"}
                   </div>
                   <div className="flex items-center justify-center gap-2 text-sm font-bold text-brand-dark bg-brand-surface py-2.5 rounded-2xl">
                      <MapPin className="h-4 w-4 text-brand-sky" /> {person.profile?.location ?? "Remote"}
                   </div>
                </div>

                <div className="mt-8 flex gap-2 w-full">
                    {!isMe && (
                      <ConnectButton toUserId={person.id} disabled={isConnected} />
                    )}
                    {isMe && (
                      <div className="flex-1 py-3 text-xs font-bold text-brand-muted bg-brand-surface rounded-full uppercase tracking-wider">It&apos;s You</div>
                    )}
                    <button className="p-3.5 rounded-full bg-brand-surface text-brand-muted hover:text-brand-navy hover:bg-brand-sky/20 transition-all">
                      <Linkedin className="h-5 w-5" />
                    </button>
                </div>
              </div>
            </div>
          );
        })}

        {alumni.length === 0 && (
           <div className="col-span-full py-32 text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-brand-surface flex items-center justify-center text-brand-muted">
                 <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark">Building the Directory...</h3>
              <p className="text-brand-muted max-w-xs mx-auto">Once the first batch of alumni is verified, you&apos;ll be able to browse and connect with them here.</p>
           </div>
        )}
      </div>
    </div>
  );
}
