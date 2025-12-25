This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Environment Setup

First, set up your environment variables:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your Appwrite credentials. See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions.

### 2. Install Dependencies

```bash
bun install
```

### 3. Run Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

### Core Features
- 🎨 Modern UI with Tailwind CSS 4 & Framer Motion
- 💬 Real-time Chat System (Appwrite)
- 🔐 Admin Authentication & Dashboard
- 🖼️ Gallery Management with Upload
- 📱 Social Media Integration
- 📱 Fully Responsive Design

### Student Tools
- 📅 **Academic Calendar** - Beautiful calendar with events, holidays, exams, and deadlines (Saturdays auto-marked as holidays)
- 🏫 University Search & Comparison
- 💰 Cost Calculator / Budget Planner
- 🎓 Scholarship Finder
- 🧭 Course Finder Quiz
- ⏰ Deadline Tracker
- 💬 Student Community Forum

### Admin Features
- 📊 Admin Dashboard with Analytics
- 📅 **Calendar Management** - Add/edit events, holidays, exams, workshops, seminars
- 🏛️ University Management (CRUD with logo upload)
- 🎓 Scholarship Management
- 📝 Content Management (Gallery, Jobs, Announcements, Social Media)
- 🔒 Secure Authentication

### Integrations
- 📱 WhatsApp Widget for instant contact
- 🔍 SEO Optimization
- 🌍 Multi-country Support

## Environment Variables

All sensitive configuration is stored in environment variables. See [ENV_SETUP.md](ENV_SETUP.md) for complete setup instructions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
