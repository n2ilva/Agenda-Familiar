export const colors = {
  light: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    background: '#FFFFFF',
    surface: '#F3F4F6',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  },
  dark: {
    primary: '#818CF8',
    secondary: '#A78BFA',
    success: '#34D399',
    danger: '#F87171',
    warning: '#FBBF24',
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
  },
};

export type ColorScheme = keyof typeof colors;
