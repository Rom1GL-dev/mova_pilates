import { TypeOfCourse } from '@/features/type-course/types/TTypeCourse.ts';

export const TYPE_COURSE_DATA = {
  [TypeOfCourse.COLLECTIVE]: {
    label: 'Collectif',
    className: 'bg-orange-200 text-orange-800'
  },
  [TypeOfCourse.INDIVUDUAL]: {
    label: 'Individuel',
    className: 'bg-red-200 text-red-800'
  }
};
