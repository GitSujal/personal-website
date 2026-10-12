export interface CurrentRole {
  id: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
  startDate: string;
  endDate?: string;
  type: 'engineering' | 'consulting' | 'education';
  colorScheme: {
    primary: string;
    primaryDark: string;
    background: string;
    backgroundDark: string;
    accent: string;
  };
}

export const currentRoles: CurrentRole[] = [
  {
    id: 'western-power-senior-data-engineer',
    title: 'Senior Data Engineer',
    company: 'Western Power',
    description: 'Optimising end-to-end pipelines for network forecast models using Databricks, DBT, and Snowflake',
    highlights: [
      'Migrated infrastructure to IaC using Databricks Asset Bundle',
      'Established enterprise standards for dbt and data modelling',
      'Optimising end-to-end pipeline for the network forecast model'
    ],
    startDate: 'Jan 2026',
    type: 'engineering',
    colorScheme: {
      primary: 'text-[#f6ae2d] dark:text-[#d99720]',
      primaryDark: 'text-[#d99720]',
      background: 'bg-gradient-to-r from-[#f6ae2d]/10 to-[#f26419]/10 dark:from-[#d99720]/10 dark:to-[#c45114]/10',
      backgroundDark: 'dark:from-[#d99720]/10 dark:to-[#c45114]/10',
      accent: 'bg-[#f6ae2d]'
    }
  },
  {
    id: 'data-vanguards-principal',
    title: 'Principal Data Engineer',
    company: 'Data Vanguards',
    description: 'Building Agent-first data platform - world\'s first warehouse-agnostic agentic solution',
    highlights: [
      'Warehouse-agnostic architecture',
      'AI agent integration',
      '90% operational cost reduction'
    ],
    startDate: 'Apr 2024',
    type: 'consulting',
    colorScheme: {
      primary: 'text-purple-600 dark:text-purple-400',
      primaryDark: 'text-purple-400',
      background: 'bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20',
      backgroundDark: 'dark:from-purple-900/20 dark:to-blue-900/20',
      accent: 'bg-purple-500'
    }
  },
  {
    id: 'data-profession-academy-founder',
    title: 'Founder | Instructor',
    company: 'Data Profession Academy',
    description: 'Nurturing next generation data analysts for the age of AI - 20+ students mentored',
    highlights: [
      '12-week comprehensive curriculum',
      'Majority secured roles within 3 months',
      'Technical & soft skills training'
    ],
    startDate: 'Aug 2023',
    type: 'education',
    colorScheme: {
      primary: 'text-green-600 dark:text-green-400',
      primaryDark: 'text-green-400',
      background: 'bg-gradient-to-r from-green-100/50 to-emerald-100/50 dark:from-green-900/20 dark:to-emerald-900/20',
      backgroundDark: 'dark:from-green-900/20 dark:to-emerald-900/20',
      accent: 'bg-green-500'
    }
  }
];
