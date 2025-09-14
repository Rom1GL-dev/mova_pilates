import { DataTable } from '@/components/data-table/data-table.tsx';
import { useListTypesCourse } from '@/features/type-course/usecases/list-type-course/use-list-types-course.tsx';
import TypeCourseProvider from '@/features/type-course/context/type-course-provider.tsx';
import { typeCourseColumns } from '@/features/type-course/components/type-course-columns.tsx';
import { TypeCourseListingToolbar } from '@/features/type-course/components/type-course-listing-toolbar.tsx';
import { TypeCourseDialogs } from './components/type-course-dialogs.tsx';
import Layout from '@/components/layout.tsx';

export function TypesCourse() {
  const { data: typeCourseResponse } = useListTypesCourse();
  const { data } = typeCourseResponse ?? {
    data: []
  };

  return (
    <Layout
      breadcrumbs={['Types de cours']}
      title={'Liste des différents types de cours'}
      description={'Retrouvrez la liste de tous les types de cours'}
    >
      <TypeCourseProvider>
        <DataTable
          columns={typeCourseColumns}
          data={data.typeCourse ?? []}
          Toolbar={TypeCourseListingToolbar}
        />
        <TypeCourseDialogs />
      </TypeCourseProvider>
    </Layout>
  );
}
