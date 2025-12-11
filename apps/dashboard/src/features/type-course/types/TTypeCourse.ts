export interface TTypeCourse {
  id: string;
  label: string;
  typeCourse: TypeOfCourse;
  capacity: number;
  description: string;
  image?: File | null;
}

export enum TypeOfCourse {
  INDIVUDUAL = 'INDIVIDUAL',
  COLLECTIVE = 'COLLECTIVE'
}
