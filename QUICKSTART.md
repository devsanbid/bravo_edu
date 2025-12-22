# 🚀 Quick Start Guide - Bravo International Website

## Immediate Next Steps

Your website is **ready and running** at [http://localhost:3000](http://localhost:3000)!

Here's what you need to do to make it production-ready:

## ⚡ Priority 1: Essential Updates (15 minutes)

### 1. Update Contact Information
Open these files and replace placeholder contact details:

**Phone Numbers:**
- [`components/Header.tsx`](components/Header.tsx) - Search for `+977-XXX-XXXXX`
- [`components/Footer.tsx`](components/Footer.tsx) - Search for `+977-XXX-XXXXX`
- [`components/ChatWidget.tsx`](components/ChatWidget.tsx) - Search for `977XXXXXXXXX`

**Email:**
- [`components/Footer.tsx`](components/Footer.tsx) - Replace `info@bravointernational.com`

### 2. Add WhatsApp Number
**File:** [`components/ChatWidget.tsx`](components/ChatWidget.tsx)
```tsx
// Line 200 - Update this:
href="https://wa.me/9779XXXXXXXX" // Your WhatsApp number with country code
```

### 3. Update Social Media Links
**File:** [`components/Footer.tsx`](components/Footer.tsx)
```tsx
// Around line 50-60 - Update these URLs:
{ icon: Facebook, href: 'https://facebook.com/yourpage' }
{ icon: Instagram, href: 'https://instagram.com/yourpage' }
```

## 📸 Priority 2: Add Images (30 minutes)

### Director's Photo
1. Save director photo as `public/director.jpg`
2. See [CONFIGURATION.md](CONFIGURATION.md) for code to add

### Student Photos
1. Add photos to `public/students/` folder
2. Update testimonial images in [`components/TestimonialSlider.tsx`](components/TestimonialSlider.tsx)

## 🗺️ Priority 3: Google Maps (5 minutes)

1. Go to [Google Maps](https://www.google.com/maps)
2. Search "Putalisadak Chowk, Kathmandu"
3. Click Share → Embed a map → Copy HTML
4. Paste in [`components/Footer.tsx`](components/Footer.tsx) - replace placeholder

## 🎨 Customization Options

### Change Colors
Edit [`app/globals.css`](app/globals.css):
```css
--primary-purple: #5B21B6;  /* Change this */
--accent-orange: #F59E0B;   /* Change this */
```

### Update Text Content
All text is directly in the component files:
- Hero slogan: [`components/Hero.tsx`](components/Hero.tsx)
- Director message: [`components/DirectorMessage.tsx`](components/DirectorMessage.tsx)
- USP content: [`components/USPSection.tsx`](components/USPSection.tsx)

### Add More Testimonials
Edit [`components/TestimonialSlider.tsx`](components/TestimonialSlider.tsx):
```tsx
const testimonials = [
  {
    name: 'Your Student Name',
    college: 'University Name',
    location: 'City, Country',
    // ... add more details
  },
];
```

## 🚀 Deploy to Production

### Option 1: Vercel (Recommended - Free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```
Follow prompts → Done! You'll get a live URL.

### Option 2: Traditional Hosting
```bash
# Build the project
bun run build

# The output will be in .next/ folder
# Upload to your hosting provider
```

## 📱 Test Checklist

Before going live, test:

- [ ] Website loads on desktop
- [ ] Website loads on mobile
- [ ] All navigation links work
- [ ] "Free Consultation" button works
- [ ] Chat widget opens
- [ ] WhatsApp button works
- [ ] Contact form submissions
- [ ] All social media links work
- [ ] Google Maps shows correct location
- [ ] Images load properly
- [ ] Smooth scrolling works

## 🔧 Common Issues & Fixes

### Issue: Website won't start
```bash
# Clear cache and reinstall
rm -rf .next node_modules
bun install
bun run dev
```

### Issue: Images not showing
- Check image paths are correct
- Images should be in `public/` folder
- Use `/image.jpg` not `./image.jpg` in code

### Issue: Colors not applying
- Check [`app/globals.css`](app/globals.css) has custom colors
- Clear browser cache (Ctrl + Shift + R)

## 📚 Documentation

- **Full Setup:** [SETUP.md](SETUP.md) - Complete project documentation
- **Configuration:** [CONFIGURATION.md](CONFIGURATION.md) - Detailed customization guide
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

## 🎯 Current Features

✅ **Fully Responsive** - Works on all devices
✅ **Modern Design** - Purple & orange color scheme
✅ **Animated** - Smooth transitions and effects
✅ **SEO Optimized** - Meta tags and structured data
✅ **Chat Widget** - Live chat + WhatsApp integration
✅ **7 Complete Sections:**
  - Sticky Header with CTA
  - Hero with "THINK ABROAD, THINK BRAVO"
  - Director's Message
  - Destination Hub (UK, USA, Canada)
  - USP Section (4 key differentiators)
  - Process Map (4-step journey)
  - Testimonial Slider
  - Footer with map

## 🎁 Bonus Features to Add Later

After launching, consider adding:
- Blog section for study tips
- Student application portal
- IELTS preparation resources
- University search tool
- Live webinars section
- Success stories page
- FAQs section
- Newsletter signup

## 💡 Tips for Success

1. **Update Regularly:** Keep testimonials and stats current
2. **Monitor Chat:** Respond quickly to student inquiries
3. **Track Analytics:** Add Google Analytics (see CONFIGURATION.md)
4. **Mobile First:** Most students browse on mobile
5. **Fast Loading:** Compress images before uploading
6. **Regular Backups:** Keep backups of your content

## 🆘 Need Help?

1. Check error messages in terminal
2. Review documentation files
3. Search [Next.js discussions](https://github.com/vercel/next.js/discussions)
4. Check component comments in code

## 🎉 You're All Set!

Your professional educational consultancy website is ready to attract students and convert them into successful applicants!

**Next Step:** Update contact info and deploy!

---

**Built with:**
- ⚡ Next.js 16
- 🎨 Tailwind CSS 4
- ✨ Framer Motion
- 📱 Fully Responsive
- 🚀 Production Ready

*Good luck with Bravo International! 🎓*
