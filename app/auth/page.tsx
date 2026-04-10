"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { Lock, Mail, User } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { syne } from "@/lib/fonts";

type Mode = "login" | "register";

function Segmented({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div className="relative grid grid-cols-2 rounded-full border border-white/10 bg-black/20 p-1">
      <motion.div
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white/10"
        animate={{ x: mode === "login" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      />
      <button
        type="button"
        onClick={() => setMode("login")}
        className={`${syne.className} relative z-10 rounded-full px-4 py-2 text-xs font-extrabold ${
          mode === "login" ? "text-white" : "text-white/60"
        }`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => setMode("register")}
        className={`${syne.className} relative z-10 rounded-full px-4 py-2 text-xs font-extrabold ${
          mode === "register" ? "text-white" : "text-white/60"
        }`}
      >
        Register
      </button>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthInner />
    </Suspense>
  );
}

function AuthInner() {
  const sp = useSearchParams();
  const initial = (sp.get("mode") as Mode) || "register";
  const [mode, setMode] = useState<Mode>(initial === "login" ? "login" : "register");

  // login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // register state
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [otp, setOtp] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  const canLogin = useMemo(
    () => loginEmail.trim().length > 4 && loginPassword.length >= 8 && !loginLoading,
    [loginEmail, loginPassword, loginLoading],
  );
  const canRegister = useMemo(
    () =>
      name.trim().length >= 2 &&
      regEmail.trim().length > 4 &&
      regPassword.length >= 8 &&
      !regLoading,
    [name, regEmail, regPassword, regLoading],
  );

  async function doLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    const res = await signIn("credentials", {
      email: loginEmail,
      password: loginPassword,
      redirect: false,
    });
    setLoginLoading(false);
    if (!res?.ok) {
      setLoginError(
        "Login failed. Check your email/password and ensure OTP verification is complete.",
      );
      return;
    }
    window.location.href = "/dashboard";
  }

  async function doRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError(null);
    setRegLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: regEmail, password: regPassword }),
    }).catch(() => null);
    setRegLoading(false);
    if (!res?.ok) {
      setRegError("Signup failed. Try a different email.");
      return;
    }
    const data = (await res.json()) as { ok: boolean; otp?: string };
    setOtp(data.otp ?? null);
  }

  return (
    <AuthShell
      title={mode === "login" ? "Welcome back" : "Join AlumniX"}
      subtitle={
        mode === "login"
          ? "Sign in to continue to AlumniX."
          : "Create your account and verify OTP to activate."
      }
    >
      <div className="space-y-6">
        <Segmented mode={mode} setMode={setMode} />

        <AnimatePresence mode="wait" initial={false}>
          {mode === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <form onSubmit={doLogin} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/80">
                    Email
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 focus-within:border-brand-orange/60">
                    <Mail className="h-4 w-4 text-white/60" />
                    <input
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      type="email"
                      autoComplete="email"
                      placeholder="you@college.edu"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/80">
                    Password
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 focus-within:border-brand-orange/60">
                    <Lock className="h-4 w-4 text-white/60" />
                    <input
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                    />
                  </div>
                </label>

                {loginError ? (
                  <div className="rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-4 py-3 text-sm text-white/90">
                    {loginError}
                  </div>
                ) : null}

                <motion.button
                  type="submit"
                  disabled={!canLogin}
                  whileHover={canLogin ? { scale: 1.02 } : undefined}
                  whileTap={canLogin ? { scale: 0.98 } : undefined}
                  className={`${syne.className} w-full rounded-full bg-brand-orange px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand-orange/25 disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {loginLoading ? "Signing in..." : "Sign in"}
                </motion.button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white"
                  >
                    Create an account
                  </button>
                  <Link
                    href="/auth/verify-otp"
                    className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white"
                  >
                    Verify OTP
                  </Link>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <form onSubmit={doRegister} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/80">
                    Full name
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 focus-within:border-brand-orange/60">
                    <User className="h-4 w-4 text-white/60" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/80">
                    Email
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 focus-within:border-brand-orange/60">
                    <Mail className="h-4 w-4 text-white/60" />
                    <input
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      type="email"
                      autoComplete="email"
                      placeholder="you@college.edu"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/80">
                    Password
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 focus-within:border-brand-orange/60">
                    <Lock className="h-4 w-4 text-white/60" />
                    <input
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      type="password"
                      autoComplete="new-password"
                      placeholder="Min 8 characters"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                    />
                  </div>
                </label>

                {otp ? (
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/90">
                    <p className="font-semibold">Dev OTP (local only):</p>
                    <p className={`${syne.className} mt-1 text-xl font-extrabold text-brand-orange`}>
                      {otp}
                    </p>
                    <p className="mt-1 text-white/60">
                      Continue to{" "}
                      <Link
                        href={`/auth/verify-otp?email=${encodeURIComponent(regEmail)}`}
                        className="text-white underline decoration-white/20 underline-offset-4 hover:text-white"
                      >
                        verify OTP
                      </Link>
                      .
                    </p>
                  </div>
                ) : null}

                {regError ? (
                  <div className="rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-4 py-3 text-sm text-white/90">
                    {regError}
                  </div>
                ) : null}

                <motion.button
                  type="submit"
                  disabled={!canRegister}
                  whileHover={canRegister ? { scale: 1.02 } : undefined}
                  whileTap={canRegister ? { scale: 0.98 } : undefined}
                  className={`${syne.className} w-full rounded-full bg-brand-orange px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand-orange/25 disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {regLoading ? "Creating..." : "Create account"}
                </motion.button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white"
                  >
                    Already have an account?
                  </button>
                  <Link
                    href="/auth/verify-otp"
                    className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white"
                  >
                    Verify OTP
                  </Link>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <Link
            href="/auth/login"
            className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-center text-white/70 hover:text-white"
          >
            Direct login page
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-center text-white/70 hover:text-white"
          >
            Direct register page
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}

