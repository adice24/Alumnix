"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
        roleRequirement: "USER",
      });
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
      title="Login to AlumniX" 
      subtitle="Access your professional alumni network."
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-8">
          {/* Email */}
          <div className={groupClasses}>
            <span className={labelTextClasses}>Email Address</span>
            <div className={lineClasses}>
              <Mail className="h-6 w-6 text-black/40" strokeWidth={3} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Institutional Email"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Password */}
          <div className={groupClasses}>
            <span className={labelTextClasses}>Access Key</span>
            <div className={lineClasses}>
              <Lock className="h-6 w-6 text-black/40" strokeWidth={3} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-black/40 hover:text-black"
              >
                {showPassword ? <EyeOff className="h-6 w-6" strokeWidth={3} /> : <Eye className="h-6 w-6" strokeWidth={3} />}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm font-bold text-red-800 bg-red-50 p-4 rounded-xl border border-red-200">
            Authentication failed. Please check your credentials and ensure you are using a standard User account.
          </p>
        )}

        <div className="flex flex-col gap-6 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="group relative overflow-hidden rounded-2xl bg-black py-7 text-2xl font-black uppercase tracking-[0.4em] text-white shadow-2xl"
          >
             {isLoading ? "Verifying..." : "Login"}
          </motion.button>

          <Link 
            href="/auth/signup" 
            className="text-center text-sm font-black uppercase tracking-[0.4em] text-black hover:text-brand-orange transition-colors"
          >
            DON'T HAVE AN ACCOUNT? <span className="border-b-2 border-black">JOIN NOW</span>
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
