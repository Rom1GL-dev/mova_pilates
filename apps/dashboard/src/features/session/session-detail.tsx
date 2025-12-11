import Layout from '@/components/layout';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UrlTabs } from '@/components/url-tabs';
import { useGetSession } from '@/features/session/usecases/get-session/use-get-session';
import { SessionTabInformation } from '@/features/session/components/session-tab-information';
import { SessionParticipantInformation } from '@/features/session/components/session-participant-information';
import { Loading } from '@/components/loading.tsx';

interface Props {
  sessionId: string;
}

export function SessionDetail({ sessionId }: Props) {
  const { data: sessionResponse, isLoading } = useGetSession(sessionId);
  const session = sessionResponse?.data.session;

  if (isLoading || !session) {
    return <Loading />;
  }

  return (
    <Layout
      breadcrumbs={['Sessions']}
      title="Détail de la session"
      description="Consulter les informations de la session."
    >
      <UrlTabs defaultValue="INFORMATIONS" paramKey="tab" className="space-y-5">
        <TabsList>
          <TabsTrigger value="INFORMATIONS">Informations</TabsTrigger>
          <TabsTrigger value="PARTICIPANTS">Participants</TabsTrigger>
        </TabsList>

        <TabsContent value="INFORMATIONS">
          <SessionTabInformation session={session} />
        </TabsContent>

        <TabsContent value="PARTICIPANTS">
          <SessionParticipantInformation sessionId={session.id} />
        </TabsContent>
      </UrlTabs>
    </Layout>
  );
}
