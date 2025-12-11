import Layout from '@/components/layout';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.tsx';
import { useGetTypeCourse } from '@/features/type-course/usecases/get-type-course/use-get-type-course.tsx';
import { TypeCourseTabInformation } from '@/features/type-course/components/type-course-tab-information.tsx';
import { TypeCoursePacks } from '@/features/type-course/components/type-course-packs.tsx';
import { Loading } from '@/components/loading.tsx';

interface Props {
  typeCourseId: string;
}

export function TypeCourseDetail({ typeCourseId }: Props) {
  const { data: typeCourseResponse, isLoading } =
    useGetTypeCourse(typeCourseId);
  const typeCourseData = typeCourseResponse?.data.typeCourse;

  if (isLoading || !typeCourseData) {
    return <Loading />;
  }

  return (
    <Layout
      breadcrumbs={['Type de course', typeCourseData.label]}
      title={`Détail de ${typeCourseData.label}`}
      description={`Consulter les informations de ${typeCourseData.label}.`}
    >
      <Tabs defaultValue={'INFORMATIONS'} className={'space-y-5'}>
        <TabsList>
          <TabsTrigger value={'INFORMATIONS'}>Informations</TabsTrigger>
          <TabsTrigger value={'PACKS'}>Packs</TabsTrigger>
        </TabsList>
        <TabsContent value={'INFORMATIONS'}>
          <TypeCourseTabInformation typeCourse={typeCourseData} />
        </TabsContent>
        <TabsContent value={'PACKS'}>
          <TypeCoursePacks typeCourse={typeCourseData} />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
