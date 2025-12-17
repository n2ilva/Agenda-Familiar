import firebase, { firestore, auth } from './firebase';
import type { Category } from '@types';

const CATEGORIES_COLLECTION = 'categories';

export const categoryService = {
  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    if (!category.familyId) {
      throw new Error('Categoria deve pertencer a uma família');
    }

    const categoryData = {
      label: category.label,
      icon: category.icon,
      color: category.color,
      familyId: category.familyId,
      isDefault: false,
      createdBy: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await firestore.collection(CATEGORIES_COLLECTION).add(categoryData);

    return {
      id: docRef.id,
      ...category,
    };
  },

  async deleteCategory(categoryId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    await firestore.collection(CATEGORIES_COLLECTION).doc(categoryId).delete();
  },

  subscribeToCategories(familyId: string, onUpdate: (categories: Category[]) => void): () => void {
    if (!familyId) {
      onUpdate([]);
      return () => {};
    }

    return firestore
      .collection(CATEGORIES_COLLECTION)
      .where('familyId', '==', familyId)
      .onSnapshot(
        (snapshot) => {
          const categories = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Category[];
          onUpdate(categories);
        },
        (error) => {
          console.error('Error subscribing to categories:', error);
        }
      );
  },
};
