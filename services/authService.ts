import { auth } from './firebase';
import firebase from 'firebase/compat/app'; // For types
import { useUserStore } from '@store/userStore';
import { userService } from './userService';
import type { User } from '@types';

export const authService = {
  async register(
    email: string,
    password: string,
    displayName: string
  ): Promise<User> {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const firebaseUser = userCredential.user;

    if (displayName && firebaseUser) {
      await firebaseUser.updateProfile({ displayName });
    }

    const user: User = {
      uid: firebaseUser?.uid || '',
      email: firebaseUser?.email || '',
      displayName: displayName || firebaseUser?.displayName || undefined, // Use arg if available immediately
      photoURL: firebaseUser?.photoURL || undefined,
    };

    // Create profile in Firestore
    await userService.createUserProfile(user);

    useUserStore.getState().setUser(user);
    return user;
  },

  async login(email: string, password: string): Promise<User> {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const firebaseUser = userCredential.user;
    if (!firebaseUser) throw new Error('Falha no login');

    let user: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
    };

    // Fetch extended profile
    const profile = await userService.getUserProfile(firebaseUser.uid);
    if (profile) {
      user = { ...user, ...profile };
    } else {
      // If no profile exists (legacy user?), create one
      await userService.createUserProfile(user);
    }

    useUserStore.getState().setUser(user);
    return user;
  },

  async logout(): Promise<void> {
    await auth.signOut();
    useUserStore.getState().logout();
  },

  // Note: This is synchronous/quick check from Auth, might not have profile immediately
  // Better to use a dedicated async initializer if we want full profile on reload.
  // For now, we return basic info, but App.tsx should fetch full profile?
  // Actually, we can make this async or keep it basic. 
  // Given App.tsx calls this inside useEffect, we can't make it async easily there unless we change App.tsx logic.
  // BUT, we need the familyId to route correctly.

  // Revised approach for getCurrentUser inside App.tsx:
  // We should probably rely on onAuthStateChanged in App.tsx or use a "refreshProfile" method.
  getCurrentUser(): User | null {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;

    // Return basic user, but we really need the full profile.
    // The store needs to be updated asynchronously.
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
    };
  },

  async reloadUserProfile(): Promise<User | null> {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;

    const profile = await userService.getUserProfile(firebaseUser.uid);
    if (profile) {
      useUserStore.getState().setUser(profile);
      return profile;
    }
    return null;
  },
  async getUserData(firebaseUser: firebase.User): Promise<User> {
    let user: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
    };

    const profile = await userService.getUserProfile(firebaseUser.uid);
    if (profile) {
      user = { ...user, ...profile };
    }
    return user;
  },
};
