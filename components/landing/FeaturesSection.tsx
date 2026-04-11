"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Briefcase, Calendar, ClipboardList, Megaphone, Sparkles } from "lucide-react";
import { syne, nunito } from "@/lib/fonts";

const features = [
  {
    icon: Users,
    title: "Alumni Network",
    description: "Search and connect with thousands of verified alumni across batches, companies, and skills.",
    color: "bg-brand-orange/10",
    iconColor: "text-brand-orange",
    image: "/features/alumni_network.png",
  },
  {
    icon: Briefcase,
    title: "Gig Board",
    description: "Browse exclusive job and internship opportunities posted by companies that trust our alumni network.",
    color: "bg-brand-sky/20",
    iconColor: "text-brand-navy",
    image: "/features/gig_board.png",
  },
  {
    icon: Calendar,
    title: "Events & Programs",
    description: "RSVP to meetups, webinars, and alumni events. Get reminders and join online with one click.",
    color: "bg-brand-yellow/20",
    iconColor: "text-brand-amber",
    image: "/features/events_programs.png",
  },
  {
    icon: ClipboardList,
    title: "Application Tracker",
    description: "Track every job you've applied to. Know your status — Pending, Shortlisted, or Hired — in real time.",
    color: "bg-brand-orange/10",
    iconColor: "text-brand-orange",
    image: "/features/application_tracker.png",
  },
  {
    icon: Megaphone,
    title: "Live Announcements",
    description: "Stay updated with a social-style feed of opportunities, news, and community posts from your alumni circle.",
    color: "bg-brand-sky/20",
    iconColor: "text-brand-navy",
    image: "/features/live_announcements.png",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get personalized job and alumni suggestions powered by your skills, batch, and profile activity.",
    color: "bg-brand-yellow/20",
    iconColor: "text-brand-amber",
    image: "/features/smart_recommendations.png",
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
              className="animated-card group relative flex flex-col p-6 sm:p-8"
            >
              <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl border border-white/10">
                <Image 
                  src={feature.image} 
                  alt={feature.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm`}>
                  <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                </div>
              </div>
              <h3 className={`${syne.className} heading mt-2 text-xl font-bold text-white`}>
                {feature.title}
              </h3>
              <p className={`${nunito.className} mt-3 flex-1 text-sm leading-relaxed text-gray-300 font-medium`}>
                {feature.description}
              </p>
              <button className={`${nunito.className} mt-6 inline-flex items-center text-sm font-extrabold text-[#e81cff] hover:text-[#fc00ff]`}>
                Learn more <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
