import type { RecurrenceType } from '@types';

/**
 * Task-related constants
 */
export const RECURRENCE_TYPES = {
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

export const RECURRENCE_LABELS: Record<RecurrenceType, string> = {
  none: 'Não repete',
  daily: 'Diariamente',
  weekly: 'Semanalmente',
  monthly: 'Mensalmente',
  yearly: 'Anualmente',
};

/**
 * Notification timing constants (in minutes)
 */
export const NOTIFICATION_TIMINGS = {
  EXACT: 0,
  ONE_HOUR_BEFORE: 60,
  TWELVE_HOURS_BEFORE: 720,
} as const;

/**
 * Task status constants
 */
export const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
} as const;
