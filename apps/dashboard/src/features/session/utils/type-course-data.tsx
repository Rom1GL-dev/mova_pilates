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

export const SESSION_PARTICIPANT_RESERVATION_STATUS_DATA = {
  PENDING: {
    label: 'En attente',
    value: 'PENDING',
    className: 'bg-yellow-200 text-yellow-800'
  },
  CONFIRMED: {
    label: 'Confirmé',
    value: 'CONFIRMED',
    className: 'bg-green-200 text-green-800'
  },
  CANCELLED: {
    label: 'Annulé',
    value: 'CANCELLED',
    className: 'bg-red-200 text-red-800'
  },
  MISSING: {
    label: 'Absent',
    value: 'MISSING',
    className: 'bg-gray-200 text-gray-800'
  },
  PRESENT: {
    label: 'Présent',
    value: 'PRESENT',
    className: 'bg-blue-200 text-blue-800'
  }
};
