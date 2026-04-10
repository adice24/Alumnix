import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { syne } from "@/lib/fonts";
import { ApplyToGigButton } from "@/components/gigs/ApplyToGigButton";

export default async function GigDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const gig = await prisma.gig.findUnique({ where: { id: params.id } });
  if (!gig) return notFound();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
          Gig details
        </p>
        <h1 className={`${syne.className} mt-3 text-3xl font-extrabold text-brand-dark`}>
          {gig.title}
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          {gig.company} · {gig.location} · {gig.type}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ApplyToGigButton gigId={gig.id} company={gig.company} roleTitle={gig.title} />
        </div>

        <div className="mt-7 rounded-2xl bg-brand-surface p-5">
          <p className="text-sm font-semibold text-brand-dark">Description</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-brand-muted">
            {gig.description}
          </p>
        </div>
      </section>
    </div>
  );
}

