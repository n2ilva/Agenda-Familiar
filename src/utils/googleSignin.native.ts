// MOCK implementation for Expo Go compatibility
// The real Google Sign-In requires a development build
console.warn('Google Sign-In is mocked in Expo Go. Use a development build for full functionality.');

export const statusCodes = {
  SIGN_IN_CANCELLED: '1',
  IN_PROGRESS: '2',
  PLAY_SERVICES_NOT_AVAILABLE: '3',
};

const mockGoogleSignin = {
  configure: (config: any) => {
    console.log('Mock: GoogleSignin.configure called', config);
  },
  hasPlayServices: async () => {
    console.log('Mock: GoogleSignin.hasPlayServices called');
    return false;
  },
  signIn: async () => {
    console.log('Mock: GoogleSignin.signIn called');
    throw new Error('Google Sign-In is not available in Expo Go. Please use a development build.');
  },
  signOut: async () => {
    console.log('Mock: GoogleSignin.signOut called');
  },
  revokeAccess: async () => {
    console.log('Mock: GoogleSignin.revokeAccess called');
  },
  isSignedIn: async () => {
    console.log('Mock: GoogleSignin.isSignedIn called');
    return false;
  },
  getCurrentUser: async () => {
    console.log('Mock: GoogleSignin.getCurrentUser called');
    return null;
  },
  getTokens: async () => {
    console.log('Mock: GoogleSignin.getTokens called');
    throw new Error('Google Sign-In is not available in Expo Go.');
  },
};

export const configureGoogleSignin = (config: any) => {
  mockGoogleSignin.configure(config);
};

export { mockGoogleSignin as GoogleSignin };
