"use client";

import ScrollFloat from "@/components/ui/ScrollFloat";
import GradientText from "@/components/ui/GradientText";

export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
        {kicker}
      </p>
      <div className="mt-3">
        <ScrollFloat animationDuration={0.9} stagger={0.02}>
          {title}
        </ScrollFloat>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-muted">
        {subtitle}
      </p>
      <div className="mt-4">
        <GradientText
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          animationSpeed={8}
          showBorder={true}
          className="text-sm"
        >
          Real-time • Verified alumni • Built for internship cohorts
        </GradientText>
      </div>
    </div>
  );
}

