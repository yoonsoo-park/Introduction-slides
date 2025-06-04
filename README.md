# Yoonsoo Park - Introduction Presentation

A web-based presentation app for Yoonsoo Park's introduction slides.

## 🚀 How to Run

### Option 1: Direct File Opening (Simple)

1. Open `index.html` directly in your web browser
2. Click "Start Presentation" to begin

### Option 2: Local Web Server (Recommended)

For best results, serve the files through a local web server to avoid CORS issues:

#### Using Python (if you have Python installed):

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (if you have Node.js installed):

```bash
npx http-server -p 8000
```

#### Using PHP (if you have PHP installed):

```bash
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

## 🎮 Controls & Features

### Keyboard Shortcuts

- **→ / Space**: Next slide
- **← / Backspace**: Previous slide
- **F**: Toggle fullscreen mode
- **H**: Show/hide help
- **ESC**: Exit fullscreen
- **Home**: Go to first slide
- **End**: Go to last slide
- **1-5**: Jump to specific slide
- **Mouse movement**: Show controls (in fullscreen)

### On-Screen Controls

- **Navigation arrows**: Previous/Next slide
- **Play/Pause button**: Auto-advance slides (10-second intervals)
- **Fullscreen button**: Enter/exit fullscreen mode
- **Help button**: Show keyboard shortcuts
- **Slide counter**: Shows current slide position

### Features

- ✨ **Professional presentation interface** with smooth transitions
- 🖥️ **Fullscreen presentation mode** with auto-hiding controls
- ⌨️ **Comprehensive keyboard shortcuts** for seamless navigation
- 📊 **Progress bar** showing presentation progress
- 🔄 **Auto-play mode** for unattended presentations
- 📱 **Responsive design** that scales on different screen sizes
- 🎯 **Direct slide access** using number keys
- 💡 **Built-in help system** with keyboard shortcut reference

## 📁 File Structure

```
├── index.html              # Main presentation app
├── presentation.js         # JavaScript functionality
├── README.md              # This file
└── slides/                # Individual slide files
    ├── 1-about-me.html
    ├── 2-my-journey.html
    ├── 3-my-time-at-ncino.html
    ├── 4-motivation.html
    └── 5-grow-together.html
```

## 🎨 Slides Overview

1. **About Me** - Personal introduction and background
2. **My Journey** - Timeline of career progression
3. **My Time at nCino** - Professional experience and projects
4. **What Drives Me** - Personal motivations and values
5. **Growing Together** - Collaborative philosophy

## 🔧 Customization

### Adding New Slides

1. Create a new HTML file in the `slides/` directory
2. Update the `slides` array in `presentation.js`
3. Update the `slideNames` array in the `updateUI()` method

### Changing Auto-Play Timing

Modify the `autoPlayDelay` property in `presentation.js` (value in milliseconds):

```javascript
this.autoPlayDelay = 15000; // 15 seconds
```

### Styling

- Main styles are in `index.html` within the `<style>` tag
- Individual slide styles are contained within each slide file
- Uses Tailwind CSS for consistent styling

## 🌟 Tips for Presenting

1. **Start in fullscreen mode** (press F) for the best presentation experience
2. **Use keyboard shortcuts** for smooth navigation
3. **Move your mouse** to show controls when needed
4. **Press H** if you need a quick reference of keyboard shortcuts
5. **Use auto-play mode** for demo purposes or when you need hands-free operation

## 🔍 Troubleshooting

### Slides Not Loading

- Make sure all slide files are in the `slides/` directory
- Use a local web server instead of opening the file directly
- Check browser console for any error messages

### Controls Not Showing

- Move your mouse to activate controls
- Press any key to show controls
- Check if you're in fullscreen mode (controls auto-hide after 3 seconds)

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fullscreen API support required for fullscreen functionality
- JavaScript must be enabled

---

**Ready to present?** Open `index.html` and click "Start Presentation"! 🎉
