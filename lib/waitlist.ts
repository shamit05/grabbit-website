// Waitlist functionality with Firebase
import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  increment, 
  where,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';

export interface WaitlistUser {
  id: string;
  email: string;
  referralCode: string;
  referredBy?: string | null;
  points: number;
  joinedAt: any; // Firestore timestamp
  magicToken: string;
  emailVerified: boolean;
  referralUsed: boolean; // Flag to prevent multiple referral point awards
}

// Generate unique referral code
export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Generate magic token for email links
export function generateMagicToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Generate magic link for user dashboard access
export function generateMagicLink(magicToken: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/waitlist-dashboard?token=${magicToken}`;
  }
  return `/waitlist-dashboard?token=${magicToken}`;
}

// Validate referral code exists
export async function validateReferralCode(referralCode: string): Promise<boolean> {
  try {
    const usersRef = collection(db, 'waitlist');
    const referrerQuery = query(usersRef, where('referralCode', '==', referralCode.trim().toUpperCase()));
    const referrerDocs = await getDocs(referrerQuery);
    return !referrerDocs.empty;
  } catch (error) {
    return false;
  }
}

// Add user to waitlist and send magic link email
export async function addToWaitlist(email: string, referralCode?: string): Promise<{ success: boolean }> {
  const usersRef = collection(db, 'waitlist');
  
  // Check if email already exists
  const existingUserQuery = query(usersRef, where('email', '==', email));
  const existingUsers = await getDocs(existingUserQuery);
  
  if (!existingUsers.empty) {
    const existingUser = existingUsers.docs[0].data() as WaitlistUser;
    
    if (existingUser.emailVerified) {
      throw new Error('Email already registered and verified. Please check your dashboard or use a different email.');
    } else {
      // Email exists but not verified - resend verification email
      await sendMagicLinkEmail(email, existingUser.magicToken);
      throw new Error('Email already signed up but not verified. We\'ve sent another verification email - please check your inbox and click the link to complete registration.');
    }
  }

  // If referral code provided, validate it exists
  if (referralCode && referralCode.trim()) {
    const isValidReferral = await validateReferralCode(referralCode);
    if (!isValidReferral) {
      throw new Error('Invalid referral code. Please check the code and try again.');
    }
  }

  const userReferralCode = generateReferralCode();
  const magicToken = generateMagicToken();
  
  const userId = doc(usersRef).id;
  const userData = {
    id: userId,
    email,
    referralCode: userReferralCode,
    referredBy: referralCode?.trim().toUpperCase() || null,
    points: 0, // No points until email is verified via magic link
    joinedAt: serverTimestamp(),
    magicToken,
    emailVerified: false,
    referralUsed: false // Flag to prevent multiple referral updates
  };

  // Add new user (unverified)
  await setDoc(doc(usersRef, userId), userData);
  
  // Send magic link email via Firebase extension
  await sendMagicLinkEmail(email, magicToken);
  
  return { success: true };
}

// Verify email and activate user on dashboard load
export async function verifyEmailAndActivateUser(magicToken: string): Promise<WaitlistUser | null> {
  try {
    const usersRef = collection(db, 'waitlist');
    const userQuery = query(usersRef, where('magicToken', '==', magicToken));
    const userDocs = await getDocs(userQuery);
    
    if (userDocs.empty) {
      throw new Error('Invalid access token');
    }

    const userDoc = userDocs.docs[0];
    const userData = userDoc.data() as WaitlistUser;

    // If already verified, just return the user data
    if (userData.emailVerified) {
      return userData;
    }

    // Verify email and give points (this can only happen once due to security rules)
    const batch = writeBatch(db);
    
    let pointsToAdd = 1; // Base point for joining
    
    // Update user as verified and give initial point
    const userUpdate: any = {
      emailVerified: true,
      points: pointsToAdd
    };

    // If user was referred and hasn't used referral yet, give extra point and update referrer
    if (userData.referredBy && !userData.referralUsed) {
      pointsToAdd = 2; // 1 for joining + 1 for being referred
      userUpdate.points = pointsToAdd;
      userUpdate.referralUsed = true;
      
      // Find and update referrer
      const referrerQuery = query(usersRef, where('referralCode', '==', userData.referredBy));
      const referrerDocs = await getDocs(referrerQuery);
      
      if (!referrerDocs.empty) {
        const referrerDoc = referrerDocs.docs[0];
        // Give referrer a point
        batch.update(referrerDoc.ref, {
          points: increment(1)
        });
      }
    }

    batch.update(userDoc.ref, userUpdate);
    await batch.commit();
    
    // Return updated user data
    return { ...userData, ...userUpdate };
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
}

// Get user by magic token
export async function getUserByMagicToken(token: string): Promise<WaitlistUser | null> {
  try {
    const usersRef = collection(db, 'waitlist');
    const userQuery = query(usersRef, where('magicToken', '==', token));
    const userDocs = await getDocs(userQuery);
    
    if (userDocs.empty) {
      return null;
    }
    
    return userDocs.docs[0].data() as WaitlistUser;
  } catch (error) {
    return null;
  }
}

// Get total waitlist count
export async function getWaitlistCount(): Promise<number> {
  try {
    const usersRef = collection(db, 'waitlist');
    const snapshot = await getDocs(usersRef);
    return snapshot.size;
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    return 0; // Return 0 on error
  }
}

// This function is no longer needed - we use magic links instead
// Keeping for backwards compatibility if needed
export async function sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
  // This function is deprecated - use addToWaitlist which sends magic links
}

// Send magic link email using Firebase Trigger Email extension
export async function sendMagicLinkEmail(email: string, magicToken: string): Promise<void> {
  console.log('🚀 sendMagicLinkEmail called with:', { email, magicToken });
  
  try {
    const magicLink = generateMagicLink(magicToken);
    console.log('🔗 Generated magic link:', magicLink);
    
    // Add email document to trigger the Firebase extension
    const mailRef = collection(db, 'mail');
    console.log('📧 Mail collection reference created');
    
    const emailDoc = {
        to: [email],
        message: {
        subject: '🎰 Access Your Grabbit Waitlist Dashboard',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                margin: 0; 
                padding: 0; 
                background: linear-gradient(135deg, #ff6b35, #ff8c42);
                color: #333;
                }
                .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 16px; 
                overflow: hidden; 
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                .header { 
                background: linear-gradient(135deg, #ff6b35, #ff8c42); 
                padding: 40px 30px; 
                text-align: center; 
                color: white; 
                }
                .header h1 { 
                margin: 0; 
                font-size: 28px; 
                font-weight: bold; 
                }
                .header p { 
                margin: 10px 0 0 0; 
                font-size: 16px; 
                opacity: 0.9; 
                }
                .content { 
                padding: 40px 30px; 
                text-align: center; 
                }
                .content h2 { 
                color: #ff6b35; 
                margin: 0 0 20px 0; 
                font-size: 24px; 
                }
                .content p { 
                font-size: 16px; 
                line-height: 1.6; 
                margin: 0 0 20px 0; 
                color: #666; 
                }
                .button { 
                display: inline-block; 
                background: linear-gradient(135deg, #ff6b35, #ff8c42); 
                color: white !important; 
                padding: 16px 32px; 
                text-decoration: none; 
                border-radius: 50px; 
                font-weight: bold; 
                font-size: 16px; 
                margin: 20px 0;
                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                }
                .features { 
                background: #f8f9fa; 
                padding: 30px; 
                border-radius: 12px; 
                margin: 20px 0; 
                }
                .features h3 { 
                color: #ff6b35; 
                margin: 0 0 15px 0; 
                }
                .features ul { 
                list-style: none; 
                padding: 0; 
                margin: 0; 
                }
                .features li { 
                padding: 8px 0; 
                border-bottom: 1px solid #eee; 
                }
                .features li:last-child { 
                border-bottom: none; 
                }
                .footer { 
                background: #f8f9fa; 
                padding: 30px; 
                text-align: center; 
                font-size: 14px; 
                color: #666; 
                }
                .link-text { 
                word-break: break-all; 
                font-size: 12px; 
                color: #999; 
                margin-top: 20px; 
                }
            </style>
            </head>
            <body>
            <div class="container">
                <div class="header">
                <h1>Welcome to Grabbit!</h1>
                <p>Your waitlist registration is almost complete</p>
                </div>
                
                <div class="content">
                <h2>Click to Access Your Dashboard</h2>
                <p>Hi there!</p>
                <p>Thanks for joining the Grabbit waitlist! Click the button below to access your dashboard and complete your registration:</p>
                
                <a href="${magicLink}" class="button">
                    Access My Dashboard & Get Tickets
                </a>
                
                <div class="features">
                    <h3>What happens when you click?</h3>
                    <ul>
                    <li>You'll get 1 raffle ticket for joining</li>
                    <li>Extra tickets for any referrals</li>
                    <li>View your referral code to share with friends</li>
                    <li>See your position on the waitlist</li>
                    <li>Track your chances to win $10 credit</li>
                    </ul>
                </div>
                
                <p><strong>Remember:</strong> 5 lucky winners will receive $10 Grabbit credit when we launch! 🚀</p>
                
                <div class="link-text">
                    If the button doesn't work, copy and paste this link:<br>
                    ${magicLink}
                </div>
                </div>
                
                <div class="footer">
                <p>This email was sent to ${email} because you signed up for the Grabbit waitlist.</p>
                <p><strong>Grabbit</strong> - Community-powered delivery, coming soon!</p>
                </div>
            </div>
            </body>
            </html>
        `,
        text: `
            Welcome to Grabbit!
            
            Thanks for joining the waitlist! Click the link below to access your dashboard and complete your registration:
            
            ${magicLink}
            
            What happens when you click?
            - You'll get 1 raffle ticket for joining
            - Extra tickets for any referrals  
            - View your referral code to share with friends
            - See your position on the waitlist
            - Track your chances to win $10 credit
            
            Remember: 5 lucky winners will receive $10 Grabbit credit when we launch!
            
            If the link doesn't work, copy and paste it into your browser.
            
            Thanks,
            The Grabbit Team
        `
        }
    };
        
    console.log('📝 Email document structure:', JSON.stringify(emailDoc, null, 2));
    
    // Create document with generated ID
    const docRef = doc(mailRef);
    console.log('📄 Document reference created with ID:', docRef.id);
    
    await setDoc(docRef, emailDoc);
    console.log('✅ Email document successfully added to Firestore');
    
    // Check if document was actually created
    setTimeout(async () => {
      try {
        console.log('🔍 Checking if email document exists in Firestore...');
        const allDocs = await getDocs(mailRef);
        console.log(`📊 Total documents in mail collection: ${allDocs.size}`);
        
        allDocs.forEach((doc) => {
          console.log(`📄 Document ${doc.id}:`, doc.data());
        });
      } catch (checkError) {
        console.error('❌ Error checking mail documents:', checkError);
      }
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error sending magic link email:', error);
    // Don't throw error to avoid breaking the signup flow
  }
}