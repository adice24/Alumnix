"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Key, Eye, EyeOff } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
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
        callbackUrl: "/admin",
        roleRequirement: "ADMIN",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full bg-transparent text-xl font-black text-black placeholder:text-black/20 focus:outline-none";
  const groupClasses = "flex flex-col gap-4";
  const lineClasses = "flex items-center gap-4 border-b-2 border-black/10 pb-4 transition-all focus-within:border-black";
  const labelTextClasses = "text-xs font-black uppercase tracking-[0.3em] text-black";

  return (
    <AuthShell 
      title="Admin Login" 
      subtitle="Sign in to your administrative dashboard."
    >
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-12">
          {/* Admin Email/ID */}
          <div className={groupClasses}>
            <span className={labelTextClasses}>Admin ID</span>
            <div className={lineClasses}>
              <User className="h-6 w-6 text-black/30" strokeWidth={3} />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Dan Edwards"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Admin Password */}
          <div className={groupClasses}>
            <span className={labelTextClasses}>Password</span>
            <div className={lineClasses}>
              <Key className="h-6 w-6 text-black/30" strokeWidth={3} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
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
        </div>

        {error && (
          <p className="text-md font-black text-red-900 bg-red-500/20 p-5 rounded-2xl border-2 border-red-500/30">
            Authorization failed. Root access denied.
          </p>
        )}

        <div className="flex flex-col gap-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="group relative overflow-hidden rounded-2xl bg-black py-6 text-lg font-black uppercase tracking-[0.4em] text-white shadow-xl"
          >
             {isLoading ? "Authenticating..." : "Login"}
          </motion.button>

          <Link 
            href="/auth/login" 
            className="text-center text-xs font-black uppercase tracking-[0.4em] text-black hover:text-brand-orange transition-colors"
          >
            RETURN TO PUBLIC SECTOR
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
