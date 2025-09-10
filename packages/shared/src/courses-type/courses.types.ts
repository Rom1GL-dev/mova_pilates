import z from 'zod';

export const TYPE_COURSE = ['INDIVIDUAL', 'COLLECTIVE'] as const;

export const TypeCourseEnum = z.enum(TYPE_COURSE);
export type TypeCourse = (typeof TYPE_COURSE)[number];
