"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { syne, nunito } from "@/lib/fonts";

const testimonials = [
  {
    quote: "AlumniX completely changed how I found my first job. The gig board had roles I couldn't find anywhere else.",
    author: "Priya S.",
    info: "Batch '22 · Product Manager @ Swiggy",
    initials: "PS",
    color: "bg-brand-orange",
  },
  {
    quote: "The alumni network feature helped me get a referral at my dream company within two weeks of signing up.",
    author: "Arjun M.",
    info: "Batch '23 · SDE @ Google",
    initials: "AM",
    color: "bg-brand-sky",
  },
  {
    quote: "I love how everything is in one place — events, jobs, alumni. It feels like LinkedIn but actually built for us.",
    author: "Sneha R.",
    info: "Batch '21 · Data Scientist @ Meta",
    initials: "SR",
    color: "bg-brand-yellow",
  },
];

export default function Testimonials() {
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
            Alumni love it
          </motion.h2>
        </div>

        <div className="mt-16 flex flex-col gap-6 lg:flex-row">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex-1 rounded-2xl border-l-4 border-brand-orange bg-white p-8 shadow-sm"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <p className={`${nunito.className} mt-6 text-lg leading-relaxed text-brand-dark italic`}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className={`${syne.className} text-sm font-bold text-brand-dark`}>
                    {t.author}
                  </h4>
                  <p className={`${nunito.className} text-xs font-medium text-brand-muted`}>
                    {t.info}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
