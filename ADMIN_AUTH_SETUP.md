# Admin Authentication Setup Guide

## 🔐 Admin Login System

The admin chat dashboard is now protected with Appwrite authentication. Only authenticated users can access the chat system.

## 📋 Setup Steps

### Step 1: Create Admin User in Appwrite Console

1. Go to your Appwrite Console: https://cloud.appwrite.io/console/project-6949246e002f720eb299
2. Navigate to **Authentication** → **Users**
3. Click **Create User** button
4. Fill in the details:
   - **Email**: Your admin email (e.g., `admin@bravointernational.com`)
   - **Password**: Create a strong password
   - **Name**: Admin name (optional)
5. Click **Create**

### Step 2: Access Admin Dashboard

1. Go to: `http://localhost:3000/admin/login`
2. Enter the email and password you created in Step 1
3. Click **Sign In**
4. You'll be redirected to `/admin/chat` dashboard

## 🎯 Features

### Login Page (`/admin/login`)
- Email/password authentication
- Form validation
- Error handling
- Loading states
- Responsive design
- Branding with logo

### Protected Admin Dashboard
- Authentication required to access
- Auto-redirect to login if not authenticated
- Session management
- Logout functionality

### Security Features
- ✅ Session persistence (stays logged in)
- ✅ Automatic session verification
- ✅ Secure logout
- ✅ Protected routes
- ✅ Loading states during auth check

## 🔑 How It Works

```
┌─────────────────┐
│  Visit /admin/  │
│      chat       │
└────────┬────────┘
         │
         ▼
    ┌────────────┐
    │ Auth Check │
    └─────┬──────┘
          │
     ┌────┴────┐
     │         │
     ▼         ▼
┌─────────┐ ┌──────────────┐
│Logged In│ │ Not Logged In│
└────┬────┘ └──────┬───────┘
     │             │
     ▼             ▼
┌─────────┐  ┌──────────┐
│Dashboard│  │Redirect  │
│         │  │to /login │
└─────────┘  └──────────┘
```

## 👤 Managing Admin Users

### Create New Admin
1. Go to Appwrite Console → Authentication → Users
2. Click **Create User**
3. Add email and password
4. Share credentials with team member

### Delete Admin
1. Go to Appwrite Console → Authentication → Users
2. Find the user
3. Click **Delete**

### Reset Password
1. Admin must contact you
2. Go to Appwrite Console → Authentication → Users
3. Select user → Click **Update Password**
4. Set new password and share with admin

## 🚀 Usage

### For Admins

**First Time Login:**
1. Get your credentials from the system administrator
2. Visit `/admin/login`
3. Enter email and password
4. Access the chat dashboard

**Daily Use:**
1. If already logged in, go directly to `/admin/chat`
2. Session persists across browser refreshes
3. Click "Logout" button when done

**Logout:**
- Click the red "Logout" button in the top-right corner
- You'll be redirected to the login page

## 🔒 Production Security Recommendations

### Current Implementation (Development)
- Email/password authentication
- Session-based auth with Appwrite
- Protected routes

### For Production, Add:

1. **Two-Factor Authentication (2FA)**
   ```typescript
   // Enable in Appwrite Console → Authentication → Security
   ```

2. **Password Requirements**
   - Minimum 12 characters
   - Must include uppercase, lowercase, numbers, symbols
   - Configure in Appwrite Console

3. **Session Timeout**
   - Set session expiry in Appwrite Console
   - Recommended: 8-24 hours

4. **IP Whitelisting**
   - Restrict admin access to office IPs only
   - Configure in Appwrite Console → Security

5. **Rate Limiting**
   - Limit login attempts
   - Already built-in with Appwrite

6. **Audit Logs**
   - Track admin login/logout events
   - Monitor user activities

## 🐛 Troubleshooting

### Cannot Login
- **Error: "Invalid email or password"**
  - Check credentials are correct
  - Verify user exists in Appwrite Console
  - Ensure password matches

- **Error: "Failed to initialize chat"**
  - Database not set up yet
  - Follow `APPWRITE_CHAT_SETUP.md` to create collections

### Logged Out Unexpectedly
- Session expired (default: 1 year in Appwrite)
- Browser cookies cleared
- Manual logout from another tab

### Redirected to Login
- Not authenticated
- Session expired
- Protected route accessed without login

## 📊 Admin Credentials Example

**For Development:**
```
Email: admin@bravointernational.com
Password: BravoAdmin@2025!
```

**Create this user in Appwrite Console first!**

## 🔗 Related Files

- `/contexts/AuthContext.tsx` - Authentication context and hooks
- `/app/admin/login/page.tsx` - Login page UI
- `/components/ProtectedRoute.tsx` - Route protection wrapper
- `/app/admin/chat/page.tsx` - Protected admin dashboard
- `/lib/appwrite.ts` - Appwrite client configuration

## 📞 Support

If you encounter issues:
1. Check Appwrite Console for user creation
2. Verify project ID in `/lib/appwrite.ts`
3. Check browser console for errors
4. Ensure cookies are enabled in browser
