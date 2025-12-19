import type { Category } from '@types';

// Default categories - 'other' is always last
export const DEFAULT_CATEGORIES: Category[] = [
    { id: 'home', label: 'Casa', color: '#10B981', icon: 'home-outline', isDefault: true },
    { id: 'work', label: 'Trabalho', color: '#3B82F6', icon: 'briefcase-outline', isDefault: true },
    { id: 'school', label: 'Escola', color: '#F59E0B', icon: 'school-outline', isDefault: true },
    { id: 'finance', label: 'Finanças', color: '#8B5CF6', icon: 'cash-outline', isDefault: true },
    { id: 'health', label: 'Saúde', color: '#EF4444', icon: 'fitness-outline', isDefault: true },
    { id: 'shopping', label: 'Compras', color: '#EC4899', icon: 'cart-outline', isDefault: true },
    { id: 'leisure', label: 'Lazer', color: '#14B8A6', icon: 'game-controller-outline', isDefault: true },
    { id: 'exercise', label: 'Exercícios', color: '#F97316', icon: 'barbell-outline', isDefault: true },
    { id: 'family', label: 'Família', color: '#A855F7', icon: 'people-outline', isDefault: true },
    { id: 'projects', label: 'Projetos', color: '#06B6D4', icon: 'bulb-outline', isDefault: true },
    { id: 'meetings', label: 'Reuniões', color: '#6366F1', icon: 'calendar-outline', isDefault: true },
    { id: 'travel', label: 'Viagem', color: '#84CC16', icon: 'airplane-outline', isDefault: true },
    // 'other' is always last in the list
    { id: 'other', label: 'Outro', color: '#6B7280', icon: 'grid-outline', isDefault: true },
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
