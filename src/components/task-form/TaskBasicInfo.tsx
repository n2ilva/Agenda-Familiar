import { useThemeColors } from '@hooks/useThemeColors';
import { fontSize, spacing } from '@styles/spacing';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface TaskBasicInfoProps {
  title: string;
  description: string;
  onTitleChange: (text: string) => void;
  onDescriptionChange: (text: string) => void;
}

/**
 * Component for basic task information (title and description)
 * Follows Single Responsibility Principle
 */
export const TaskBasicInfo: React.FC<TaskBasicInfoProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}) => {
  const colors = useThemeColors();
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <Text style={[styles.label, { color: colors.text }]}>{t('tasks.task_title')} *</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={title}
        onChangeText={onTitleChange}
        placeholder={t('tasks.title_placeholder')}
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={[styles.label, { color: colors.text }]}>{t('tasks.task_description')}</Text>
      <TextInput
        style={[
          styles.input,
          styles.textArea,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={description}
        onChangeText={onDescriptionChange}
        placeholder={t('tasks.description_placeholder')}
        placeholderTextColor={colors.textSecondary}
        multiline
        numberOfLines={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.base,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: fontSize.base,
    marginBottom: spacing.md,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
