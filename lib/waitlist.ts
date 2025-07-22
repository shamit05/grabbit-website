// Optimized: Only call verifyEmailAndActivateUser if not already verified
export async function getOrVerifyUserByMagicToken(token: string): Promise<WaitlistUser | null> {
  // 1. Try to get the user document directly
  const user = await getUserByMagicToken(token);
  if (!user) return null;
  if (user.emailVerified) {
    return user;
  }
  // 2. If not verified, call the function to verify and activate
  return await verifyEmailAndActivateUser(token);
}
// Waitlist functionality with Firebase - SECURE & OPTIMIZED VERSION
import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  updateDoc,
  query, 
  where
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

export interface WaitlistUser {
  id: string;
  email: string;
  referralCode: string;
  referredBy?: string | null;
  points: number;
  joinedAt: any; // Firestore timestamp
  emailVerified: boolean;
  subscribed: boolean;
}

// Get Firebase Functions instance (lazy initialization)
function getFirebaseFunctions() {
  if (typeof window === 'undefined') {
    // Server-side: return null to avoid initialization
    return null;
  }
  return getFunctions();
}

// Get callable functions (lazy initialization)
function getCallableFunction(name: string) {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw new Error('Firebase Functions not available on server side');
  }
  return httpsCallable(functions, name);
}

// Generate magic link for user dashboard access (client-side only for display)
export function generateMagicLink(magicToken: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/waitlist-dashboard?token=${magicToken}`;
  }
  return `/waitlist-dashboard?token=${magicToken}`;
}

// Add user to waitlist using secure Firebase Function (handles signup + email sending)
export async function addToWaitlist(email: string, referralCode?: string): Promise<{ success: boolean; isExistingUser?: boolean; message?: string }> {
  try {
    const signupToWaitlistFn = getCallableFunction('signupToWaitlist');
    const result = await signupToWaitlistFn({ email, referralCode });
    return result.data as { success: boolean; isExistingUser?: boolean; message?: string };
  } catch (error: any) {
    console.error('Error adding to waitlist:', error);
    throw new Error(error.message || 'Failed to join waitlist. Please try again.');
  }
}

// Verify email and activate user using Firebase Function
export async function verifyEmailAndActivateUser(magicToken: string): Promise<WaitlistUser | null> {
  try {
    const verifyUserEmailFn = getCallableFunction('verifyUserEmail');
    const result = await verifyUserEmailFn({ magicToken });
    const data = result.data as { success: boolean; user?: WaitlistUser };
    
    if (data.success && data.user) {
      return data.user;
    }
    
    return null;
  } catch (error: any) {
    console.error('Error verifying email:', error);
    throw new Error(error.message || 'Invalid access token');
  }
}

// Get user by magic token using direct Firestore read (truly secure via document ID)
export async function getUserByMagicToken(token: string): Promise<WaitlistUser | null> {
  try {
    if (typeof window === 'undefined') {
      // Server-side: can't access Firestore directly
      return null;
    }

    // Direct document access using magic token as document ID - truly secure!
    const userDocRef = doc(db, 'waitlist', token);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return null;
    }
    
    const userData = userDoc.data();
    return {
      id: userData.id,
      email: userData.email,
      referralCode: userData.referralCode,
      referredBy: userData.referredBy || null,
      points: userData.points || 0,
      joinedAt: userData.joinedAt,
      emailVerified: userData.emailVerified || false,
      subscribed: userData.subscribed !== false // default to true for backward compatibility
    } as WaitlistUser;
  } catch (error: any) {
    console.error('Error getting user by token:', error);
    return null;
  }
}

// Get total waitlist count using direct Firestore read (public stats)
export async function getWaitlistCount(): Promise<number> {
  try {
    if (typeof window === 'undefined') {
      // Server-side: return 0
      return 0;
    }

    const statsRef = doc(db, 'stats', 'waitlist');
    const statsDoc = await getDoc(statsRef);
    
    if (!statsDoc.exists()) {
      return 0;
    }
    
    const data = statsDoc.data();
    return data?.totalSignups || 0;
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    return 0; // Return 0 on error
  }
}

// Unsubscribe user from emails using magic token (secure direct Firestore access)
export async function unsubscribeUser(token: string): Promise<{ success: boolean; message: string }> {
  try {
    if (typeof window === 'undefined') {
      // Server-side: not supported
      return { 
        success: false, 
        message: 'Unsubscribe not available on server side.' 
      };
    }

    // Direct document access using magic token as document ID
    const userDocRef = doc(db, 'waitlist', token);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return { 
        success: false, 
        message: 'Invalid unsubscribe link. Please contact support if you continue to receive emails.' 
      };
    }
    
    const userData = userDoc.data();
    
    // Check if already unsubscribed
    if (userData.subscribed === false) {
      return { 
        success: true, 
        message: 'You are already unsubscribed from email communications.' 
      };
    }
    
    // Update subscription status - simple update since document ID proves ownership
    await updateDoc(userDocRef, {
      subscribed: false
    });
    
    return { 
      success: true, 
      message: 'You have been successfully unsubscribed from email communications.' 
    };
  } catch (error: any) {
    console.error('Error unsubscribing user:', error);
    return { 
      success: false, 
      message: 'An error occurred while processing your unsubscribe request. Please try again.' 
    };
  }
}

// Generate unsubscribe link with magic token (client-side only)
export function generateUnsubscribeLink(magicToken: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/unsubscribe?token=${encodeURIComponent(magicToken)}`;
  }
  return `/unsubscribe?token=${encodeURIComponent(magicToken)}`;
}

// Deprecated functions - keeping for backward compatibility but they now use Firebase Functions

// This function is deprecated - use addToWaitlist which now uses Firebase Functions
export async function sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
  // This function is deprecated - use addToWaitlist which handles email sending via Firebase Functions
  console.warn('sendVerificationEmail is deprecated. Use addToWaitlist instead.');
}

// This function is deprecated - email sending is now handled by Firebase Functions
export async function sendMagicLinkEmail(email: string, magicToken: string): Promise<void> {
  // This function is deprecated - email sending is now handled securely by Firebase Functions
  console.warn('sendMagicLinkEmail is deprecated. Email sending is now handled by Firebase Functions.');
}

// These functions are no longer available for security reasons:
// - validateReferralCode (now handled server-side)
// - generateReferralCode (now handled server-side)
// - generateMagicToken (now handled server-side)

// Generate referral code (for display purposes only - actual codes are generated server-side)
export function generateReferralCode(): string {
  console.warn('generateReferralCode should only be used for display. Real codes are generated server-side.');
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Generate magic token (for display purposes only - actual tokens are generated server-side)
export function generateMagicToken(): string {
  console.warn('generateMagicToken should only be used for display. Real tokens are generated server-side.');
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Validate referral code (now handled server-side during signup)
export async function validateReferralCode(referralCode: string): Promise<boolean> {
  console.warn('validateReferralCode is now handled server-side during signup for security.');
  // For backward compatibility, return true - real validation happens in Firebase Function
  return true;
}