import Layout from '@/components/layout';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { PackTabInformation } from '@/features/pack/components/pack-tab-information.tsx';
import { useGetPack } from '@/features/pack/usecases/get-pack/use-get-pack.tsx';
import { Loading } from '@/components/loading.tsx';
import { UrlTabs } from '@/components/url-tabs.tsx';

interface Props {
  packId: string;
}

export function PackDetail({ packId }: Props) {
  const { data: packResponse, isLoading } = useGetPack(packId);
  const pack = packResponse?.data.pack;

  if (isLoading || !pack) {
    return <Loading />;
  }

  return (
    <Layout
      breadcrumbs={['Type de course', pack.label]}
      title={`Détail de ${pack.label}`}
      description={`Consulter les informations de ${pack.label}.`}
    >
      <UrlTabs defaultValue={'INFORMATIONS'} className={'space-y-5'}>
        <TabsList>
          <TabsTrigger value={'INFORMATIONS'}>Informations</TabsTrigger>
          <TabsTrigger value={'PACKS'}>Packs</TabsTrigger>
        </TabsList>
        <TabsContent value={'INFORMATIONS'}>
          <PackTabInformation pack={pack} />
        </TabsContent>
        <TabsContent value={'PACKS'}>test2</TabsContent>
      </UrlTabs>
    </Layout>
  );
}
