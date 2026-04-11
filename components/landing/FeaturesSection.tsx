"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
    href: "/network",
  },
  {
    icon: Briefcase,
    title: "Gig Board",
    description: "Browse exclusive job and internship opportunities posted by companies that trust our alumni network.",
    color: "bg-brand-sky/20",
    iconColor: "text-brand-navy",
    image: "/features/gig_board.png",
    href: "/feed",
  },
  {
    icon: Calendar,
    title: "Events & Programs",
    description: "RSVP to meetups, webinars, and alumni events. Get reminders and join online with one click.",
    color: "bg-brand-yellow/20",
    iconColor: "text-brand-amber",
    image: "/features/events_programs.png",
    href: "/events",
  },
  {
    icon: ClipboardList,
    title: "Application Tracker",
    description: "Track every job you've applied to. Know your status — Pending, Shortlisted, or Hired — in real time.",
    color: "bg-brand-orange/10",
    iconColor: "text-brand-orange",
    image: "/features/application_tracker.png",
    href: "#",
  },
  {
    icon: Megaphone,
    title: "Live Announcements",
    description: "Stay updated with a social-style feed of opportunities, news, and community posts from your alumni circle.",
    color: "bg-brand-sky/20",
    iconColor: "text-brand-navy",
    image: "/features/live_announcements.png",
    href: "/feed",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get personalized job and alumni suggestions powered by your skills, batch, and profile activity.",
    color: "bg-brand-yellow/20",
    iconColor: "text-brand-amber",
    image: "/features/smart_recommendations.png",
    href: "#",
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
              className="h-full"
            >
              <Link href={feature.href} className="animated-card group relative flex h-full flex-col p-5">
                <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  <Image 
                    src={feature.image} 
                    alt={feature.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-sm backdrop-blur-sm`}>
                    <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                  </div>
                </div>
                <h3 className={`${syne.className} heading mt-2 text-lg font-bold text-brand-dark`}>
                  {feature.title}
                </h3>
                <p className={`${nunito.className} mt-3 flex-1 text-sm leading-relaxed text-brand-muted font-medium`}>
                  {feature.description}
                </p>
                <div className={`${nunito.className} mt-4 inline-flex items-center text-sm font-extrabold text-brand-orange transition-colors group-hover:text-brand-amber`}>
                  Learn more <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
