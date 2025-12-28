# Secret Code Verification Setup

## Overview

The admin panel now uses a **5-digit secret code** for two-factor authentication. Each admin user has their own secret code stored in their Appwrite account.

## How It Works

1. User enters email and password
2. System validates credentials
3. User is asked: **"What is your secret code?"**
4. User enters their 5-digit secret code
5. System verifies against stored code
6. Access granted ✅

## Setting Up Secret Codes

### Method 1: Using the Script (Recommended)

```bash
node scripts/set-secret-code.js <userId> <secretCode>
```

**Example:**
```bash
node scripts/set-secret-code.js 507f1f77bcf86cd799439011 12345
```

**Getting the User ID:**
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Navigate to **Authentication → Users**
3. Click on the user
4. Copy the **User ID** (at the top of the page)

### Method 2: Manual Setup in Appwrite Console

1. Go to Appwrite Console
2. Navigate to **Authentication → Users**
3. Click on the admin user
4. Scroll to **Preferences** section
5. Click **Add Preference**
6. Set:
   - **Key:** `secretCode`
   - **Value:** `12345` (your 5-digit code)
7. Click **Create**

## Secret Code Requirements

- ✅ Must be exactly **5 digits**
- ✅ Numbers only (0-9)
- ✅ Can start with 0 (e.g., 00123)
- ❌ No letters or special characters

**Valid Examples:**
- `12345`
- `98765`
- `00000`
- `54321`

## Login Flow

### Step 1: Email & Password
```
Email: admin@bravointernational.com
Password: ••••••••
```
Click **Continue** →

### Step 2: Secret Code Verification
```
What is your secret code?
[ 1 2 3 4 5 ]
```
Click **Verify & Sign In** →

### Step 3: Access Granted
Redirected to `/admin/chat` dashboard

## Security Features

✅ **Two-Factor Authentication** - Password + Secret Code  
✅ **Session Storage** - Verified status stored in session  
✅ **Auto-Redirect** - Unverified users sent to login  
✅ **Protected Routes** - All `/admin/*` pages require verification  
✅ **Secure Storage** - Secret codes stored in Appwrite user preferences  

## For Admin Users

### First Time Setup

1. **Get your secret code** from the system administrator
2. **Login** with your email and password
3. **Enter your secret code** when prompted
4. **Remember it** - you'll need it every time you login

### Logging In

1. Go to `/admin/login`
2. Enter email and password
3. Enter your 5-digit secret code
4. Access granted!

### Changing Your Secret Code

Contact the system administrator to change your secret code. They will need to:
1. Get your User ID from Appwrite Console
2. Run the set-secret-code script with your new code

## For System Administrators

### Setting Up a New Admin User

1. **Create the user in Appwrite:**
   - Go to Authentication → Users
   - Create new user with email and password

2. **Set their secret code:**
   ```bash
   node scripts/set-secret-code.js <userId> <secretCode>
   ```

3. **Give them their credentials:**
   - Email address
   - Password
   - Secret code

### Resetting a Secret Code

If a user forgets their secret code:

```bash
node scripts/set-secret-code.js <userId> <newSecretCode>
```

### Viewing User's Secret Code

1. Appwrite Console → Authentication → Users
2. Click on the user
3. Scroll to Preferences
4. Look for `secretCode` key

## Troubleshooting

### "Invalid secret code" error

**Check:**
- Code is exactly 5 digits
- No spaces or special characters
- Correct user is logged in
- Secret code is set in Appwrite

**Solution:**
```bash
node scripts/set-secret-code.js <userId> <newCode>
```

### "No secret code set for this user"

**Cause:** User doesn't have `secretCode` in their preferences

**Solution:** Set the secret code using the script or Appwrite Console

### Can't access admin pages

**Check:**
1. Completed both login steps (password + secret code)
2. Session storage is enabled in browser
3. No browser errors in console

**Solution:** Clear browser cache and login again

### Script errors

**"Missing required arguments":**
```bash
# Correct format:
node scripts/set-secret-code.js <userId> <5-digit-code>
```

**"User not found":**
- Check the User ID is correct
- User exists in Appwrite Console

**"Authentication failed":**
- Ensure `APPWRITE_API_KEY` is set in `.env.local`

## Security Best Practices

1. ✅ **Use unique codes** - Each user should have a different code
2. ✅ **Keep codes private** - Don't share or write down codes
3. ✅ **Change periodically** - Update codes every few months
4. ✅ **Strong passwords** - Still use strong passwords + secret code
5. ✅ **Secure transmission** - Send codes securely to users
6. ❌ **Don't reuse** - Don't use same code as password

## Examples

### Setting Secret Code for Multiple Users

```bash
# User 1: Sanbid
node scripts/set-secret-code.js 507f1f77bcf86cd799439011 12345

# User 2: Admin
node scripts/set-secret-code.js 507f1f77bcf86cd799439012 54321

# User 3: Manager  
node scripts/set-secret-code.js 507f1f77bcf86cd799439013 98765
```

### Batch Setup Script

Create `setup-all-codes.sh`:
```bash
#!/bin/bash
node scripts/set-secret-code.js 507f1f77bcf86cd799439011 12345
node scripts/set-secret-code.js 507f1f77bcf86cd799439012 54321
node scripts/set-secret-code.js 507f1f77bcf86cd799439013 98765
```

Run: `bash setup-all-codes.sh`

## API Reference

### User Preferences Structure

```json
{
  "secretCode": "12345"
}
```

### AuthContext Methods

```typescript
// Login (step 1)
const result = await login(email, password);
// Returns: { requiresVerification: true, userId: string }

// Verify (step 2)
const isValid = await verifySecretCode(secretCode);
// Returns: boolean

// Check status
isAuthenticated // true if session exists
isVerified      // true if secret code verified
```

## FAQ

**Q: What if a user forgets their secret code?**  
A: Admin must reset it using the script or Appwrite Console.

**Q: Can users change their own secret code?**  
A: No, only admins with Appwrite access can change codes.

**Q: Is the secret code encrypted?**  
A: Yes, it's stored in Appwrite user preferences (secure).

**Q: Can I use more than 5 digits?**  
A: The system is configured for exactly 5 digits. To change, modify the validation in the code.

**Q: What happens if someone guesses the code?**  
A: They still need the correct email and password first. Use strong, unique codes.

## Migration from Email 2FA

If you previously had email-based 2FA:

1. **Files to remove:**
   - `lib/verificationService.ts`
   - `app/api/send-verification/route.ts`
   - `scripts/create-2fa-collection.js`

2. **No database collection needed** - Secret codes stored in user preferences

3. **No SMTP setup required** - No emails sent

4. **Set secret codes** for all existing admin users

---

**Last Updated:** December 28, 2025  
**Version:** 2.0.0 (Secret Code Verification)
