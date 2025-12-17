import type { Task } from '@types';
import type { ITaskRepository } from '@domain/repositories/ITaskRepository';
import { firestoreTaskRepository } from '@infrastructure/repositories/FirestoreTaskRepository';

/**
 * Task service - facade over repository
 * Uses Dependency Injection for better testability
 */
class TaskService {
  constructor(private repository: ITaskRepository) {}

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    return this.repository.create(task);
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    return this.repository.update(taskId, updates);
  }

  async deleteTask(taskId: string): Promise<void> {
    return this.repository.delete(taskId);
  }

  async getTaskById(taskId: string): Promise<Task | null> {
    return this.repository.getById(taskId);
  }

  subscribeToTasks(familyId: string, onUpdate: (tasks: Task[]) => void): () => void {
    return this.repository.subscribe(familyId, onUpdate);
  }
}

// Export singleton with Firestore repository
export const taskService = new TaskService(firestoreTaskRepository);
