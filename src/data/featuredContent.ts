export interface FeaturedTimelineEvent {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  position: 'left' | 'right';
  colorScheme: {
    primary: string;
    background: string;
  };
}

export const featuredTimelineEvents: FeaturedTimelineEvent[] = [
  {
    id: 'telstra-current',
    period: 'Oct 2024 - Present',
    title: 'Resident Platform Engineer',
    company: 'Telstra',
    description: 'Optimized 1TB/hr data pipelines, saved $600K+ annually through Kubernetes and ClickHouse optimization',
    position: 'left',
    colorScheme: {
      primary: 'text-[#3ec1d3] dark:text-[#2a8591]',
      background: 'bg-gray-50 dark:bg-gray-700'
    }
  },
  {
    id: 'data-vanguards-current',
    period: 'Apr 2024 - Present',
    title: 'Principal Data Engineer',
    company: 'Data Vanguards Pty Ltd',
    description: 'Architected world\'s first warehouse-agnostic agentic data platform, reduced costs by 90%',
    position: 'right',
    colorScheme: {
      primary: 'text-[#3ec1d3] dark:text-[#2a8591]',
      background: 'bg-gray-50 dark:bg-gray-700'
    }
  },
  {
    id: 'data-academy',
    period: 'Aug 2023 - Present',
    title: 'Founder | Instructor',
    company: 'Data Profession Academy',
    description: 'Mentored 20+ students, majority secured roles within 3 months',
    position: 'left',
    colorScheme: {
      primary: 'text-green-600 dark:text-green-400',
      background: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
    }
  }
];

export interface FeaturedSpeakingHighlight {
  id: string;
  emoji: string;
  title: string;
  description: string;
  delay: number;
}

export const featuredSpeakingHighlights: FeaturedSpeakingHighlight[] = [
  {
    id: 'ozwater-2024',
    emoji: '🏛️',
    title: 'OzWater Conference 2024',
    description: 'Top paper on ML for Centrifuge Performance Prediction',
    delay: 0
  },
  {
    id: 'data-summit',
    emoji: '🎤',
    title: 'Data Engineering Summit',
    description: 'Keynote on Modern Data Pipeline Architecture',
    delay: 0.1
  },
  {
    id: 'aws-community',
    emoji: '👥',
    title: 'AWS Community Day',
    description: 'Panel on Building Scalable Data Solutions',
    delay: 0.2
  }
];
