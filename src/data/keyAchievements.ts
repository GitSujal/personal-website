import { LucideIcon, TrendingUp, Users, Award } from 'lucide-react';

export interface KeyAchievement {
  id: string;
  icon: LucideIcon;
  value: string;
  label: string;
  delay: number;
}

export const keyAchievements: KeyAchievement[] = [
  {
    id: 'cost-savings',
    icon: TrendingUp,
    value: '$600K+',
    label: 'Annual Cost Savings',
    delay: 0.2
  },
  {
    id: 'data-processing',
    icon: Users,
    value: '1TB/hr',
    label: 'Data Processing Scale',
    delay: 0.3
  },
  {
    id: 'students-mentored',
    icon: Award,
    value: '20+',
    label: 'Students Mentored',
    delay: 0.4
  }
];
