"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { nunito } from "@/lib/fonts";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className={`relative min-h-[100dvh] w-full overflow-hidden bg-[#000] text-black ${nunito.className}`}>
      
      {/* Ultra-Optimized Video Hub - Zero-Lag Accelerated Visuals */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden" style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          draggable={false}
          disablePictureInPicture
          disableRemotePlayback
          className="h-full w-full object-cover"
          src="/assets/Whisk_gjm0uwz5kznlntn20snmjtotegz4qtlmrgn00cm.mp4"
          style={{ 
            opacity: 1,
            // Offload entirely to GPU - Eliminate all layout re-paints
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
        />
        
        {/* Crisp performance overlay - 100% hardware-accelerated layering */}
        <div className="absolute inset-0 bg-black/5" style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }} />
      </div>

      {/* Main UI Layer - Optimized for FPS stability */}
      <main className="relative z-20 flex min-h-[100dvh] items-center justify-center p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[600px] max-h-[90vh] w-full max-w-[1100px] overflow-hidden rounded-[3.5rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md"
          style={{ 
            transform: 'translateZ(0)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))'
          }}
        >
          {/* Left Pane */}
          <div className="relative hidden w-[45%] flex-col justify-between p-16 lg:flex border-r border-white/10">
             <div className="relative z-10 flex items-center gap-4">
               <div className="h-10 w-10 rounded-xl bg-black flex items-center justify-center font-black text-xl text-white shadow-xl">X</div>
               <span className="text-2xl font-black uppercase tracking-tighter text-black">AlumniX</span>
             </div>

             <div className="relative z-10">
               <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/10 px-6 py-2 backdrop-blur-sm mb-8">
                  <div className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-black">AlumniX Secure Access</span>
               </div>

               <h1 className="text-6xl font-black leading-[1.1] tracking-tighter text-black">
                 Build your alumni <br /> network. <span className="text-brand-orange">In real time.</span>
               </h1>
               
               <p className="mt-8 max-w-[320px] text-sm font-black leading-relaxed text-black/70">
                 Connect with alumni, find gigs, and RSVP events instantly.
               </p>
             </div>

             {/* Testimonial Feature - Optimized performance */}
             <div className="relative z-10 w-full shrink-0 rounded-[2.5rem] bg-white/20 p-8 border border-white/20 shadow-lg overflow-hidden">
                <p className="relative z-10 text-md font-black italic text-black/95">"The fastest referral I've ever got."</p>
                <div className="relative z-10 mt-6 flex items-center gap-4">
                   <div className="h-14 w-14 shrink-0 rounded-2xl bg-brand-orange flex items-center justify-center font-black text-white shadow-xl">PS</div>
                   <div>
                      <p className="text-sm font-black text-black">Priya S.</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">BATCH '22 · PM @ SWIGGY</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Authentication Pane */}
          <div className="flex w-full flex-col justify-start sm:justify-center bg-white/0 p-12 lg:w-[55%] lg:p-20 overflow-y-auto scrollbar-hide py-16">
             <div className="mb-12">
                <h2 className="text-5xl font-black tracking-tighter text-black">
                  {title}
                </h2>
                <p className="mt-4 text-sm font-bold text-black/60">{subtitle}</p>
             </div>

             <div className="relative z-10 w-full">
               {children}
             </div>
          </div>
        </motion.div>
      </main>

      <style jsx global>{`
        * { filter: none !important; }
        body { background-color: #000; color: black; -webkit-font-smoothing: antialiased; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
