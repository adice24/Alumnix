"use client";

import { motion } from "framer-motion";
import { syne, nunito } from "@/lib/fonts";
import { Meteors } from "@/components/ui/meteors";

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function HeroSection() {
  const words = "Where Interns Become Professionals.".split(" ");

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent pt-32 lg:pt-48">
      {/* Background Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -right-24 -top-24 h-[600px] w-[600px] animate-blob-morph bg-brand-orange opacity-15 blur-[120px]" />
        <div className="absolute -bottom-32 -left-24 h-[500px] w-[500px] animate-blob-morph-delayed bg-brand-sky opacity-20 blur-[100px]" />
        <div className="hero-dot-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          {/* Left Column */}
          <div className="flex-1 text-center lg:text-left">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-warm px-4 py-1.5">
                <span className={`${nunito.className} text-sm font-medium text-brand-orange`}>
                  🎓 The #1 Intern Alumni Network
                </span>
              </div>
            </FadeUp>

            <h1 className={`${syne.className} mt-8 text-6xl font-[900] leading-[1.05] text-brand-dark sm:text-8xl`}>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className={word === "Professionals." ? "text-brand-orange" : ""}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h1>

            <FadeUp delay={0.4}>
              <p className={`${nunito.className} mt-6 max-w-lg text-lg leading-relaxed text-brand-muted lg:mx-0 mx-auto`}>
                Connect with 10,000+ alumni. Discover gigs, attend events, and
                build the career network that your internship started.
              </p>
            </FadeUp>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <FadeUp delay={0.55}>
                <button className={`${syne.className} rounded-full bg-brand-orange px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-orange/30 transition hover:bg-brand-amber hover:scale-105 active:scale-95`}>
                  Get Started Free &rarr;
                </button>
              </FadeUp>
              <FadeUp delay={0.65}>
                <button className={`${syne.className} rounded-full border-2 border-brand-navy px-8 py-4 text-base font-bold text-brand-navy transition hover:bg-brand-navy hover:text-white hover:scale-105 active:scale-95`}>
                  Explore Network
                </button>
              </FadeUp>
            </div>

            <FadeUp delay={0.75}>
              <div className="mt-10 flex items-center justify-center gap-3 lg:justify-start">
                <div className="flex -space-x-3">
                  {["bg-brand-orange", "bg-brand-sky", "bg-brand-yellow", "bg-brand-navy", "bg-brand-amber"].map((color, i) => (
                    <div
                      key={i}
                      className={`h-10 w-10 flex items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white ${color}`}
                    >
                      {["AK", "MS", "RV", "PJ", "KT"][i]}
                    </div>
                  ))}
                </div>
                <span className={`${nunito.className} text-sm font-medium text-brand-muted`}>
                  10,000+ alumni already connected
                </span>
              </div>
            </FadeUp>
          </div>

          {/* Right Column - UI Mockups */}
          <div className="relative flex-1 lg:flex justify-center hidden">
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              {/* Main Card */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative z-10 w-72 rounded-2xl bg-gradient-to-br from-brand-yellow to-brand-amber p-6 shadow-2xl"
              >
                <div className="absolute right-4 top-4 rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold text-white">
                  Batch &apos;23
                </div>
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-lg font-bold text-brand-amber">
                  RK
                </div>
                <h3 className={`${syne.className} mt-4 text-xl font-bold text-white`}>
                  Rahul Kumar
                </h3>
                <p className={`${nunito.className} text-sm text-white/80`}>
                  Product Designer @ Google
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["UI/UX", "Figma", "React"].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="mt-6 w-full rounded-full bg-white py-2.5 text-sm font-bold text-brand-amber shadow-lg transition hover:bg-brand-warm">
                  Connect
                </button>
              </motion.div>

              {/* Notification Card */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -right-8 -top-8 z-20 w-56 rounded-xl border-l-4 border-brand-orange bg-white p-4 shadow-xl shadow-black/5"
              >
                <p className="text-sm font-bold text-brand-dark">🎯 New Gig Match!</p>
                <p className="text-xs text-brand-muted">Frontend Dev at Razorpay</p>
                <p className="mt-1 text-[10px] font-bold text-brand-orange uppercase">2 min ago</p>
                <motion.div 
                   animate={{ scale: [1, 1.05, 1] }} 
                   transition={{ duration: 3, repeat: Infinity }}
                   className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-brand-orange" 
                />
              </motion.div>

              {/* Event Card */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute -bottom-6 -left-8 z-20 w-48 rounded-xl bg-brand-navy p-4 shadow-xl"
              >
                <p className="text-xs font-bold text-white">📅 Event Tomorrow</p>
                <p className="text-[10px] text-white/70">Alumni Meetup 2024</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-brand-yellow">142 attending</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
