# 🔐 Secret Code Verification - Quick Reference

## 🚀 Quick Setup

### 1. Get User ID from Appwrite

1. Open [Appwrite Console](https://cloud.appwrite.io)
2. Go to **Authentication → Users**
3. Click on the admin user
4. Copy the **User ID** (at the top)

### 2. Set Secret Code

```bash
bun run set-secret <userId> <5-digit-code>
```

**Example:**
```bash
bun run set-secret 507f1f77bcf86cd799439011 12345
```

### 3. Done! ✅

The user can now login with:
- Email + Password
- Secret Code (12345)

---

## 📱 Login Flow

```
1. Enter email & password → Click "Continue"
   ↓
2. Enter 5-digit secret code
   ↓
3. Click "Verify & Sign In"
   ↓
4. Access granted! 🎉
```

---

## 🔧 Common Commands

### Set Secret Code
```bash
bun run set-secret <userId> <code>
```

### Reset Secret Code
```bash
bun run set-secret <userId> <newCode>
```

### Multiple Users
```bash
bun run set-secret user1-id 12345
bun run set-secret user2-id 54321
bun run set-secret user3-id 98765
```

---

## ✅ Requirements

- **5 digits exactly** (e.g., 12345)
- **Numbers only** (0-9)
- **Can start with 0** (e.g., 00123)

---

## 🛡️ Security

✅ Password + Secret Code (2FA)  
✅ Stored in Appwrite user preferences  
✅ Session-based verification  
✅ All admin routes protected  

---

## ❓ Troubleshooting

**"Invalid secret code"**
→ Check code is exactly 5 digits
→ Reset using script

**"No secret code set"**
→ Run: `bun run set-secret <userId> <code>`

**Can't access admin**
→ Clear browser cache
→ Login again with both password + secret code

---

## 📚 Full Documentation

See [SECRET_CODE_SETUP.md](./SECRET_CODE_SETUP.md) for complete guide.

---

**Need Help?** Contact Sanbid
