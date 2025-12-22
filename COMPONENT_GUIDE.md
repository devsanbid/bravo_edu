# 🎨 Component Showcase - Bravo International Website

This document provides a visual guide to all components in your website.

---

## 📐 Website Layout

```
┌─────────────────────────────────────────────────────┐
│                    HEADER (Sticky)                   │
│  Logo | Home About Destinations Services | [Free]   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                   HERO SECTION                       │
│                                                      │
│        THINK ABROAD, THINK BRAVO                    │
│                                                      │
│   [Start Your Journey] [Explore Destinations]       │
│                                                      │
│   500+ Visas    15+ Years    98% Success           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              DIRECTOR'S MESSAGE                      │
│  ┌──────────┬────────────────────────────┐         │
│  │  Photo   │  Quote & Message          │         │
│  │          │  "Striving for 100%..."    │         │
│  └──────────┴────────────────────────────┘         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              DESTINATION HUB                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │   UK    │  │   USA   │  │  Canada │           │
│  │   🇬🇧   │  │   🇺🇸   │  │   🇨🇦   │           │
│  └─────────┘  └─────────┘  └─────────┘           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│         WHAT SEPARATES US (USP)                     │
│  👥         🏆         🔍         📋              │
│  Expert    15 Years   Personal   Docs            │
│  Team      Exp        Research   Support         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│           PROCESS MAP                                │
│  1️⃣ ────→ 2️⃣ ────→ 3️⃣ ────→ 4️⃣                    │
│  Counsel  Test     Document  Visa                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│         TESTIMONIAL SLIDER                           │
│  ┌──────────────────────────────────┐              │
│  │  "Quote from Prajita..."         │  ◀ ● ▶      │
│  │  Niagara College, Toronto         │              │
│  └──────────────────────────────────┘              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│        CONSULTATION FORM                             │
│  ┌────────────┬──────────────────┐                 │
│  │ Why Choose │  📝 Form Fields  │                 │
│  │ Bravo?     │  Name, Email...  │                 │
│  └────────────┴──────────────────┘                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                    FOOTER                            │
│  About | Services | Contact | Social Media          │
│  📍 Map of Putalisadak, Kathmandu                   │
│  📧 Newsletter Signup                                │
└─────────────────────────────────────────────────────┘

                                    [💬] Chat Widget
                                    [📱] WhatsApp
```

---

## 🎯 Component Breakdown

### 1. Header Component
**File:** `components/Header.tsx`

**Features:**
- Sticky positioning (follows scroll)
- Transparent on top, solid when scrolled
- Desktop: Full navigation menu
- Mobile: Hamburger menu
- Phone number display
- "Free Consultation" CTA button (orange gradient)

