import type { Task, User } from '@types';

/**
 * Task Permission Utilities
 * 
 * Follows Single Responsibility Principle (SRP)
 * Centralizes all task permission logic in one place
 */

/**
 * Checks if a user can view a specific task
 * 
 * Rules:
 * - Private tasks: only the creator can view
 * - Public tasks: all family members can view
 * 
 * @param task - The task to check
 * @param user - The current user
 * @returns true if user can view the task, false otherwise
 */
export const canUserViewTask = (task: Task, user: User | null): boolean => {
    if (!user) return false;

    // Private tasks: only creator can view
    if (task.isPrivate) {
        return task.createdBy === user.uid;
    }

    // Public tasks: family members can view
    return task.familyId === user.familyId;
};

/**
 * Checks if a user can edit a specific task
 * 
 * Rules:
 * - User can edit their own tasks
 * - Admin can edit public tasks from their family
 * - Admin cannot edit private tasks from other users
 * 
 * @param task - The task to check
 * @param user - The current user
 * @returns true if user can edit the task, false otherwise
 */
export const canUserEditTask = (task: Task, user: User | null): boolean => {
    if (!user) return false;

    // User can always edit their own tasks
    if (task.createdBy === user.uid) return true;

    // Admin can edit public tasks from their family
    if (user.role === 'admin' && !task.isPrivate && task.familyId === user.familyId) {
        return true;
    }

    return false;
};

/**
 * Checks if a user can delete a specific task
 * 
 * Rules:
 * - User can delete their own tasks
 * - Admin can delete public tasks from their family
 * - Admin cannot delete private tasks from other users
 * 
 * @param task - The task to check
 * @param user - The current user
 * @returns true if user can delete the task, false otherwise
 */
export const canUserDeleteTask = (task: Task, user: User | null): boolean => {
    if (!user) return false;

    // User can always delete their own tasks
    if (task.createdBy === user.uid) return true;

    // Admin can delete public tasks from their family
    if (user.role === 'admin' && !task.isPrivate && task.familyId === user.familyId) {
        return true;
    }

    return false;
};

/**
 * Filters a list of tasks to only include tasks the user can view
 * 
 * This is the primary defense against showing private tasks to unauthorized users
 * 
 * @param tasks - Array of tasks to filter
 * @param user - The current user
 * @returns Filtered array of tasks
 */
export const filterVisibleTasks = (tasks: Task[], user: User | null): Task[] => {
    if (!user) return [];

    return tasks.filter(task => canUserViewTask(task, user));
};

/**
 * Prepares task data when converting from public to private
 * 
 * When a public task is converted to private:
 * - Transfer ownership to the user making the change
 * - Mark as private
 * - Keep all other data intact
 * 
 * @param task - The original task
 * @param userId - The user converting it to private
 * @returns Updated task data
 */
export const convertTaskToPrivate = (task: Partial<Task>, userId: string): Partial<Task> => {
    return {
        ...task,
        isPrivate: true,
        createdBy: userId, // Transfer ownership
    };
};

/**
 * Prepares task data when converting from private to public
 * 
 * When a private task is converted to public:
 * - Keep current owner
 * - Mark as public
 * - Keep all other data intact
 * 
 * @param task - The original task
 * @returns Updated task data
 */
export const convertTaskToPublic = (task: Partial<Task>): Partial<Task> => {
    return {
        ...task,
        isPrivate: false,
        // Keep createdBy as is - owner doesn't change when making public
    };
};
