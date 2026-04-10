"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { syne, nunito } from "@/lib/fonts";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsBar() {
  const stats = [
    { number: 10000, suffix: "+", label: "Alumni Connected" },
    { number: 500, suffix: "+", label: "Gigs Posted" },
    { number: 200, suffix: "+", label: "Events Held" },
    { number: 50, suffix: "+", label: "Partner Companies" },
  ];

  return (
    <section className="bg-brand-dark/90 backdrop-blur-sm py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center text-center ${
                i !== stats.length - 1 ? "lg:border-r lg:border-white/10" : ""
              }`}
            >
              <h2 className={`${syne.className} text-4xl font-extrabold text-brand-orange sm:text-5xl`}>
                <CountUp end={stat.number} suffix={stat.suffix} />
              </h2>
              <p className={`${nunito.className} mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
