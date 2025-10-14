export interface TTypeCourse {
  id: string;
  label: string;
  typeCourse: TypeOfCourse;
  capacity: number;
}

export enum TypeOfCourse {
  INDIVUDUAL = 'INDIVIDUAL',
  COLLECTIVE = 'COLLECTIVE'
}
