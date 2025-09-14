import Layout from '@/components/layout';
import { useGetUser } from '@/features/user/usecases/get-user/use-get-user.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.tsx';
import { UserTabInformation } from '@/features/user/components/user-tab-information.tsx';

interface Props {
  userId: string;
}

export function UserDetail({ userId }: Props) {
  const { data: userResponse, isLoading } = useGetUser(userId);
  const userData = userResponse?.data.user;

  if (isLoading || !userData) {
    return (
      <div className={'flex min-h-screen w-full items-center justify-center'}>
        <div
          className={
            'border-primary h-10 w-10 animate-spin rounded-full border-4 border-solid border-t-transparent'
          }
        ></div>
      </div>
    );
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
      <Tabs defaultValue={'INFORMATIONS'} className={'space-y-5'}>
        <TabsList>
          <TabsTrigger value={'INFORMATIONS'}>Informations</TabsTrigger>
          <TabsTrigger value={'HISTORIQUES_SESSIONS'}>
            Historique Sessions
          </TabsTrigger>
        </TabsList>
        <TabsContent value={'INFORMATIONS'}>
          <UserTabInformation user={userData} />
        </TabsContent>
        <TabsContent value={'HISTORIQUES_SESSIONS'}>test2</TabsContent>
      </Tabs>
    </Layout>
  );
}
