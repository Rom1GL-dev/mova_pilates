import Layout from '@/components/layout';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.tsx';
import { useGetSession } from '@/features/session/usecases/get-session/use-get-session.tsx';
import { SessionTabInformation } from '@/features/session/components/session-tab-information.tsx';

interface Props {
  sessionId: string;
}

export function SessionDetail({ sessionId }: Props) {
  const { data: sessionResponse, isLoading } = useGetSession(sessionId);
  const session = sessionResponse?.data.session;

  if (isLoading || !session) {
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
      breadcrumbs={['Sessions']}
      title={`Détail de la session`}
      description={`Consulter les informations de la session.`}
    >
      <Tabs defaultValue={'INFORMATIONS'} className={'space-y-5'}>
        <TabsList>
          <TabsTrigger value={'INFORMATIONS'}>Informations</TabsTrigger>
          <TabsTrigger value={'PARTICIPANTS'}>Participants</TabsTrigger>
        </TabsList>
        <TabsContent value={'INFORMATIONS'}>
          <SessionTabInformation session={session} />
        </TabsContent>
        <TabsContent value={'PARTICIPANTS'}>test2</TabsContent>
      </Tabs>
    </Layout>
  );
}
