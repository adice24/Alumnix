"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, User, Calendar, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    batchYear: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Security keys do not match.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          batchYear: formData.batchYear ? parseInt(formData.batchYear) : undefined
        }),
      });
      if (res.ok) {
        router.push("/auth/login?success=account-created");
      } else {
        const data = await res.json();
        setError(data.error || data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Network sync error.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full bg-transparent text-xl font-black text-black placeholder:text-black/40 focus:outline-none";
  const groupClasses = "flex flex-col gap-4";
  const lineClasses = "flex items-center gap-4 border-b-2 border-black/20 pb-4 transition-all focus-within:border-black";
  const labelTextClasses = "text-base font-black uppercase tracking-[0.3em] text-black";

  return (
    <AuthShell 
      title="Join AlumniX" 
      subtitle="Create your professional alumni account instantly."
    >
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Full Name */}
          <div className={`${groupClasses} md:col-span-2`}>
            <span className={labelTextClasses}>Full name</span>
            <div className={lineClasses}>
              <User className="h-6 w-6 text-black/30" strokeWidth={3} />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder=""
                className={inputClasses}
              />
            </div>
          </div>

          {/* Email */}
          <div className={groupClasses}>
            <span className={labelTextClasses}>Email</span>
            <div className={lineClasses}>
              <Mail className="h-6 w-6 text-black/30" strokeWidth={3} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder=""
                className={inputClasses}
              />
            </div>
          </div>

          {/* Batch Year */}
          <div className={groupClasses}>
            <span className={labelTextClasses}>Batch Year</span>
            <div className={lineClasses}>
              <Calendar className="h-6 w-6 text-black/30" strokeWidth={3} />
              <select
                required
                value={formData.batchYear}
                onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                className={inputClasses}
                style={{ appearance: 'none' }}
              >
                <option value="" disabled className="bg-white">Select...</option>
                {[2024, 2023, 2022, 2021, 2020].map(yr => (
                  <option key={yr} value={yr} className="bg-white">{yr}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Password */}
          <div className={groupClasses}>
            <span className={labelTextClasses}>Password</span>
            <div className={lineClasses}>
              <Lock className="h-6 w-6 text-black/30" strokeWidth={3} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-black/30 hover:text-black"
              >
                {showPassword ? <EyeOff className="h-6 w-6" strokeWidth={3} /> : <Eye className="h-6 w-6" strokeWidth={3} />}
              </button>
            </div>
          </div>

          {/* Confirm */}
          <div className={groupClasses}>
            <span className={labelTextClasses}>Confirm</span>
            <div className={lineClasses}>
              <CheckCircle2 className="h-6 w-6 text-black/30" strokeWidth={3} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Repeat"
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-md font-black text-red-900 bg-red-500/20 p-5 rounded-2xl border-2 border-red-500/30">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-8 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="group relative overflow-hidden rounded-2xl bg-black py-7 text-2xl font-black uppercase tracking-[0.4em] text-white shadow-2xl"
          >
             {isLoading ? "Syncing..." : "Create account"}
          </motion.button>

          <Link 
            href="/auth/login" 
            className="text-center text-sm font-black uppercase tracking-[0.4em] text-black hover:text-brand-orange transition-colors"
          >
            ALREADY HAVE AN ACCOUNT? <span className="border-b-2 border-black">LOG IN</span>
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
