# Appwrite Real-Time Chat Setup Guide

## ✅ Completed Steps

1. ✅ Installed Appwrite SDK (`bun add appwrite`)
2. ✅ Created Appwrite client configuration (`/lib/appwrite.ts`)
3. ✅ Created chat service (`/lib/chatService.ts`)
4. ✅ Created custom React hook (`/hooks/useChat.ts`)
5. ✅ Updated ChatWidget component with real-time functionality

## 🔧 Required: Appwrite Console Setup

You need to create the database and collections in your Appwrite Console:

### Step 1: Create Database

1. Go to your Appwrite Console: https://cloud.appwrite.io/console/project-6949246e002f720eb299
2. Navigate to **Databases** → Click **Create Database**
3. Database ID: `bravo_chat_db`
4. Database Name: `Bravo Chat Database`

### Step 2: Create Collections

#### Collection 1: Chat Sessions

- **Collection ID**: `chat_sessions`
- **Collection Name**: Chat Sessions
- **Permissions**: 
  - Read: `any`
  - Create: `any`
  - Update: `any`

**Attributes:**
| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| visitorId | string | 255 | Yes | No | - |
| visitorName | string | 255 | No | No | - |
| visitorEmail | email | 320 | No | No | - |
| visitorPhone | string | 50 | No | No | - |
| status | string | 50 | Yes | No | active |
| lastMessageAt | datetime | - | Yes | No | - |
| createdAt | datetime | - | Yes | No | - |

**Indexes:**
- Key: `visitor_id_idx`, Type: `key`, Attributes: `visitorId`
- Key: `status_idx`, Type: `key`, Attributes: `status`

#### Collection 2: Chat Messages

- **Collection ID**: `chat_messages`
- **Collection Name**: Chat Messages
- **Permissions**:
  - Read: `any`
  - Create: `any`

**Attributes:**
| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| sessionId | string | 255 | Yes | No | - |
| message | string | 5000 | Yes | No | - |
| senderName | string | 255 | Yes | No | - |
| senderEmail | email | 320 | No | No | - |
| senderPhone | string | 50 | No | No | - |
| isFromAdmin | boolean | - | Yes | No | false |
| timestamp | datetime | - | Yes | No | - |

**Indexes:**
- Key: `session_id_idx`, Type: `key`, Attributes: `sessionId`
- Key: `timestamp_idx`, Type: `key`, Attributes: `timestamp`

### Step 3: Enable Real-time

1. Go to each collection → **Settings** → **Update Permissions**
2. Ensure **Real-time** is enabled (should be by default)

## 📱 How It Works

### For Visitors:
1. Opens chat widget → Unique visitor ID is generated and stored in localStorage
2. Chat session is created automatically in Appwrite
3. Visitor shares name/email to start chatting
4. Messages are sent in real-time to the team
5. Real-time subscription shows admin responses instantly

### For Admin Team:
- You can build an admin dashboard to:
  - View all active chat sessions
  - Respond to visitor messages in real-time
  - View visitor details (name, email, phone)
  - Close/archive conversations

## 🚀 Testing

1. Complete the Appwrite Console setup above
2. Refresh your website
3. Open browser console - you should see: "✅ Appwrite connection established successfully!"
4. Click the chat widget
5. Enter your details and start chatting
6. Messages will be saved to Appwrite in real-time!

## 🔐 Security Notes

Current setup uses `any` permissions for quick testing. For production:
- Restrict create/update permissions using Appwrite Auth
- Add API key authentication for admin actions
- Implement rate limiting
- Add message validation

## 📊 Features Implemented

### ✅ Completed Features

1. **✅ Admin Dashboard** (`/admin/chat`)
   - View all active chat sessions
   - Real-time message updates
   - Session list sorted by recent activity
   - Visitor details display (name, email, phone)
   - Close/archive conversations
   - Custom admin name setting

2. **✅ Browser Notifications**
   - Desktop notifications for new visitor messages
   - Automatic permission request
   - Works even when dashboard is in background

3. **✅ Typing Indicators**
   - Real-time typing status for both visitor and admin
   - Auto-hide after 3 seconds of inactivity
   - Animated typing dots indicator

4. **✅ Real-Time Chat**
   - Instant message delivery
   - Auto-scroll to latest messages
   - Message timestamps
   - Differentiated admin/visitor messages
   - Session management

### Access the Admin Dashboard

**Important:** Admin dashboard is now protected with authentication.

**First-time setup:**
1. Create an admin user in Appwrite Console (see `ADMIN_AUTH_SETUP.md`)
2. Go to: `http://localhost:3000/admin/login`
3. Login with your credentials
4. Access the chat dashboard

**Features:**
- 🔐 Secure login with email/password
- Left panel: All active chat sessions with visitor details
- Right panel: Selected conversation with full history
- Real-time updates: No refresh needed
- Notifications: Get alerted for new messages
- Typing indicators: See when visitor is typing
- Custom admin name: Personalize your responses
- Logout: Red logout button in top-right corner

**Authentication:**
- Session persists across browser refreshes
- Auto-redirect to login if not authenticated
- Secure logout functionality
- See `ADMIN_AUTH_SETUP.md` for detailed auth setup

### 🎯 Future Enhancements

1. Add file upload support for sharing documents
2. Add emoji picker for expressive messaging
3. Add read receipts to track message viewing
4. Add chat analytics dashboard
5. Add authentication/login for admin panel
6. Add canned responses/quick replies
7. Add chat assignment to team members
8. Add chat history export

## 🐛 Troubleshooting

- **"Failed to initialize chat"**: Check Database ID and Collection IDs match exactly
- **Messages not appearing**: Verify permissions are set to `any` for testing
- **Real-time not working**: Ensure real-time is enabled in collection settings
