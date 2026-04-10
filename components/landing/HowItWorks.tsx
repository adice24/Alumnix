"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, TrendingUp } from "lucide-react";
import { syne, nunito } from "@/lib/fonts";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up with your internship email and build your alumni profile in minutes.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover Opportunities",
    description: "Browse gigs, events, and alumni connections curated for your skills and batch.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Connect & Grow",
    description: "Apply, RSVP, network, and track your career progress — all in one place.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-transparent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${syne.className} text-4xl font-extrabold text-brand-dark sm:text-5xl`}
          >
            Get started in 3 steps
          </motion.h2>
        </div>

        <div className="relative mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Connector Line (Desktop) */}
          <div className="absolute left-0 top-[2.25rem] hidden h-[2px] w-full border-t-2 border-dashed border-brand-orange/20 lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <span className={`${syne.className} absolute -top-12 left-1/2 -translate-x-1/2 text-8xl font-black text-brand-surface group-hover:text-brand-orange/5 transition-colors`}>
                {step.number}
              </span>
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-white shadow-xl shadow-brand-orange/20 transition group-hover:scale-110">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className={`${syne.className} relative z-10 mt-8 text-xl font-bold text-brand-dark`}>
                {step.title}
              </h3>
              <p className={`${nunito.className} relative z-10 mt-3 max-w-[280px] text-sm font-medium leading-relaxed text-brand-muted`}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
