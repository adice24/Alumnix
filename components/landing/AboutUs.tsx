"use client";

import { motion } from "framer-motion";
import { syne, nunito } from "@/lib/fonts";
import { Users, Globe, Rocket, Shield } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "Built for interns, by interns. We prioritize meaningful connections over professional noise."
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access a worldwide ecosystem of alumni from top-tier companies and startups."
  },
  {
    icon: Rocket,
    title: "Career Growth",
    description: "Find your next big break through exclusive gigs and internal referral channels."
  },
  {
    icon: Shield,
    title: "Secure & Verified",
    description: "A private environment where every member is a verified intern alumnus."
  }
];

export default function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-brand-surface py-24 sm:py-32">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/10 px-4 py-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Our Story</span>
            </div>
            
            <h2 className={`${syne.className} text-4xl font-black leading-tight text-brand-dark sm:text-5xl`}>
              Legacy isn&apos;t just about the past. <br />
              <span className="text-brand-orange">It&apos;s about what we build next.</span>
            </h2>
            
            <p className={`${nunito.className} text-lg leading-relaxed text-brand-muted`}>
              AlumniX was founded on a simple realization: the connections you make during an internship shouldn&apos;t expire with your ID card. We built a centralized ecosystem where former interns can stay connected with their companies, discover project-based gigs, and participate in exclusive alumni events.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className={`${syne.className} text-4xl font-black text-brand-dark`}>10K+</p>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">Active Alumni</p>
              </div>
              <div>
                <p className={`${syne.className} text-4xl font-black text-brand-dark`}>500+</p>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">Gigs Posted</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Value Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-3xl bg-white p-8 shadow-sm border border-transparent hover:border-brand-orange/20 hover:shadow-xl transition-all"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-surface text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className={`${syne.className} mb-3 text-lg font-bold text-brand-dark`}>{item.title}</h3>
                <p className={`${nunito.className} text-sm leading-relaxed text-brand-muted`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -right-24 bottom-0 z-0 h-96 w-96 rounded-full bg-brand-orange/5 blur-3xl" />
    </section>
  );
}
