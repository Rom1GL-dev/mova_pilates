import { AppType, LogsType } from '@/features/log/types/TLogs.ts';
import { ComputerIcon, Phone } from 'lucide-react';

export const APP_TYPE_DATA = {
  [AppType.MOBILE]: {
    label: 'Mobile',
    icon: Phone,
    className: 'bg-blue-200 text-blue-800'
  },
  [AppType.ADMIN]: {
    label: 'Administrateur',
    icon: ComputerIcon,
    className: 'bg-green-200 text-green-800'
  }
};

export const LOGS_TYPE_DATA = {
  [LogsType.ADD]: {
    label: 'Ajout',
    className: 'bg-blue-200 text-blue-800'
  },
  [LogsType.UPDATE]: {
    label: 'Modification',
    className: 'bg-orange-200 text-orange-800'
  },
  [LogsType.DELETE]: {
    label: 'Suppression',
    className: 'bg-red-200 text-red-800'
  },
  [LogsType.LOGIN]: {
    label: 'Connexion',
    className: 'bg-green-200 text-green-800'
  },
  [LogsType.LOGOUT]: {
    label: 'Déconnexion',
    className: 'bg-gray-200 text-gray-800'
  },
  [LogsType.PAYMENT]: {
    label: 'Paiement',
    className: 'bg-purple-200 text-purple-800'
  },
  [LogsType.PASSWORD_RESET]: {
    label: 'Réinitialisation de mot de passe',
    className: 'bg-pink-200 text-pink-800'
  },
  [LogsType.RESERVATION]: {
    label: 'Réservation',
    className: 'bg-teal-200 text-teal-800'
  },
  [LogsType.CANCELLATION]: {
    label: 'Annulation',
    className: 'bg-orange-200 text-orange-800'
  },
  [LogsType.OTHER]: {
    label: 'Autre',
    className: 'bg-gray-200 text-gray-800'
  }
};
