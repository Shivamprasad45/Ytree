# Poster Image Guide

Since AI image generation hit rate limits, you can create poster images manually or use the following guidance:

## Required Posters

Create 5 poster images in `public/posters/`:
- `scene1.jpg` - Lush green forest, healthy ecosystem
- `scene2.jpg` - Industrial pollution, smog-filled air
- `scene3.jpg` - Dark storm clouds, acid rain
- `scene4.jpg` - Deforestation, tree stumps
- `scene5.jpg` - Cracked dry earth, drought

## Specifications

- **Aspect Ratio**: 9:16 (vertical/portrait)
- **Resolution**: 1080x1920px or higher
- **Style**: Cinematic, high contrast, emotional
- **Effects**: Soft film grain, subtle vignette
- **Format**: JPG (optimized for web)

## Quick Option

You can extract frames from the existing videos in `public/story/` using a tool like FFmpeg:

```bash
ffmpeg -i input.mp4 -ss 00:00:02 -frames:v 1 -q:v 2 scene1.jpg
```

Or use free stock photos from:
- Unsplash.com
- Pexels.com
- Pixabay.com

Search terms: "environmental degradation", "pollution", "deforestation", "drought", "healthy forest"
