import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { syne } from "@/lib/fonts";
import { ConnectButton } from "@/components/network/ConnectButton";

export default async function NetworkProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const uid = (session as any).uid as string;

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { profile: true },
  });
  if (!user) return notFound();

  const isSelf = uid === user.id;
  const connected = isSelf
    ? false
    : !!(await prisma.connection.findUnique({
        where: { fromId_toId: { fromId: uid, toId: user.id } },
      }));

  const skills = JSON.parse(user.profile?.skillsJson ?? "[]") as string[];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
          Alumni profile
        </p>
        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/15 text-sm font-extrabold text-brand-amber ring-1 ring-brand-orange/20">
              {user.name
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h1 className={`${syne.className} text-2xl font-extrabold text-brand-dark`}>
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-brand-muted">
                {user.profile?.title && user.profile?.company
                  ? `${user.profile.title} @ ${user.profile.company}`
                  : user.profile?.headline
                    ? user.profile.headline
                    : "AlumniX member"}
              </p>
              {user.profile?.location ? (
                <p className="mt-1 text-sm text-brand-muted">{user.profile.location}</p>
              ) : null}
            </div>
          </div>

          {!isSelf ? (
            <ConnectButton toUserId={user.id} disabled={connected} />
          ) : (
            <span className="rounded-full bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-muted">
              This is you
            </span>
          )}
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-brand-surface p-5 lg:col-span-2">
            <p className="text-sm font-semibold text-brand-dark">About</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-brand-muted">
              {user.profile?.bio ||
                "This alum hasn’t added a bio yet — connect and say hello."}
            </p>
          </div>
          <div className="rounded-2xl bg-brand-surface p-5">
            <p className="text-sm font-semibold text-brand-dark">Skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(skills.length ? skills : ["Networking", "Career growth"]).map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-navy ring-1 ring-black/5"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

