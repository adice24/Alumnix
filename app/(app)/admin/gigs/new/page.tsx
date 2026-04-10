"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { syne, nunito } from "@/lib/fonts";
import { Briefcase, MapPin, Target, DollarSign, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostGigPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salaryBand: "",
    description: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/admin/gigs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).catch(() => null);

    setLoading(false);
    if (res?.ok) {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="p-3 rounded-2xl bg-white border border-brand-surface text-brand-muted hover:text-brand-orange transition-all shadow-sm">
           <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className={`${syne.className} text-3xl font-black text-brand-dark`}>Post Exclusive Gig</h1>
          <p className={`${nunito.className} text-brand-muted text-sm`}>This listing will be immediately visible to all verified alumni.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2 rounded-[2.5rem] bg-white border border-brand-surface p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-brand-dark px-1">Role Title</span>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-surface bg-brand-surface/20 px-4 py-3.5 focus-within:border-brand-orange/40 transition-all">
                <Briefcase className="h-4 w-4 text-brand-orange" />
                <input 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="flex-1 bg-transparent text-sm font-bold text-brand-dark focus:outline-none placeholder:text-brand-muted/50"
                  placeholder="e.g. Senior Product Designer"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-brand-dark px-1">Company Name</span>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-surface bg-brand-surface/20 px-4 py-3.5 focus-within:border-brand-orange/40 transition-all">
                <Target className="h-4 w-4 text-brand-sky" />
                <input 
                  required
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="flex-1 bg-transparent text-sm font-bold text-brand-dark focus:outline-none placeholder:text-brand-muted/50"
                  placeholder="e.g. Stripe, Razorpay"
                />
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="block space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-brand-dark px-1">Location</span>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-surface bg-brand-surface/20 px-4 py-3.5 focus-within:border-brand-orange/40 transition-all">
                <MapPin className="h-4 w-4 text-brand-muted" />
                <input 
                  required
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="flex-1 bg-transparent text-sm font-bold text-brand-dark focus:outline-none placeholder:text-brand-muted/50"
                  placeholder="Remote / Bengaluru"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-brand-dark px-1">Job Type</span>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full rounded-2xl border border-brand-surface bg-brand-surface/20 px-4 py-[15px] text-sm font-bold text-brand-dark focus:outline-none appearance-none cursor-pointer"
              >
                {["Full-time", "Internship", "Contract", "Freelance"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-brand-dark px-1">Salary Band</span>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-surface bg-brand-surface/20 px-4 py-3.5 focus-within:border-brand-orange/40 transition-all">
                <DollarSign className="h-4 w-4 text-green-600" />
                <input 
                  value={formData.salaryBand}
                  onChange={e => setFormData({...formData, salaryBand: e.target.value})}
                  className="flex-1 bg-transparent text-sm font-bold text-brand-dark focus:outline-none placeholder:text-brand-muted/50"
                  placeholder="e.g. 15L - 20L"
                />
              </div>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-brand-dark px-1">Role Description</span>
            <textarea 
              required
              rows={8}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full rounded-[2rem] border border-brand-surface bg-brand-surface/20 px-6 py-5 text-sm font-bold text-brand-dark focus:outline-none placeholder:text-brand-muted/50 resize-none min-h-[200px]"
              placeholder="What makes this role special? Mention required experience and early-bird benefits for alumni."
            />
          </label>
        </div>

        <div className="md:col-span-2 flex justify-end gap-4">
           <Link href="/admin" className="px-8 py-4 rounded-full text-sm font-extrabold text-brand-muted hover:text-brand-dark transition-colors">
              Discard
           </Link>
           <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`${syne.className} flex items-center gap-2 px-10 py-4 rounded-full bg-brand-orange text-white text-base font-black shadow-xl shadow-brand-orange/20 hover:bg-brand-amber transition-all disabled:opacity-50`}
           >
              {loading ? "Publishing..." : <>Publish Gig <Send className="h-4 w-4" /></>}
           </motion.button>
        </div>
      </form>
    </div>
  );
}
