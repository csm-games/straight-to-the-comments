# Media Setup Guide for "Straight to the Comments"

## 📁 Backend Media Upload Instructions

### **Step 1: Create Media Directory**
Create a `/media` folder in your web server root directory:
```
your-website/
├── index.html
├── media/
│   ├── art-project.jpg
│   ├── workout-complete.jpg
│   ├── homemade-pizza.jpg
│   ├── graduation-day.jpg
│   └── open-mic-performance.mp4
└── README.md
```

### **Step 2: Upload Your Media Files**
Upload these files to your `/media` directory:

| Post Type | Username | File Name | Media Type | Description |
|-----------|----------|-----------|------------|-------------|
| Art | alex_creates | `art-project.jpg` | Image | Colorful abstract art piece |
| Fitness | fitness_sarah | `workout-complete.jpg` | Image | Gym workout completion photo |
| Cooking | foodie_mike | `homemade-pizza.jpg` | Image | Homemade pizza with thick crust |
| Graduation | student_emma | `graduation-day.jpg` | Image | Graduation ceremony photo |
| Music | music_alex | `open-mic-performance.mp4` | Video | Open mic performance video |

### **Step 3: Update Media Configuration**
In `index.html`, find the `mediaConfig` object and update the paths:

```javascript
const mediaConfig = {
    'alex_creates': {
        type: 'image',
        path: '/media/art-project.jpg', // ← Update this path
        alt: 'Colorful abstract art piece'
    },
    'fitness_sarah': {
        type: 'image',
        path: '/media/workout-complete.jpg', // ← Update this path
        alt: 'Gym workout completion photo'
    },
    // ... etc
};
```

### **Step 4: Test Your Media**
1. Upload your files to the server
2. Update the paths in the code
3. Test each post type to ensure media displays correctly

## 🎯 Media Requirements

### **Images:**
- **Format**: JPG, PNG, GIF
- **Size**: Recommended 400x300px or larger
- **File Size**: Under 2MB for fast loading

### **Videos:**
- **Format**: MP4, WebM
- **Duration**: 10-30 seconds recommended
- **File Size**: Under 10MB for good performance

## 🔧 Adding New Post Types

To add a new post type with media:

1. **Upload media file** to `/media/` directory
2. **Add to `mediaConfig`**:
```javascript
'new_username': {
    type: 'image', // or 'video'
    path: '/media/your-file.jpg',
    alt: 'Description of the media'
}
```
3. **Add post data** to the `newPosts` array in `newPost()` function

## 🚀 Deployment Options

### **GitHub Pages:**
- Upload media files to your repository
- Update paths to: `https://[username].github.io/[repo]/media/filename.jpg`

### **Netlify:**
- Drag and drop media files to your site
- Update paths to: `https://[site].netlify.app/media/filename.jpg`

### **Custom Server:**
- Upload to your web server's `/media` directory
- Use relative paths: `/media/filename.jpg`

## ✅ Testing Checklist

- [ ] All media files uploaded to server
- [ ] Paths updated in `mediaConfig`
- [ ] Images display correctly for each post type
- [ ] Videos play properly
- [ ] Fallback text shows when media fails to load
- [ ] Mobile responsive (images/videos scale properly)

## 🎨 Customization Tips

- **Image Alt Text**: Make it descriptive for accessibility
- **Video Controls**: Videos automatically have play/pause controls
- **Responsive Design**: Media automatically scales to fit the container
- **Loading States**: Consider adding loading spinners for large files

---

**Need Help?** Check that:
1. File paths are correct (case-sensitive)
2. Files are actually uploaded to the server
3. Server allows access to the `/media` directory
4. File formats are supported by browsers 