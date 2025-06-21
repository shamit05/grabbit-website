# Grabbit Waitlist Setup Guide

## Firebase Functions Setup for Email Sending

Since you're using static hosting with GitHub Pages, we'll use Firebase Functions to send emails.

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase (if not already done)
```bash
firebase init
```
Select:
- Functions
- Hosting 
- Firestore

### 4. Install Functions Dependencies
```bash
cd functions
npm install
```

### 5. Configure Email Settings

You have two options for email sending:

#### Option A: Using Zoho SMTP (Recommended)
Set up your Zoho email credentials:
```bash
firebase functions:config:set email.user="your-email@yourdomain.com"
firebase functions:config:set email.password="your-app-password"
```

To get a Zoho app password:
1. Go to Zoho Mail Settings
2. Security > App Passwords
3. Generate a new app password
4. Use that password (not your regular password)

#### Option B: Using Gmail SMTP
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate app password for "Mail"
3. Update the functions/src/index.ts to use Gmail service:
   ```typescript
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: functions.config().email.user,
       pass: functions.config().email.password,
     },
   });
   ```
4. Set the config:
   ```bash
   firebase functions:config:set email.user="your-gmail@gmail.com"
   firebase functions:config:set email.password="your-app-password"
   ```

### 6. Deploy Functions
```bash
firebase deploy --only functions
```

### 7. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### 8. Build and Deploy Static Site
```bash
npm run build
firebase deploy --only hosting
```

## Alternative: Free Email Services

If you prefer not to use SMTP, here are some free alternatives:

### EmailJS (Completely Frontend)
1. Sign up at emailjs.com (free tier: 200 emails/month)
2. Create email template
3. Use their JavaScript SDK directly in the frontend
4. No Firebase Functions needed

### Resend API (Free tier: 3,000 emails/month)
1. Sign up at resend.com
2. Get API key
3. Update Firebase Function to use Resend instead of SMTP

### SendGrid (Free tier: 100 emails/day)
1. Sign up at sendgrid.com
2. Get API key
3. Update Firebase Function to use SendGrid

## Testing

### Local Testing
```bash
# Start Firebase emulators
firebase emulators:start

# Test functions locally
firebase functions:shell
```

### Production Testing
After deployment, test the email flow:
1. Go to your site
2. Sign up with a real email
3. Check if verification email arrives
4. Click verification link
5. Verify points are awarded

## Troubleshooting

### "Missing or insufficient permissions" error
- Make sure Firestore rules are deployed: `firebase deploy --only firestore:rules`
- Check that the user data structure matches the security rules

### Email not sending
- Verify email configuration: `firebase functions:config:get`
- Check function logs: `firebase functions:log`
- Make sure SMTP credentials are correct

### Function timeout
- Increase timeout in Firebase console if needed
- Check function execution logs for errors

## Production Checklist

- [ ] Firebase Functions deployed
- [ ] Email service configured (Zoho/Gmail SMTP)
- [ ] Firestore rules updated
- [ ] Static site built and deployed
- [ ] Email verification flow tested
- [ ] Referral system tested
- [ ] Points allocation working
