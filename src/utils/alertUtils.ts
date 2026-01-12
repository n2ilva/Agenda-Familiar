/**
 * Cross-platform Alert Utility
 * 
 * Provides alert functions that work on both mobile (React Native Alert)
 * and web (window.alert/confirm)
 */

import { Alert, Platform } from 'react-native';

type AlertButton = {
    text: string;
    style?: 'default' | 'cancel' | 'destructive';
    onPress?: () => void;
};

/**
 * Shows a simple message alert
 */
export const showAlert = (title: string, message?: string) => {
    if (Platform.OS === 'web') {
        window.alert(message ? `${title}\n\n${message}` : title);
    } else {
        Alert.alert(title, message);
    }
};

/**
 * Shows a confirmation dialog with OK/Cancel
 * Returns a promise that resolves to true if confirmed, false otherwise
 */
export const showConfirm = async (
    title: string,
    message: string,
    confirmText: string = 'OK',
    cancelText: string = 'Cancelar'
): Promise<boolean> => {
    if (Platform.OS === 'web') {
        return window.confirm(message ? `${title}\n\n${message}` : title);
    } else {
        return new Promise((resolve) => {
            Alert.alert(title, message, [
                { text: cancelText, style: 'cancel', onPress: () => resolve(false) },
                { text: confirmText, style: 'destructive', onPress: () => resolve(true) },
            ]);
        });
    }
};

/**
 * Shows an alert with custom buttons (mobile only, web falls back to confirm)
 */
export const showAlertWithButtons = (
    title: string,
    message: string,
    buttons: AlertButton[]
) => {
    if (Platform.OS === 'web') {
        // On web, find the cancel and confirm buttons
        const cancelButton = buttons.find(b => b.style === 'cancel');
        const confirmButton = buttons.find(b => b.style !== 'cancel') || buttons[buttons.length - 1];
        
        const confirmed = window.confirm(message ? `${title}\n\n${message}` : title);
        if (confirmed && confirmButton?.onPress) {
            confirmButton.onPress();
        } else if (!confirmed && cancelButton?.onPress) {
            cancelButton.onPress();
        }
    } else {
        Alert.alert(title, message, buttons);
    }
};
