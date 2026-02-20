import React from 'react';
import { LucideIcon } from 'lucide-react';
import { THEME } from '../../config/theme';

interface AchievementCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  description?: string;
  className?: string;
}

/**
 * Reusable achievement/metric card component
 * Used in hero sections to display key stats and achievements
 */
export default function AchievementCard({
  icon: IconComponent,
  value,
  label,
  description,
  className = '',
}: AchievementCardProps) {
  return (
    <div className={`${THEME.opacity.primaryLight} rounded-lg p-4 ${className}`}>
      <IconComponent className="mx-auto mb-2" size={32} />
      <div className="text-2xl font-bold text-center">{value}</div>
      <div className="text-sm text-center font-medium">{label}</div>
      {description && <div className="text-xs text-center opacity-80 mt-1">{description}</div>}
    </div>
  );
}
