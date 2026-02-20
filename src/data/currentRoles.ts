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
    id: 'western-power-senior-engineer',
    title: 'Senior Data Engineer',
    company: 'Western Power',
    description: 'Designing large-scale data architecture for 1000+ interdependent dbt models, forecasting with ML for 10-year network demand',
    highlights: [
      'Large-scale dbt transformation architecture',
      'Everything-as-Code and CI/CD culture',
      'Data governance automation and tooling'
    ],
    startDate: 'Sep 2025',
    type: 'engineering',
    colorScheme: {
      primary: 'text-[#3ec1d3] dark:text-[#2a8591]',
      primaryDark: 'text-[#2a8591]',
      background: 'bg-gradient-to-r from-[#3ec1d3]/10 to-[#2596be]/10 dark:from-[#2a8591]/10 dark:to-[#1a6b85]/10',
      backgroundDark: 'dark:from-[#2a8591]/10 dark:to-[#1a6b85]/10',
      accent: 'bg-[#3ec1d3]'
    }
  },
  {
    id: 'telstra-platform-engineer',
    title: 'Resident Platform Engineer',
    company: 'Telstra',
    description: 'Optimised event-driven data platform processing 1TB/hr, reducing cost by 50% with savings of $600K/yr',
    highlights: [
      'Kafka/AWS MSK architecture & optimization',
      'Clickhouse & OpenSearch pipeline engineering',
      'Event-based Kubernetes scaling'
    ],
    startDate: 'Oct 2024',
    endDate: 'Aug 2025',
    type: 'engineering',
    colorScheme: {
      primary: 'text-[#3ec1d3] dark:text-[#2a8591]',
      primaryDark: 'text-[#2a8591]',
      background: 'bg-gradient-to-r from-[#3ec1d3]/10 to-[#2596be]/10 dark:from-[#2a8591]/10 dark:to-[#1a6b85]/10',
      backgroundDark: 'dark:from-[#2a8591]/10 dark:to-[#1a6b85]/10',
      accent: 'bg-[#3ec1d3]'
    }
  },
  {
    id: 'data-vanguards-principal',
    title: 'Principal Data Engineer',
    company: 'Data Vanguards',
    description: 'Architect of warehouse-agnostic data platform with AI agents, OAuth2 APIs, and IoT ingestion pipelines',
    highlights: [
      'Warehouse-agnostic agentic data platform',
      'Real-time IoT pipeline architecture',
      '90% cost reduction on legacy systems'
    ],
    startDate: 'Apr 2024',
    endDate: 'Sep 2025',
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
