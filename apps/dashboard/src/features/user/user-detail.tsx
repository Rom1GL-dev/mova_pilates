import Layout from '@/components/layout';
import { useGetUser } from '@/features/user/usecases/get-user/use-get-user.tsx';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { UrlTabs } from '@/components/url-tabs';
import { UserTabInformation } from '@/features/user/components/user-tab-information.tsx';
import { UserLogs } from '@/features/user/components/user-logs.tsx';
import { UserReservationsTab } from '@/features/user/components/reservations/user-reservations-tab.tsx';
import { Loading } from '@/components/loading.tsx';
import { UserOrdersTab } from '@/features/user/components/orders/user-orders-tab.tsx';

interface Props {
  userId: string;
}

export function UserDetail({ userId }: Props) {
  const { data: userResponse, isLoading } = useGetUser(userId);
  const userData = userResponse?.data.user;

  if (isLoading || !userData) {
    return <Loading />;
  }

  return (
    <Layout
      breadcrumbs={[
        'Utilisateurs',
        userData.firstname + ' ' + userData.lastname
      ]}
      title={`Détail de ${userData.firstname + ' ' + userData.lastname}`}
      description={`Consulter les informations de ${userData.firstname}.`}
    >
      <UrlTabs defaultValue="INFORMATIONS" paramKey="tab" className="space-y-5">
        <TabsList>
          <TabsTrigger value="INFORMATIONS">Informations</TabsTrigger>
          <TabsTrigger value="HISTORIQUES_SESSIONS">
            Historique Sessions
          </TabsTrigger>
          <TabsTrigger value="ACHATS">Achats</TabsTrigger>
          <TabsTrigger value="LOGS">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="INFORMATIONS">
          <UserTabInformation user={userData} />
        </TabsContent>

        <TabsContent value="HISTORIQUES_SESSIONS">
          <UserReservationsTab userId={userId} />
        </TabsContent>

        <TabsContent value="ACHATS">
          <UserOrdersTab userId={userId} />
        </TabsContent>

        <TabsContent value="LOGS">
          <UserLogs userId={userId} />
        </TabsContent>
      </UrlTabs>
    </Layout>
  );
}
