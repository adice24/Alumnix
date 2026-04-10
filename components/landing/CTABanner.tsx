"use client";

import { motion } from "framer-motion";
import { syne, nunito } from "@/lib/fonts";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background with Gradient and Dots */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/80 to-brand-amber/80 backdrop-blur-sm">
        <div className="hero-dot-grid absolute inset-0 opacity-10 grayscale invert" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${syne.className} text-5xl font-extrabold text-white sm:text-7xl`}
        >
          Ready to reconnect with <br /> your journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`${nunito.className} mt-6 text-xl font-medium text-white/80`}
        >
          Join 10,000+ alumni building their careers on AlumniX.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="mt-12"
        >
          <button className={`${syne.className} rounded-full bg-white px-10 py-5 text-lg font-bold text-brand-orange shadow-2xl transition hover:bg-brand-dark hover:text-white hover:scale-105 active:scale-95`}>
            Unlock Your Network Now
          </button>
          <p className={`${nunito.className} mt-6 text-sm font-bold text-white/60 tracking-wide uppercase`}>
            Free forever · No credit card · Alumni-only network
          </p>
        </motion.div>
      </div>
    </section>
  );
}
