# Website Settings Integration

## What We Did

We integrated the Website Settings management system into your landing page so changes made in the admin panel will now appear on your website.

## Components Updated

### 1. Header Component (`components/Header.tsx`)
**Now displays from Website Settings:**
- Logo (if uploaded in admin)
- Header Email
- Header Phone
- Header Address

### 2. Hero Component (`components/Hero.tsx`)
**Now displays from Website Settings:**
- Hero Title (main heading)
- Hero Subtitle (secondary heading)
- Hero Image (banner image)
- Hero Image Size (Small/Medium/Large/Full)

### 3. Footer Component (`components/Footer.tsx`)
**Now displays from Website Settings:**
- Logo (same as header)
- Footer Description
- Footer Contact (Phone, Email, Address)
- Footer Copyright text
- Social Media Links:
  - Facebook URL
  - Instagram URL
  - Twitter/X URL
  - LinkedIn URL
  - YouTube URL

## How It Works

1. **Created a custom hook** (`hooks/useWebsiteSettings.ts`):
   - Fetches settings from Appwrite when page loads
   - Uses the `websiteService` to get data
   - Caches the data to avoid repeated fetches

2. **Updated components** to use the hook:
   ```tsx
   const { settings } = useWebsiteSettings();
   ```

3. **Fallback to defaults** if settings not configured:
   - If no logo uploaded → shows `/logo1.png`
   - If no text set → shows original hardcoded text
   - Seamless transition as you configure settings

## Testing Your Changes

1. **Go to Admin Panel:**
   ```
   /admin/website
   ```

2. **Make Changes:**
   - Upload a new logo
   - Change hero title to "Study Abroad Made Easy"
   - Update footer description
   - Add social media URLs

3. **View Landing Page:**
   ```
   /
   ```

4. **You should see:**
   - New logo in header and footer
   - Updated hero text
   - New footer content
   - Working social media links

## What Changes Will Show

| Setting | Where It Appears |
|---------|------------------|
| Logo | Header (top bar + mobile), Footer |
| SEO Title | Browser tab (coming soon) |
| SEO Description | Meta tags (coming soon) |
| Hero Title | Landing page main heading |
| Hero Subtitle | Landing page secondary heading |
| Hero Image | Landing page right side banner |
| Header Phone | Top info bar |
| Header Email | Top info bar |
| Header Address | Top info bar |
| Footer Description | Footer company info |
| Footer Phone/Email/Address | Footer contact section |
| Footer Copyright | Bottom of footer |
| Social Media URLs | Footer social icons |

## Troubleshooting

**Changes not showing?**
1. Hard refresh browser: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
2. Check browser console for errors (F12)
3. Verify settings saved in admin panel
4. Make sure `website_settings` collection exists in Appwrite

**Images not loading?**
1. Check image was uploaded successfully
2. Verify file ID is saved in database
3. Check Appwrite storage permissions
4. Try re-uploading the image

**Settings still showing defaults?**
1. Make sure you saved changes in admin panel
2. Check database has the settings record
3. Clear browser cache
4. Restart development server

## Next Steps

You can now:
- ✅ Update any website content from admin panel
- ✅ Change logo without touching code
- ✅ Manage social media links centrally
- ✅ Control hero section content
- ✅ Update contact information sitewide

**Future Enhancements:**
- Add About section management
- Add services section customization
- Add more image upload options
- Add color scheme customization
