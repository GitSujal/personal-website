/**
 * Color and Icon Mapping Utilities
 * Centralized logic for mapping event types, categories, etc. to colors and icons
 * Used across multiple components to reduce duplication
 */

/**
 * Get color classes for timeline/event types
 */
export function getTimelineTypeColor(type: string): string {
  switch (type) {
    case 'work':
      return 'bg-[#3ec1d3]/10 text-[#3ec1d3] dark:bg-[#2a8591]/10 dark:text-[#2a8591]';
    case 'venture':
      return 'bg-green-500/10 text-green-500 dark:bg-green-500/10 dark:text-green-500';
    case 'education':
      return 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/10 dark:text-purple-500';
    case 'volunteer':
      return 'bg-orange-500/10 text-orange-500 dark:bg-orange-500/10 dark:text-orange-500';
    default:
      return 'bg-gray-500/10 text-gray-500 dark:bg-gray-500/10 dark:text-gray-500';
  }
}

/**
 * Get emoji/icon for timeline event types
 */
export function getTimelineTypeIcon(type: string): string {
  switch (type) {
    case 'work':
      return '💼';
    case 'venture':
      return '🚀';
    case 'education':
      return '🎓';
    case 'volunteer':
      return '🤝';
    default:
      return '📋';
  }
}

/**
 * Get color classes for speaking engagement event types
 */
export function getSpeakingEventTypeColor(
  type: 'keynote' | 'conference' | 'panel' | 'workshop' | 'meetup'
): string {
  switch (type) {
    case 'keynote':
      return 'bg-purple-500/10 text-purple-500';
    case 'conference':
      return 'bg-blue-500/10 text-blue-500';
    case 'panel':
      return 'bg-green-500/10 text-green-500';
    case 'workshop':
      return 'bg-orange-500/10 text-orange-500';
    case 'meetup':
      return 'bg-teal-500/10 text-teal-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
}

/**
 * Get emoji for speaking engagement event types
 */
export function getSpeakingEventTypeIcon(
  type: 'keynote' | 'conference' | 'panel' | 'workshop' | 'meetup'
): string {
  switch (type) {
    case 'keynote':
      return '🎤';
    case 'conference':
      return '🏛️';
    case 'panel':
      return '👥';
    case 'workshop':
      return '🛠️';
    case 'meetup':
      return '☕';
    default:
      return '📢';
  }
}

/**
 * Get badge color class for categories
 */
export function getCategoryBadgeColor(category: string): string {
  const categoryLower = category.toLowerCase();

  if (categoryLower.includes('technical') || categoryLower.includes('tech')) {
    return 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/10 dark:text-blue-500';
  }
  if (categoryLower.includes('career') || categoryLower.includes('guide')) {
    return 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/10 dark:text-purple-500';
  }
  if (categoryLower.includes('tutorial') || categoryLower.includes('how')) {
    return 'bg-green-500/10 text-green-500 dark:bg-green-500/10 dark:text-green-500';
  }

  // Default to primary color
  return 'bg-[#3ec1d3]/10 text-[#3ec1d3] dark:bg-[#2a8591]/10 dark:text-[#2a8591]';
}
