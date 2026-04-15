"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { syne, nunito } from "@/lib/fonts";

const spotlight = [
  { initials: "AK", name: "Aryan K.", role: "UI Designer @ Figma", skills: ["React", "Figma", "Design"], color: "bg-brand-orange" },
  { initials: "MS", name: "Meera S.", role: "Data Analyst @ Zepto", skills: ["Python", "SQL", "Excel"], color: "bg-brand-sky" },
  { initials: "RV", name: "Rohan V.", role: "Backend Dev @ Razorpay", skills: ["Node.js", "AWS", "MongoDB"], color: "bg-brand-yellow" },
  { initials: "PJ", name: "Prachi J.", role: "Marketing Lead @ Unacademy", skills: ["SEO", "Content", "Growth"], color: "bg-brand-navy" },
  { initials: "KT", name: "Karan T.", role: "Product Manager @ Zomato", skills: ["Agile", "Strategy", "Data"], color: "bg-brand-amber" },
  { initials: "NS", name: "Naina S.", role: "Full Stack @ Freshworks", skills: ["React", "Node", "Postgres"], color: "bg-brand-orange" },
];

export default function AlumniSpotlight() {
  return (
    <section id="network" className="bg-transparent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${syne.className} text-4xl font-extrabold text-brand-dark sm:text-5xl`}
          >
            Your Batchmates Are Already Here
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spotlight.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${person.color}`}>
                  {person.initials}
                </div>
                <div>
                  <h4 className={`${syne.className} text-base font-bold text-brand-dark`}>
                    {person.name}
                  </h4>
                  <p className={`${nunito.className} text-sm font-medium text-brand-muted`}>
                    {person.role}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {person.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`${nunito.className} rounded-full bg-brand-surface px-3 py-1 text-[10px] font-bold text-brand-navy`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-brand-orange/90 backdrop-blur-[2px] transition-opacity cursor-pointer"
              >
                <Link 
                  href="/network"
                  className={`${syne.className} rounded-full bg-white px-6 py-2.5 text-sm font-bold text-brand-orange shadow-xl hover:scale-105 active:scale-95 transition-transform`}
                >
                  View Profile &rarr;
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
