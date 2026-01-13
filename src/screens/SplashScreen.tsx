/**
 * SplashScreen - Tela de carregamento inicial
 * 
 * Exibida enquanto verifica autenticação do usuário
 */

import { useThemeColors } from '@hooks/useThemeColors';
import { FontSize, Spacing } from '@src/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export const SplashScreen: React.FC = () => {
    const colors = useThemeColors();
    const { t } = useTranslation();
    const styles = createStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Logo ou nome do app */}
                <Text style={styles.title}>{t('auth.app_title')}</Text>

                {/* Loading indicator */}
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={styles.loader}
                />

                <Text style={styles.subtitle}>{t('common.loading')}</Text>
            </View>
        </View>
    );
};

const createStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        gap: Spacing.lg,
    },
    title: {
        fontSize: FontSize.xxxl,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: Spacing.md,
    },
    loader: {
        marginVertical: Spacing.md,
    },
    subtitle: {
        fontSize: FontSize.base,
        color: colors.textSecondary,
    },
});

export default SplashScreen;
