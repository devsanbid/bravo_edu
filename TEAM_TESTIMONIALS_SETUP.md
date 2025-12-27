# Team Members and Testimonials Setup

## Overview
Team members and testimonials now have their own dedicated collections and admin pages with image upload functionality.

## Step 1: Create Collections

Run the script to create the new collections:

```bash
export APPWRITE_API_KEY="your_api_key_here"
bun run create-collections
```

This creates:
- `team_members` collection
- `testimonials` collection

## Step 2: Add Team Members

1. Go to `/admin/team` in your browser
2. Click "Add Team Member"
3. Fill in the details:
   - Name (required)
   - Position/Role (required)
   - Email
   - Phone
   - LinkedIn URL
   - Order (for sorting)
   - Personal Message/Bio
   - Photo (upload image file)
4. Click "Save Team Member"

## Step 3: Add Testimonials

1. Go to `/admin/testimonials` in your browser
2. Click "Add Testimonial"
3. Fill in the details:
   - Name (required)
   - College/University
   - Location
   - Program
   - Year
   - Rating (1-5, required)
   - Quote (required)
   - Order (for sorting)
   - Photo (upload image file)
4. Click "Save Testimonial"

## Admin Panel Navigation

The sidebar now includes:
- **Team Members** - Manage your team
- **Testimonials** - Manage student testimonials

The old "Team" and "Testimonials" tabs have been removed from the Website settings page.

## Features

### Team Members
- Upload team member photos directly
- Add contact information (email, phone, LinkedIn)
- Add personal messages/bios
- Sort order control
- Edit and delete members
- Images stored in Appwrite storage

### Testimonials
- Upload student photos directly
- 5-star rating system
- Add program, college, location details
- Sort order control
- Edit and delete testimonials
- Images stored in Appwrite storage

## Public Pages

- Team members appear on `/team`
- Testimonials appear on homepage `/#testimonials`

Both pages automatically load from the new collections. If no data exists, default examples are shown.

## Collections Structure

### team_members
- name (string, required)
- role (string, required)
- email (string)
- phone (string)
- linkedin (string)
- message (string, 1000 chars)
- imageFileId (string)
- imageFileName (string)
- order (integer, 0-1000)

### testimonials
- name (string, required)
- college (string)
- location (string)
- program (string)
- year (string)
- rating (integer, 1-5, required)
- quote (string, 2000 chars, required)
- imageFileId (string)
- imageFileName (string)
- order (integer, 0-1000)

## Notes

- Images are stored in the same storage bucket as other website images
- When you delete a team member or testimonial, their image is automatically deleted from storage
- When you change a photo, the old photo is automatically deleted
- Use the "order" field to control the display sequence (lower numbers appear first)
