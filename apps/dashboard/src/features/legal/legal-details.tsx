import Layout from '@/components/layout';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UrlTabs } from '@/components/url-tabs';
import { LegalTabContent } from '@/features/legal/components/legal-tab-content';

export function LegalDetails() {
  return (
    <Layout breadcrumbs={['Légal']}>
      <UrlTabs
        defaultValue="POLITIQUE_DE_CONFIDENTIALITE"
        paramKey="tab"
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="POLITIQUE_DE_CONFIDENTIALITE">
            Politique de confidentialité
          </TabsTrigger>
          <TabsTrigger value="CONDITIONS_D_UTILISATION">
            Conditions d'utilisation
          </TabsTrigger>
          <TabsTrigger value="CONDITIONS_DE_VENTE">
            Conditions de vente
          </TabsTrigger>
          <TabsTrigger value="MENTIONS_LEGALES">Mentions légales</TabsTrigger>
        </TabsList>

        <TabsContent value="POLITIQUE_DE_CONFIDENTIALITE">
          <LegalTabContent
            type="POLITIQUE_DE_CONFIDENTIALITE"
            title="Politique de confidentialité"
          />
        </TabsContent>

        <TabsContent value="CONDITIONS_D_UTILISATION">
          <LegalTabContent
            type="CONDITIONS_D_UTILISATION"
            title="Conditions d'utilisation"
          />
        </TabsContent>

        <TabsContent value="CONDITIONS_DE_VENTE">
          <LegalTabContent
            type="CONDITIONS_DE_VENTE"
            title="Conditions de vente"
          />
        </TabsContent>

        <TabsContent value="MENTIONS_LEGALES">
          <LegalTabContent type="MENTIONS_LEGALES" title="Mentions légales" />
        </TabsContent>
      </UrlTabs>
    </Layout>
  );
}
