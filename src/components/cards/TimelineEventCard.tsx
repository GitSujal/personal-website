import React from 'react';
import { Card, CardBody, Chip } from '@nextui-org/react';
import { LucideIcon } from 'lucide-react';
import { getTimelineTypeColor, getTimelineTypeIcon } from '../../utils/colorMappings';
import { THEME } from '../../config/theme';

interface TimelineEventCardProps {
  year: string;
  title: string;
  company: string;
  location?: string;
  description?: string;
  icon: LucideIcon;
  type: 'work' | 'venture' | 'education' | 'volunteer';
  tags?: string[];
  isSelected?: boolean;
  onPress?: () => void;
  className?: string;
}

export default function TimelineEventCard({
  year,
  title,
  company,
  location,
  description,
  icon: IconComponent,
  type,
  tags = [],
  isSelected = false,
  onPress,
  className = '',
}: TimelineEventCardProps) {
  return (
    <Card
      isPressable={!!onPress}
      onPress={onPress}
      className={`transition-all duration-300 ${
        isSelected ? `scale-105 border-2 ${THEME.colors.primary.lightBorder} ${THEME.colors.primary.darkBorder}` : 'hover:scale-102'
      } ${className}`}
    >
      <CardBody className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <IconComponent className={`${THEME.components.icon.primary} dark:text-[#2a8591]`} size={24} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${THEME.colors.primary.lightClass} ${THEME.colors.primary.darkClass}`}>
              {year}
            </span>
            <span className="text-xs">{getTimelineTypeIcon(type)}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">{company}</p>

        {location && <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{location}</p>}

        {description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{description}</p>}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                size="sm"
                className={getTimelineTypeColor(type)}
                variant="flat"
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
