import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ROLE_GRADE = {
  CHIEF_OF_POLICE: {
    roleId: '1406617185761366128',
    label: 'Chief of Police',
    code: 'COP'
  },
  ASSISTANT_CHIEF: {
    roleId: '1406617194087059466',
    label: 'Assistant Chief',
    code: 'ACH'
  },
  DEPUTY_CHIEF: {
    roleId: '1406617193252257833',
    label: 'Deputy Chief',
    code: 'DCH'
  },
  COMMANDER: {
    roleId: '1408894611325456518',
    label: 'Commander',
    code: 'CMD'
  },
  CAPTAIN: {
    roleId: '1406617195445747742',
    label: 'Captain',
    code: 'CPT'
  },
  LIEUTENANT: {
    roleId: '1406617196045668546',
    label: 'Lieutenant',
    code: 'LTN'
  },
  SERGEANT_II: {
    roleId: '1408895095771762768',
    label: 'Sergeant II',
    code: 'SGT II'
  },
  SERGEANT_I: {
    roleId: '1406617196645453867',
    label: 'Sergeant I',
    code: 'SGT I'
  },
  DETECTIVE_III: {
    roleId: '1408895095721164960',
    label: 'Detective III',
    code: 'DET III'
  },
  DETECTIVE_II: {
    roleId: '1408894610570477679',
    label: 'Detective II',
    code: 'DET II'
  },
  DETECTIVE_I: {
    roleId: '1406617197316407407',
    label: 'Detective I',
    code: 'DET I'
  },
  SENIOR_LEAD_OFFICER: {
    roleId: '1408895093946978385',
    label: 'Senior Lead Officer',
    code: 'SLO'
  },
  POLICE_OFFICER_III: {
    roleId: '1406617199912947833',
    label: 'Police Officer III',
    code: 'OFF III'
  },
  POLICE_OFFICER_II: {
    roleId: '1406617200714055811',
    label: 'Police Officer II',
    code: 'OFF II'
  },
  POLICE_OFFICER_I: {
    roleId: '1406617201531949116',
    label: 'Police Officer I',
    code: 'OFF I'
  },
  ROOKIE: {
    roleId: '1406617202119147531',
    label: 'Rookie',
    code: 'ROK'
  }
};

export const ROLE_CATEGORY = {
  OFFICE_OF_THE_CHIEF_OF_POLICE: {
    roleId: '1406617297514266654',
    label: 'Office of the Chief of Police'
  },
  COMMAND_STAFF: {
    roleId: '1406617296864018462',
    label: 'Command Staff'
  },
  EXECUTIVE_STAFF: {
    roleId: '1406617296138539050',
    label: 'Executive Staff'
  },
  SUPERVISOR_TEAM: {
    roleId: '1408894611727974591',
    label: 'Supervisor Team'
  },
  OPERATIONNAL_FIELD: {
    roleId: '1406617204933529690',
    label: 'Operational / Field'
  }
};

export const ROLE_SPECIALITE = {
  POLICE_ACADEMY: {
    roleId: '1408902446578794656',
    label: 'Police Acaemdy'
  }
};
