# Mobile Experience Guide for Scroll-Based Storytelling

## 🎯 Quick Start: Generate Poster Images

Since you have FFmpeg available or can install it, run this command to automatically extract poster images from your videos:

```bash
# If you have FFmpeg installed
node extract-posters.js
```

If you don't have FFmpeg, you can:
1. Download it from https://ffmpeg.org/download.html
2. Or manually create 5 poster images and save them in `public/posters/` as scene1.jpg through scene5.jpg

---

## 📱 Mobile Optimizations Implemented

### 1. **Automatic Device Detection**
The app automatically detects mobile devices (< 768px width) and switches to poster images instead of videos for better performance.

### 2. **Enhanced Text Readability** 
- **Larger tap targets**: Increased mobile padding from `px-6` to `px-4 md:px-6`
- **Better gradients**: Darker overlays on mobile (`from-black/50 via-black/20 to-black/70`)
- **Responsive text sizing**: `text-2xl sm:text-3xl md:text-5xl lg:text-6xl`
- **Drop shadow**: Added `drop-shadow-2xl` for better contrast

### 3. **Scroll-Driven Text Animation**
Text now animates with scroll progress:
- Slides up smoothly as scene becomes active
- Fades in/out based on scroll position
- More engaging than static text

### 4. **Mobile Scroll Hint**
Added animated scroll indicator on first scene (mobile only):
- Bouncing arrow animation
- "Scroll to continue" text
- Auto-hides on desktop (`md:hidden`)

### 5. **Poster Preloading**
- Images preload in background
- Graceful error handling if posters missing
- Smooth fade-in transition when loaded

---

## 🚀 Testing on Mobile

### Option 1: Chrome DevTools (Quickest)
1. Open `http://localhost:3000/home1` in Chrome
2. Press `F12` to open DevTools
3. Click the mobile icon (or press `Ctrl+Shift+M`)
4. Select a mobile device like "iPhone 12 Pro"
5. Scroll down to test the experience

### Option 2: Test on Real Device
1. Find your computer's local IP:
   ```bash
   ipconfig
   # Look for "IPv4 Address" (e.g., 192.168.1.5)
   ```
2. Make sure your phone is on the same WiFi network
3. On your phone, visit: `http://YOUR_IP:3000/home1`
   (e.g., `http://192.168.1.5:3000/home1`)

### Option 3: Use Browser's Responsive Mode
1. Right-click on the page → "Inspect"
2. Click "Toggle device toolbar" 
3. Select different phone models to test

---

## ✨ Additional Mobile Features

### Performance
✅ Static posters instead of heavy videos  
✅ Faster initial load time  
✅ Reduced data usage on mobile networks  
✅ Smooth 60fps animations with Framer Motion  

### UX Improvements  
✅ Clear scroll indication on first scene  
✅ Larger, more readable text  
✅ Better contrast with enhanced gradients  
✅ Touch-optimized spacing  

### Accessibility
✅ Respects `prefers-reduced-motion` setting  
✅ Semantic HTML structure  
✅ Proper ARIA labels  
✅ Keyboard navigation support  

---

## 🎨 Want Better Mobile Videos Instead?

If you still want to use videos on mobile (with optimized settings), you can modify the Scene component:

```tsx
// Instead of showing posters on mobile, use optimized videos
{isMobile ? (
  <video
    src={scene.video}
    muted
    loop
    playsInline
    preload="none"  // Don't preload on mobile
    className="absolute inset-0 h-full w-full object-cover"
  />
) : prefersReducedMotion ? (
  <div style={{backgroundImage: `url(/posters/scene${index + 1}.jpg)`}} />
) : (
  <video ... /> // Full desktop experience
)}
```

**Trade-offs:**
- ✅ More engaging experience
- ❌ Higher data usage
- ❌ Slower load times
- ❌ Battery drain

---

## 📊 Current vs Enhanced Mobile Experience

| Feature | Before | Now |
|---------|--------|-----|
| Text Size | Fixed 3xl | Responsive 2xl→6xl |
| Gradient | Same on all | Stronger on mobile |
| Scroll Hint | None | Animated indicator |
| Text Animation | Static fade | Scroll-driven slide |
| Media | Videos | Optimized posters |
| Padding | Fixed 6 | Responsive 4→6 |

---

## 🔧 Next Steps

1. **Generate posters**: Run `node extract-posters.js`
2. **Test on mobile**: Use Chrome DevTools device mode
3. **Adjust if needed**: Tweak text sizes, gradients, or animations
4. **Optimize videos**: Compress for faster mobile loading (optional)
