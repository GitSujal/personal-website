/**
 * Application Theme Configuration
 * Centralized color and styling constants for light and dark modes
 * This is the single source of truth for all theme-related values
 */

export const THEME = {
  // Brand Colors - Main identity colors
  colors: {
    // Primary brand color (used for buttons, links, accents)
    primary: {
      light: '#3ec1d3',
      dark: '#2a8591',
      // Helper classes for Tailwind
      lightClass: 'text-[#3ec1d3]',
      darkClass: 'dark:text-[#2a8591]',
      lightBg: 'bg-[#3ec1d3]',
      darkBg: 'dark:bg-[#2a8591]',
      lightBorder: 'border-[#3ec1d3]',
      darkBorder: 'dark:border-[#2a8591]',
    },

    // Secondary brand color (darker shade, used for hover states)
    secondary: {
      light: '#2596be',
      dark: '#1a6b85',
      lightClass: 'text-[#2596be]',
      darkClass: 'dark:text-[#1a6b85]',
      lightBg: 'bg-[#2596be]',
      darkBg: 'dark:bg-[#1a6b85]',
    },

    // Semantic colors
    success: {
      light: 'text-green-500',
      dark: 'dark:text-green-400',
      lightBg: 'bg-green-500/10',
      darkBg: 'dark:bg-green-500/10',
      lightText: 'text-green-700',
      darkText: 'dark:text-green-400',
    },

    error: {
      light: 'text-red-500',
      dark: 'dark:text-red-400',
      lightBg: 'bg-red-100',
      darkBg: 'dark:bg-red-800/30',
      lightText: 'text-red-700',
      darkText: 'dark:text-red-400',
    },

    warning: {
      light: 'text-orange-500',
      dark: 'dark:text-orange-400',
      lightBg: 'bg-orange-500/10',
      darkBg: 'dark:bg-orange-500/10',
    },

    // Accent colors for timeline and badges
    timeline: {
      venture: {
        light: 'bg-green-500/10 text-green-500',
        dark: 'dark:bg-green-500/10 dark:text-green-500',
        badge: 'bg-green-500',
      },
      education: {
        light: 'bg-purple-500/10 text-purple-500',
        dark: 'dark:bg-purple-500/10 dark:text-purple-500',
      },
      volunteer: {
        light: 'bg-orange-500/10 text-orange-500',
        dark: 'dark:bg-orange-500/10 dark:text-orange-500',
      },
      work: {
        light: 'bg-[#3ec1d3]/10 text-[#3ec1d3]',
        dark: 'dark:bg-[#2a8591]/10 dark:text-[#2a8591]',
      },
    },
  },

  // Background colors for different sections
  backgrounds: {
    // Light backgrounds
    light: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      tertiary: 'bg-gray-100',
    },

    // Dark backgrounds
    dark: {
      primary: 'dark:bg-gray-800',
      secondary: 'dark:bg-gray-900',
      tertiary: 'dark:bg-gray-700',
    },

    // Combined (use these in className)
    section: 'py-16 bg-white dark:bg-gray-800',
    sectionAlt: 'py-16 bg-gray-50 dark:bg-gray-900',
  },

  // Text colors
  text: {
    light: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      tertiary: 'text-gray-500',
    },
    dark: {
      primary: 'dark:text-gray-100',
      secondary: 'dark:text-gray-300',
      tertiary: 'dark:text-gray-400',
    },
    // Combined
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-600 dark:text-gray-300',
    tertiary: 'text-gray-500 dark:text-gray-400',
  },

  // Gradients
  gradients: {
    hero: 'bg-gradient-to-b from-[#3ec1d3] to-[#2596be] dark:from-[#2a8591] dark:to-[#1a6b85]',
    heroBg: {
      light: 'from-[#3ec1d3] to-[#2596be]',
      dark: 'dark:from-[#2a8591] dark:to-[#1a6b85]',
    },
  },

  // Utilities for opacity and transparency
  opacity: {
    primary: 'bg-[#3ec1d3]/20 dark:bg-[#2a8591]/20',
    primaryLight: 'bg-[#3ec1d3]/10 dark:bg-[#2a8591]/10',
    primaryHover: 'hover:bg-[#2596be] dark:hover:bg-[#1a6b85]',
  },

  // Component-specific styles (commonly used patterns)
  components: {
    // Button styles
    button: {
      primary: 'bg-[#3ec1d3] dark:bg-[#2a8591] text-white hover:bg-[#2596be] dark:hover:bg-[#1a6b85] transition-colors',
      secondary:
        'border-2 border-[#3ec1d3] dark:border-[#2a8591] text-[#3ec1d3] dark:text-[#2a8591] hover:bg-[#3ec1d3] dark:hover:bg-[#2a8591] hover:text-white transition-colors',
      ghost: 'text-[#3ec1d3] dark:text-[#2a8591] hover:text-[#2596be] dark:hover:text-[#1a6b85] transition-colors',
    },

    // Card styles
    card: {
      base: 'bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300',
      hover: 'hover:scale-105 transition-transform duration-200',
    },

    // Section wrapper
    section:
      'py-16 bg-white dark:bg-gray-800',
    sectionAlt: 'py-16 bg-gray-50 dark:bg-gray-900',

    // Icon colors
    icon: {
      primary: 'text-[#3ec1d3] dark:text-[#2a8591]',
      secondary: 'text-gray-400',
    },

    // Link styles
    link: 'text-[#3ec1d3] dark:text-[#2a8591] hover:text-[#2596be] dark:hover:text-[#1a6b85] transition-colors',
    linkUnderline: 'text-[#3ec1d3] dark:text-[#2a8591] hover:underline',
  },

  // Common patterns and utilities
  patterns: {
    // For border on hover
    borderHoverPrimary: 'border-2 border-transparent hover:border-[#3ec1d3] dark:hover:border-[#2a8591]',

    // For section divider lines
    divider: 'bg-[#3ec1d3]/20 dark:bg-[#2a8591]/20',

    // For backdrop blur elements
    backdrop: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md',
  },
} as const;

/**
 * Utility function to get combined dark mode classes
 * Useful for className attributes that need both light and dark variants
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Helper to create button className easily
 */
export function getButtonClass(
  variant: 'primary' | 'secondary' | 'ghost' = 'primary'
): string {
  return THEME.components.button[variant];
}

/**
 * Helper to create card className easily
 */
export function getCardClass(withHover = true): string {
  return cn(
    THEME.components.card.base,
    withHover && THEME.components.card.hover
  );
}
