# Media Setup Guide for "Straight to the Comments"

## 🎯 **Current Setup (Online Media)**

The game is currently configured with free online media from Unsplash and sample videos. This works immediately without any file downloads.

## 📁 **Option 1: Local Media Files (Recommended)**

### **Step 1: Create Media Directory**
Create a `/media` folder in your project:
```
straight-to-the-comments/
├── index.html
├── media/
│   ├── instagram-fashion.jpg
│   ├── tiktok-dance.mp4
│   ├── youtube-tutorial.jpg
│   ├── text-message.jpg
│   └── discord-gaming.jpg
└── README.md
```

### **Step 2: Download Sample Media**
You can use these free resources:

#### **Instagram (Fashion Photo)**
- **Source:** Unsplash, Pexels, or your own photo
- **Content:** Fashion outfit selfie, trendy clothing
- **Size:** 400x600px recommended
- **File:** `instagram-fashion.jpg`

#### **TikTok (Dance Video)**
- **Source:** Pexels, Pixabay, or create a simple animation
- **Content:** Short dance video with transitions
- **Duration:** 10-30 seconds
- **File:** `tiktok-dance.mp4`

#### **YouTube (Tutorial Thumbnail)**
- **Source:** Unsplash, or create a thumbnail
- **Content:** Tutorial setup, computer screen, or clickbait-style image
- **Size:** 400x600px recommended
- **File:** `youtube-tutorial.jpg`

#### **Text Message (Phone Screenshot)**
- **Source:** Create a mockup or use stock photo
- **Content:** Phone showing text conversation
- **Size:** 400x600px recommended
- **File:** `text-message.jpg`

#### **Discord (Gaming Setup)**
- **Source:** Unsplash, or gaming screenshot
- **Content:** Gaming setup, Discord interface, or artwork
- **Size:** 400x600px recommended
- **File:** `discord-gaming.jpg`

### **Step 3: Update Code for Local Files**
Replace the online URLs in `index.html` with local paths:

```javascript
// Find this section in the PLATFORMS array and update:
{
    key: "instagram",
    label: "Instagram",
    orientation: "vertical",
    accent: "#d62976",
    icon: "📸",
    media: {
        type: "image",
        src: "./media/instagram-fashion.jpg", // ← Change this
        alt: "Fashion outfit selfie with trendy lighting"
    }
},
{
    key: "tiktok",
    label: "TikTok",
    orientation: "vertical",
    accent: "#25F4EE",
    icon: "🎵",
    media: {
        type: "video",
        src: "./media/tiktok-dance.mp4", // ← Change this
        alt: "Dance video with smooth transitions"
    }
},
// ... repeat for other platforms
```

## 🌐 **Option 2: Custom Online Media**

### **Free Image Sources:**
- **Unsplash:** https://unsplash.com
- **Pexels:** https://pexels.com
- **Pixabay:** https://pixabay.com

### **Free Video Sources:**
- **Pexels:** https://pexels.com/videos/
- **Pixabay:** https://pixabay.com/videos/
- **Coverr:** https://coverr.co

### **Example URLs to Replace:**
```javascript
// Instagram - Fashion photo
src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face"

// TikTok - Dance video
src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"

// YouTube - Tutorial thumbnail
src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=600&fit=crop"

// Text Message - Phone screenshot
src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop"

// Discord - Gaming setup
src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop"
```

## 🎨 **Option 3: Create Custom Media**

### **Simple Image Creation:**
1. **Use Canva** (free): Create platform-specific mockups
2. **Use Figma** (free): Design custom interfaces
3. **Use GIMP** (free): Edit and create images

### **Simple Video Creation:**
1. **Use CapCut** (free): Create short dance videos
2. **Use DaVinci Resolve** (free): Edit videos
3. **Use Canva** (free): Create animated content

## 🔧 **Technical Requirements**

### **Image Files:**
- **Format:** JPG, PNG, WebP
- **Size:** 400x600px minimum (portrait)
- **File Size:** Under 2MB for fast loading
- **Aspect Ratio:** 2:3 (portrait)

### **Video Files:**
- **Format:** MP4, WebM
- **Duration:** 10-30 seconds
- **File Size:** Under 10MB
- **Aspect Ratio:** 9:16 (portrait)

## ✅ **Testing Checklist**

- [ ] All media files load correctly
- [ ] Images display with proper aspect ratio
- [ ] Videos autoplay and loop properly
- [ ] Fallback placeholders show if media fails
- [ ] Mobile responsive (media scales properly)
- [ ] File sizes are optimized for web

## 🚀 **Deployment Options**

### **GitHub Pages:**
- Upload media files to your repository
- Use relative paths: `./media/filename.jpg`

### **Netlify:**
- Drag and drop media files to your site
- Use relative paths: `./media/filename.jpg`

### **Custom Server:**
- Upload to your web server's `/media` directory
- Use relative paths: `./media/filename.jpg`

## 🎯 **Quick Start (Recommended)**

1. **Download sample images** from Unsplash for each platform
2. **Create a `/media` folder** in your project
3. **Save the images** with descriptive names
4. **Update the `src` paths** in the code to use `./media/filename.jpg`
5. **Test locally** to ensure everything loads

## 🆘 **Troubleshooting**

### **Media Not Loading:**
- Check file paths are correct (case-sensitive)
- Ensure files are actually in the `/media` folder
- Try using absolute URLs for testing

### **Videos Not Playing:**
- Check video format is MP4 or WebM
- Ensure video file size is under 10MB
- Try adding `controls` attribute for debugging

### **Images Not Displaying:**
- Check image format is JPG, PNG, or WebP
- Ensure image file size is under 2MB
- Verify alt text is set for accessibility

---

**Need Help?** The current setup with online media works immediately. For local files, follow the steps above and test with your local server at `http://localhost:8000`. 