/**
 * Google OAuth Configuration
 * 
 * Centralized configuration for Google OAuth Client IDs
 * Used by both LoginScreen and SettingsScreen
 */

// Fallback values from google-services.json
const DEFAULT_WEB_CLIENT_ID = '1038445694694-urk08bl8efnnue8ujj75ofn0tfedbu8u.apps.googleusercontent.com';
const DEFAULT_ANDROID_CLIENT_ID = '1038445694694-4ce6uf88npcvsi6p3ih1etj6ldoegn0o.apps.googleusercontent.com';

// Web Client ID - Used for Expo Go and Web builds
// IMPORTANT: For Native Google Sign-In, you MUST use the Web Client ID (type 3)
export const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || DEFAULT_WEB_CLIENT_ID;

// Android Client ID - Used for standalone APK/AAB builds
// Configured in Google Cloud Console with:
// - Package name: com.natanael.agendafamiliar
// - SHA-1 fingerprint: 83:80:68:59:EE:59:1A:49:E8:5C:20:E8:B9:3D:A4:3E:02:CF:4D:E2
export const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || DEFAULT_ANDROID_CLIENT_ID;

// iOS Client ID - Used for standalone iOS builds
export const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '';

// Export all as default object for convenience
export default {
  webClientId: GOOGLE_WEB_CLIENT_ID,
  androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
};
