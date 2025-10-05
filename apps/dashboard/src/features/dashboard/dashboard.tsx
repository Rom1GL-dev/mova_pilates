import { UserPlus, Users } from 'lucide-react';
import Layout from '@/components/layout.tsx';
import { DashboardStatsCard } from '@/features/dashboard/components/dashboard-stats-card.tsx';
import { useMe } from '@/lib/auth.tsx';
import { useGetAnalytics } from '@/features/dashboard/usecases/get-analytics/use-get-analytics.tsx';

export function Dashboard() {
  const me = useMe();
  const { data: analyticsResponse, isLoading } = useGetAnalytics();
  const analytics = analyticsResponse?.data.analytics;

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  console.log(analytics);

  return (
    <Layout breadcrumbs={['Tableau de bord']}>
      <div className={'mb-6'}>
        <h2 className={'text-2xl font-bold'}>Bonjour {me.firstname}</h2>
        <p className={'text-md md:text-lg'}>
          Bienvenue sur votre espace d&apos;administration
        </p>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <DashboardStatsCard
          icon={Users}
          label="Total utilisateurs"
          value={analytics.totalUsers}
        />

        <DashboardStatsCard
          icon={UserPlus}
          label="Nouveaux inscrits"
          value={
            analytics.totalNewMemberCurrentMonth > 0
              ? `+${analytics.totalNewMemberCurrentMonth}`
              : 0
          }
          optional="ce mois-ci"
        />
      </div>
    </Layout>
  );
}
