import type { Category } from '@types';

// Default categories - labels are translated via i18n using category IDs
// The label field is kept for backward compatibility but should use i18n in UI
export const DEFAULT_CATEGORIES: Category[] = [
    { id: 'home', label: 'home', color: '#10B981', icon: 'home-outline', isDefault: true },
    { id: 'work', label: 'work', color: '#3B82F6', icon: 'briefcase-outline', isDefault: true },
    { id: 'school', label: 'school', color: '#F59E0B', icon: 'school-outline', isDefault: true },
    { id: 'finance', label: 'finance', color: '#8B5CF6', icon: 'cash-outline', isDefault: true },
    { id: 'health', label: 'health', color: '#EF4444', icon: 'fitness-outline', isDefault: true },
    { id: 'shopping', label: 'shopping', color: '#EC4899', icon: 'cart-outline', isDefault: true },
    { id: 'leisure', label: 'leisure', color: '#14B8A6', icon: 'game-controller-outline', isDefault: true },
    { id: 'exercise', label: 'exercise', color: '#F97316', icon: 'barbell-outline', isDefault: true },
    { id: 'family', label: 'family', color: '#A855F7', icon: 'people-outline', isDefault: true },
    { id: 'projects', label: 'projects', color: '#06B6D4', icon: 'bulb-outline', isDefault: true },
    { id: 'meetings', label: 'meetings', color: '#6366F1', icon: 'calendar-outline', isDefault: true },
    { id: 'travel', label: 'travel', color: '#84CC16', icon: 'airplane-outline', isDefault: true },
    // 'other' is always last in the list
    { id: 'other', label: 'other', color: '#6B7280', icon: 'grid-outline', isDefault: true },
];

// Note: CATEGORY_OPTIONS is now dynamic and should be retrieved from categoryStore
export const CATEGORY_OPTIONS = DEFAULT_CATEGORIES.map(cat => ({
    value: cat.id,
    label: cat.label,
    color: cat.color,
    icon: cat.icon
}));

// Helper functions - these will be used with categoryStore
export const getCategoryColor = (categoryId: string, categories: Category[] = DEFAULT_CATEGORIES): string => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#6B7280';
};

export const getCategoryIcon = (categoryId: string, categories: Category[] = DEFAULT_CATEGORIES): string => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : 'grid-outline';
};

export const getCategoryLabel = (categoryId: string, categories: Category[] = DEFAULT_CATEGORIES): string => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : categoryId;
};

export const hexToRGBA = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
