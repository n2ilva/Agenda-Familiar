import { firestore } from './firebase';
import type { User } from '@types';

const USERS_COLLECTION = 'users';

export const userService = {
    async getUserProfile(uid: string): Promise<User | null> {
        try {
            const doc = await firestore.collection(USERS_COLLECTION).doc(uid).get();
            if (doc.exists) {
                return doc.data() as User;
            }
            return null;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    },

    async createUserProfile(user: User): Promise<void> {
        try {
            // Sanitize user object to remove undefined values (Firestore doesn't like them)
            const safeUser = JSON.parse(JSON.stringify(user));
            await firestore.collection(USERS_COLLECTION).doc(user.uid).set(safeUser, { merge: true });
        } catch (error) {
            console.error('Error creating user profile:', error);
            throw error;
        }
    },

    async updateUserProfile(uid: string, updates: Partial<User>): Promise<void> {
        try {
            await firestore.collection(USERS_COLLECTION).doc(uid).update(updates);
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }
};
