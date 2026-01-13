import AsyncStorage from '@react-native-async-storage/async-storage';
import { userService } from '@src/firebase';
import type { Preferences, User } from '@types';
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  preferences: Preferences;
  setUser: (user: User | null) => void;
  setPreferences: (preferences: Partial<Preferences>) => void;
  loadPreferences: () => Promise<void>;
  logout: () => void;
}

const defaultPreferences: Preferences = {
  theme: 'light',
  language: 'pt-BR',
  notifications: true,
};

const PREFERENCES_KEY = '@AgendaFamiliar:preferences';

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  preferences: defaultPreferences,

  setUser: (user: User | null) => {
    set({ user });
    
    // Load user preferences from Firebase when user logs in
    if (user?.uid && user.preferences) {
      set({ preferences: user.preferences });
      // Also save to AsyncStorage for offline access
      AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(user.preferences))
        .catch(error => console.error('[UserStore] Error saving preferences to AsyncStorage:', error));
      console.log('[UserStore] Preferences loaded from user profile:', user.preferences);
    }
  },

  setPreferences: async (preferences: Partial<Preferences>) => {
    const newPreferences = { ...get().preferences, ...preferences };
    set({ preferences: newPreferences });

    // Persist to AsyncStorage (for offline access)
    try {
      await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(newPreferences));
      console.log('[UserStore] Preferences saved to AsyncStorage:', newPreferences);
    } catch (error) {
      console.error('[UserStore] Error saving preferences to AsyncStorage:', error);
    }

    // Sync to Firebase (if user is logged in)
    const currentUser = get().user;
    if (currentUser?.uid) {
      try {
        await userService.updateUserPreferences(currentUser.uid, newPreferences);
        // Update local user object with new preferences
        set({ user: { ...currentUser, preferences: newPreferences } });
      } catch (error) {
        console.error('[UserStore] Error syncing preferences to Firebase:', error);
      }
    }
  },

  loadPreferences: async () => {
    try {
      const stored = await AsyncStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        const preferences = JSON.parse(stored);
        set({ preferences });
        console.log('[UserStore] Preferences loaded from AsyncStorage:', preferences);
      }
    } catch (error) {
      console.error('[UserStore] Error loading preferences from AsyncStorage:', error);
    }
  },

  logout: () => {
    set({ user: null, preferences: defaultPreferences });
  },
}));

