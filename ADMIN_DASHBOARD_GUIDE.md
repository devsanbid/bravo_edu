# Admin Chat Dashboard - Quick Guide

## 🎯 Overview

The admin chat dashboard allows your team to respond to student inquiries in real-time. Built with Appwrite backend and Next.js frontend.

## 🚀 Access

Visit: **`http://localhost:3000/admin/chat`** (or your deployed URL + `/admin/chat`)

## 📋 Features

### 1. Session Management
- **Active Sessions List**: Left panel shows all ongoing conversations
- **Visitor Details**: Name, email, phone displayed for each session
- **Real-Time Updates**: Sessions auto-refresh when new messages arrive
- **Sorted by Activity**: Most recent conversations appear at the top

### 2. Messaging
- **Real-Time Chat**: Messages appear instantly without page refresh
- **Message History**: Full conversation history for selected session
- **Admin Name**: Customize your display name (top right)
- **Timestamps**: All messages show time sent

### 3. Notifications
- **Desktop Alerts**: Get notified when visitors send messages
- **Background Mode**: Notifications work even when dashboard is minimized
- **Auto-Permission**: Browser will ask for notification permission on first load

### 4. Typing Indicators
- **Visitor Typing**: See animated dots when visitor is typing
- **Admin Typing**: Visitor sees when you're typing a response
- **Auto-Hide**: Indicators disappear after 3 seconds of inactivity

### 5. Session Controls
- **Close Session**: Click X button to archive completed chats
- **Refresh**: Manual refresh button to reload all sessions
- **Session Selection**: Click any session to view full conversation

## 💡 How to Use

### Step 1: Open Dashboard
1. Navigate to `/admin/chat`
2. Allow browser notifications when prompted

### Step 2: View Active Chats
- All active sessions appear in the left panel
- Green dot indicates online visitor
- Click any session to open the conversation

### Step 3: Respond to Messages
1. Select a chat from the list
2. Type your message in the input field
3. Press Enter or click Send button
4. Message is delivered instantly to visitor

### Step 4: Manage Sessions
- View visitor contact details in chat header
- Close completed conversations using X button
- Closed sessions are removed from active list

## 🎨 Interface Layout

```
┌─────────────────────────────────────────────┐
│  Admin Chat Dashboard        [Admin Name] [Refresh] │
├─────────────┬───────────────────────────────┤
│ Active      │ Selected Conversation         │
│ Chats (3)   │                               │
│             │ Visitor Name                  │
│ • Visitor 1 │ email@example.com | +977...   │
│ • Visitor 2 │                               │
│ • Visitor 3 │ [Message History]             │
│             │                               │
│             │ • Visitor: Hello...           │
│             │ • You: Hi, how can I help?    │
│             │ • Visitor is typing...        │
│             │                               │
│             │ [Type message...]      [Send] │
└─────────────┴───────────────────────────────┘
```

## 🔔 Notification System

When a new message arrives:
1. **Dashboard Open**: Message appears instantly in chat
2. **Dashboard Minimized**: Desktop notification pops up
3. **Notification Click**: Returns focus to dashboard

## ⌨️ Keyboard Shortcuts

- **Enter**: Send message
- **ESC**: (Future) Close current chat
- **Ctrl+R**: Refresh sessions manually

## 🛠️ Troubleshooting

### No Sessions Appearing
- Check that database and collections are created in Appwrite Console
- Verify collection IDs match: `chat_sessions`, `chat_messages`
- Check browser console for connection errors

### Messages Not Sending
- Ensure collection permissions allow `Create` and `Update`
- Check admin name is set (top right input)
- Verify session is selected

### Notifications Not Working
- Allow notifications in browser settings
- Check that browser supports Notification API
- Ensure page is served over HTTPS (or localhost)

### Real-Time Not Working
- Verify real-time is enabled in Appwrite collections
- Check WebSocket connection in browser DevTools
- Refresh the page to re-establish connection

## 🔐 Security Notes

**Current Implementation:**
- No authentication required (development mode)
- All sessions visible to anyone accessing `/admin/chat`

**Production Recommendations:**
1. Add authentication middleware
2. Implement role-based access control
3. Use Appwrite Teams for admin access
4. Add rate limiting
5. Secure admin routes with Next.js middleware

## 📊 Database Structure

### Chat Sessions Collection
- `visitorId`: Unique visitor identifier
- `visitorName`: Visitor's name
- `visitorEmail`: Contact email
- `visitorPhone`: Phone number
- `status`: active | closed
- `lastMessageAt`: Last activity timestamp
- `createdAt`: Session creation time

### Chat Messages Collection
- `sessionId`: Reference to chat session
- `message`: Message content
- `senderName`: Who sent the message
- `senderEmail`: Sender's email
- `senderPhone`: Sender's phone
- `isFromAdmin`: true if admin sent
- `timestamp`: When message was sent

## 🎯 Next Steps

1. **Add Authentication**: Protect admin routes
2. **Team Assignment**: Assign chats to specific team members
3. **Canned Responses**: Create quick reply templates
4. **Chat Analytics**: Track response times and volumes
5. **Export Feature**: Download chat transcripts
6. **Search**: Find specific conversations
7. **Tags/Labels**: Categorize conversations
8. **Priority Marking**: Flag urgent inquiries

## 📞 Support

For questions or issues:
- Check `APPWRITE_CHAT_SETUP.md` for database setup
- Review browser console for error messages
- Verify Appwrite project ID and endpoint in `/lib/appwrite.ts`
