# Grabbit Waitlist System

This is a comprehensive waitlist system built with Next.js, Firebase, and TypeScript. The system includes referral tracking, points system, leaderboard, and magic link authentication.

## Features

- **Email-based Waitlist Signup**: Users can join the waitlist with their email
- **Referral System**: Users get unique referral codes to share with friends
- **Points System**: 
  - 1 point for signing up with a referral code
  - 1 point for each friend who signs up with your referral code
- **Leaderboard**: Top 5 users displayed with prizes ($10 Grabbit credit)
- **Magic Link Dashboard**: Users get email with magic link to track their progress
- **Real-time Updates**: Leaderboard and waitlist count update in real-time

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing "grabbit-website"
3. Enable Firestore Database
4. Deploy the security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### 2. Firestore Security Rules

The security rules in `firestore.rules` ensure:
- Anyone can read waitlist data (for leaderboard)
- Only valid new entries can be created
- Points can only be incremented by 1 (for referrals)
- No deletions allowed
- Email uniqueness enforced

### 3. Email Service Setup (Optional)

To enable email notifications:

1. Choose an email service provider (SendGrid, Mailgun, etc.)
2. Update `/app/api/send-email/route.ts` with your provider's API
3. Add your API keys to environment variables

Example with SendGrid:
```bash
npm install @sendgrid/mail
```

Then uncomment and configure the SendGrid code in the API route.

### 4. Environment Variables

Create a `.env.local` file:
```
SENDGRID_API_KEY=your_sendgrid_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # or your production URL
```

## Database Structure

### Waitlist Collection (`/waitlist/{userId}`)

```typescript
{
  id: string              // Document ID
  email: string          // User's email (unique)
  referralCode: string   // User's unique referral code
  referredBy?: string    // Referral code of who referred them
  points: number         // Total points earned
  joinedAt: Timestamp    // When they joined
  magicToken: string     // Token for magic link access
}
```

## API Endpoints

- `POST /api/send-email` - Sends magic link emails (needs email service setup)

## Pages

- `/` - Home page with waitlist signup
- `/waitlist-dashboard?token=xxx` - User dashboard via magic link

## Components

- `WaitlistForm` - Main signup form with referral handling
- `WaitlistDashboard` - User dashboard for tracking progress

## Optimization Notes

The system is designed to minimize Firebase reads/writes:
- Single batch write for new signups + referral point updates
- Leaderboard limited to top 5 entries
- Efficient queries with proper indexing
- Client-side caching where possible

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to your hosting platform (Vercel, Netlify, etc.)

3. Update Firebase rules if needed

4. Configure email service for production

## Security Considerations

- Firestore rules prevent data manipulation
- Magic tokens provide secure dashboard access
- No authentication required for basic functionality
- Rate limiting should be added for production
- Email validation happens client and server-side

## Future Enhancements

- Admin dashboard for managing waitlist
- Email templates and sequences
- Social media integration
- Advanced analytics
- A/B testing for signup forms
- SMS notifications option
