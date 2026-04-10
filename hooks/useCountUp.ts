"use client";

import { useEffect, useRef, useState } from "react";

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

export function useCountUp(
  target: number,
  options: { duration?: number; startWhenVisible?: boolean } = {},
) {
  const { duration = 2000, startWhenVisible = true } = options;
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startWhenVisible);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startWhenVisible || hasStarted) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startWhenVisible, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let raf = 0;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(t);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, hasStarted]);

  return { value: formatNumber(value), ref };
}
