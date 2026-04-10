"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Calendar, ClipboardList, Megaphone, Sparkles } from "lucide-react";
import { syne, nunito } from "@/lib/fonts";

const features = [
  {
    icon: Users,
    title: "Alumni Network",
    description: "Search and connect with thousands of verified alumni across batches, companies, and skills.",
    color: "bg-brand-orange/10",
    iconColor: "text-brand-orange",
  },
  {
    icon: Briefcase,
    title: "Gig Board",
    description: "Browse exclusive job and internship opportunities posted by companies that trust our alumni network.",
    color: "bg-brand-sky/20",
    iconColor: "text-brand-navy",
  },
  {
    icon: Calendar,
    title: "Events & Programs",
    description: "RSVP to meetups, webinars, and alumni events. Get reminders and join online with one click.",
    color: "bg-brand-yellow/20",
    iconColor: "text-brand-amber",
  },
  {
    icon: ClipboardList,
    title: "Application Tracker",
    description: "Track every job you've applied to. Know your status — Pending, Shortlisted, or Hired — in real time.",
    color: "bg-brand-orange/10",
    iconColor: "text-brand-orange",
  },
  {
    icon: Megaphone,
    title: "Live Announcements",
    description: "Stay updated with a social-style feed of opportunities, news, and community posts from your alumni circle.",
    color: "bg-brand-sky/20",
    iconColor: "text-brand-navy",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get personalized job and alumni suggestions powered by your skills, batch, and profile activity.",
    color: "bg-brand-yellow/20",
    iconColor: "text-brand-amber",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-transparent py-24 lg:py-40">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${nunito.className} text-sm font-bold uppercase tracking-[0.2em] text-brand-orange`}
          >
            Platform Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${syne.className} mt-4 text-4xl font-extrabold text-brand-dark sm:text-5xl`}
          >
            Everything you need to <br className="hidden sm:block" /> grow after your internship
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${nunito.className} mx-auto mt-6 max-w-2xl text-lg text-brand-muted`}
          >
            We&apos;ve built the infrastructure to help you stay connected, find opportunities, 
            and accelerate your professional journey.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col rounded-3xl border border-transparent bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-orange/20 hover:shadow-xl"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}>
                <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
              </div>
              <h3 className={`${syne.className} mt-6 text-xl font-bold text-brand-dark`}>
                {feature.title}
              </h3>
              <p className={`${nunito.className} mt-3 flex-1 text-sm leading-relaxed text-brand-muted font-medium`}>
                {feature.description}
              </p>
              <button className={`${nunito.className} mt-6 inline-flex items-center text-sm font-extrabold text-brand-orange hover:text-brand-amber`}>
                Learn more <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
