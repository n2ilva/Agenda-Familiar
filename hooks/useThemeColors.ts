
import { useColorScheme } from 'react-native';
import { colors } from '@styles/colors';
import { useUserStore } from '@store/userStore';

export function useThemeColors() {
    const systemScheme = useColorScheme() ?? 'light';
    const { preferences } = useUserStore();

    // If preference is 'system' or undefined, use system scheme. 
    // Otherwise use the explicit preference ('light' or 'dark').
    // default to 'light' if something goes wrong.
    const activeTheme = (!preferences?.theme || preferences.theme === 'system')
        ? systemScheme
        : preferences.theme;

    return colors[activeTheme] || colors.light;
}