**Colors:**
- Background: White (#FFFFFF)
- Text: Dark Gray (#1F2937)
- Hover: Purple (#5B21B6)
- CTA: Orange to Gold gradient

**Responsive:**
- Desktop: Horizontal nav
- Mobile: Slide-in menu

---

### 2. Hero Section
**File:** `components/Hero.tsx`

**Layout:**
- Left: Text content + CTAs
- Right: Image/illustration placeholder
- Full viewport height

**Elements:**
- Badge: "15+ Years of Excellence"
- Main heading: "THINK ABROAD, THINK BRAVO"
- Subheading paragraph
- Two CTA buttons
- Stats grid (3 columns)
- Animated background shapes

**Animations:**
- Fade in from bottom
- Gradient background rotation
- Floating cards
- Hover effects on buttons

---

### 3. Director's Message
**File:** `components/DirectorMessage.tsx`

**Layout:**
- Left (40%): Director photo on purple gradient
- Right (60%): Quote and message content

**Visual Elements:**
- Quote icon (top)
- Professional card design
- Rounded corners (24px)
- Shadow for depth
- Achievement stats at bottom

**Content Sections:**
- Opening quote
- Main message paragraphs
- Emphasis on "100% success"
- Bottom statistics bar

---

### 4. Destination Hub
**File:** `components/DestinationHub.tsx`

**Grid Layout:**
- 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile

**Each Card Contains:**
- Country flag (large emoji)
- Country name
- Description paragraph
- 3 key features (bullet points)
- Statistics grid (3 items)
- "Learn More" button

**Card Colors:**
- UK: Blue gradient
- USA: Red gradient
- Canada: Red gradient (different shade)

**Interactions:**
- Hover: Card lifts up (-10px)
- Button hover: Arrow moves right
- Shadow expands

---

### 5. USP Section
**File:** `components/USPSection.tsx`

**Main Grid:**
- 4 columns on desktop
- 2 columns on tablet
- 1 column on mobile

**Each USP Card:**
- Colored icon (16x16 rounded square)
- Title in bold
- Description paragraph
- Hover effect (lifts up)

**Additional Section:**
- Full-width purple gradient banner
- 3 bonus benefits
- Icon + title + description format

**Trust Badges:**
- British Council
- ICEF Certified
- Award Winning
- Top Rated

---

### 6. Process Map
**File:** `components/ProcessMap.tsx`

**Desktop Layout:**
- Horizontal flow (left to right)
- 4 cards with arrows between
- Connection line at top

**Mobile Layout:**
- Vertical stack
- Dotted lines between steps
- Compact card design

**Each Step Card:**
- Number badge (colored circle)
- Step icon
- Title
- Description
- Duration badge

**Visual Flow:**
- Blue → Purple → Orange → Green
- Progressive color scheme

---

### 7. Testimonial Slider
**File:** `components/TestimonialSlider.tsx`

**Slider Layout:**
- Left: Student photo + video thumbnail
- Right: Quote and details

**Navigation:**
- Left/right arrow buttons
- Dot indicators
- Auto-advance (optional)

**Student Info Display:**
- Large profile emoji/photo
- Student name (large, bold)
- Program name
- College name
- Location with pin icon
- 5-star rating

**Bottom Stats:**
- 4-column grid
- Success metrics
- Verification badge

---

### 8. Consultation Form
**File:** `components/ConsultationForm.tsx`

**Split Layout:**
- Left (purple gradient): Benefits list
- Right (white): Form fields

**Form Fields:**
- Name (with user icon)
- Email (with mail icon)
- Phone (with phone icon)
- Destination (dropdown)
- Education level (dropdown)
- Message (textarea)
- Submit button (purple gradient)

**Success State:**
- Green checkmark animation
- Thank you message
- Next steps list
- Auto-reset after 5 seconds

**Left Panel Benefits:**
- 4 checkmarks with descriptions
- What to expect section
- Bulleted list

---

### 9. Footer
**File:** `components/Footer.tsx`

**4-Column Grid:**
1. Company info + social media
2. Quick links
3. Services list
4. Contact information

**Elements:**
- Logo with gradient text
- Social media icon row
- Clickable links with hover
- Contact details with icons
- Google Maps embed placeholder
- Newsletter signup banner
- Bottom bar with copyright

**Newsletter Section:**
- Purple gradient background
- Email input + Subscribe button
- Full-width above footer links

---

### 10. Chat Widget
**File:** `components/ChatWidget.tsx`

**Two Components:**
1. **WhatsApp Button:**
   - Green circle
   - WhatsApp icon
   - Bottom-right, above chat
   - Direct link to WhatsApp

2. **Custom Chat:**
   - Toggle button (purple)
   - Chat window (white card)
   - Header (purple gradient)
   - Message area
   - Quick reply buttons
   - Contact form
   - Input field with send button

**Chat Features:**
- Welcome message
- Bot responses
- Quick replies
- Contact form capture
- Timestamp on messages
- Typing indicator ready

---

## 🎨 Color Usage Guide

### Primary Colors

**Purple (#5B21B6):**
- Main headings
- Navigation links (hover)
- Primary buttons
- Chat header
- Director photo background
- Process step highlights

**Orange/Gold (#F59E0B):**
- CTA buttons
- Accent highlights
- Icons and badges
- Secondary buttons
- Success indicators

### Supporting Colors

**White (#FFFFFF):**
- Card backgrounds
- Text on dark backgrounds
- Form inputs
- Clean sections

**Gray Shades:**
- Text (#1F2937 dark, #6B7280 light)
- Borders (#E5E7EB)
- Backgrounds (#F9FAFB)

### Gradient Combinations

```css
/* Primary Button */
from-primary-purple to-primary-purple-light

/* CTA Button */
from-accent-orange to-accent-gold

/* Decorative */
from-primary-purple via-purple-light to-accent-orange
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default: 0px - 639px (mobile)

sm: 640px  (large mobile)
md: 768px  (tablet)
lg: 1024px (laptop)
xl: 1280px (desktop)
2xl: 1536px (large desktop)
```

**Grid Behavior:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

---

## ✨ Animation Patterns

### Scroll Animations
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

### Hover Effects
```tsx
whileHover={{ scale: 1.05, y: -10 }}
```

### Button Interactions
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Loading States
```tsx
<div className="animate-spin" />
```

---

## 🔤 Typography Scale

```
Hero Heading:     5xl-7xl (48px-72px)
Section Heading:  4xl-5xl (36px-48px)
Card Title:       xl-2xl (20px-24px)
Body Text:        base-lg (16px-18px)
Small Text:       sm-xs (12px-14px)
```

---

## 📏 Spacing System

```
Gap between sections:  py-20 (80px)
Card padding:          p-8 to p-12 (32px-48px)
Element spacing:       space-y-4 to space-y-6
Container padding:     px-4 lg:px-8
```

---

## 🎯 Component States

### Default
- Normal appearance
- Neutral colors
- Standard spacing

### Hover
- Lift effect (-10px translateY)
- Shadow expansion
- Color intensification
- Scale increase (1.05)

### Active/Focus
- Ring outline (purple)
- Border highlight
- Color change

### Loading
- Spinning indicator
- Disabled appearance
- Reduced opacity

### Success
- Green checkmark
- Success message
- Confetti animation (optional)

---

## 🔧 Customization Quick Reference

| What to Change | File | Line Approx |
|----------------|------|-------------|
| Logo/Brand Name | Header.tsx | 40 |
| Hero Slogan | Hero.tsx | 70 |
| Director Quote | DirectorMessage.tsx | 60 |
| Destinations | DestinationHub.tsx | 10 |
| USP Points | USPSection.tsx | 10 |
| Process Steps | ProcessMap.tsx | 10 |
| Testimonials | TestimonialSlider.tsx | 15 |
| Form Fields | ConsultationForm.tsx | 100 |
| Footer Links | Footer.tsx | 20 |
| Chat Responses | ChatWidget.tsx | 50 |
| Colors | globals.css | 5 |

---

## 📸 Image Specifications

### Recommended Image Sizes:

**Director Photo:**
- Size: 400x400px
- Format: JPG or WebP
- File size: < 100KB

**Hero Background:**
- Size: 1920x1080px
- Format: JPG or WebP
- File size: < 200KB

**Student Photos:**
- Size: 300x300px
- Format: JPG or WebP
- File size: < 50KB each

**Country Flags:**
- Currently using emojis (recommended)
- Or SVG format for custom flags

---

## 🎬 Animation Timing

**Fast:** 200-300ms (buttons, hovers)
**Medium:** 500-600ms (section transitions)
**Slow:** 800-1000ms (page load animations)

**Easing:**
- Default: `ease-in-out`
- Buttons: `ease-out`
- Slides: `ease-in-out`

---

This visual guide helps you understand where each element appears and how to customize it. Refer to the actual component files for implementation details.

---

*Last Updated: December 22, 2024*
