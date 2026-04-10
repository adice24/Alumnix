import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { PageHeader } from "@/components/app/PageHeader";
import { NotificationsClient } from "@/components/notifications/NotificationsClient";

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const uid = (session as any).uid as string;

  // server-render list (client auto-refresh via SSE)
  const items = await prisma.notification.findMany({
    where: { userId: uid },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="NOTIFICATIONS"
        title="Stay one step ahead"
        subtitle="New gig matches, connection updates, event reminders — delivered instantly."
      />
      <NotificationsClient initial={items} />
    </div>
  );
}

