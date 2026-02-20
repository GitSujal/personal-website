import { LucideIcon, Code, Users } from 'lucide-react';

export interface Passion {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export const passions: Passion[] = [
  {
    id: 'sustainable-pipelines',
    icon: Code,
    title: 'Building Sustainable Pipelines',
    description:
      'Passionate about creating robust and scalable data pipelines that solve real business problems and stand the test of time.',
    link: '/hire-me',
  },
  {
    id: 'next-generation',
    icon: Users,
    title: 'Nurturing the Next Generation',
    description:
      'Dedicated to teaching and mentoring the next generation of data professionals through Data Profession Academy and Data Sparta.',
    link: '/ventures',
  },
];
