import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// @ts-ignore
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateImageName = (title: string, file: File): string => {
  if (!file || !file.name) {
    throw new Error('Fichier invalide ou manquant pour la génération du nom');
  }

  const slugifiedTitle = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .substring(0, 30);

  const uniqueSuffix = Date.now();
  const ext = file.name.split('.').pop();
  return `${slugifiedTitle}-${uniqueSuffix}.${ext}`;
};

export const renameFile = (file: File, newName: string): File => {
  return new File([file], newName, { type: file.type });
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: fr }),
  getDay,
  locales: { fr }
});
