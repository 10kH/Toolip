# Toolip Chrome Extension - Complete User Guide

**Version**: 1.1.0  
**Author**: Woody Lee  
**Release Date**: August 11, 2025

---

## What is Toolip?

Toolip is a powerful Chrome extension that transforms your browsing experience by providing instant access to your favorite AI tools, development resources, and productivity websites through a sleek sidebar interface. Whether you're a developer, content creator, or productivity enthusiast, Toolip streamlines your workflow by keeping all your essential tools just one click away.

### Key Benefits
- **Instant Access**: No more bookmark hunting or tab switching
- **Session Persistence**: Each site maintains its state between visits
- **Customizable**: Add, remove, and organize your favorite sites
- **Theme Support**: Choose between light and dark modes
- **Cloud Sync**: Settings synchronize across all your Chrome browsers

---

## Getting Started

### Installation

#### From Chrome Web Store (Recommended)
1. Visit the Chrome Web Store
2. Search for "Toolip" or use the direct link
3. Click "Add to Chrome"
4. Confirm permissions when prompted
5. Look for the Toolip icon in your browser toolbar

#### For Developers (Manual Installation)
1. Download the extension files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked" and select the toolip folder
5. The extension will appear in your toolbar

### First Launch
1. Click the Toolip icon in your toolbar (or press `Ctrl+M` / `Cmd+M`)
2. The sidebar will open with 13 carefully curated default sites
3. Click any icon to start browsing that site
4. The website loads in an embedded frame while maintaining the sidebar

---

## Core Features

### 🚀 Sidebar Navigation

The main interface consists of a compact sidebar containing your website collection:

- **Site Icons**: Each website is represented by its favicon
- **One-Click Access**: Click any icon to open that site instantly
- **Visual Feedback**: Active site is highlighted with blue background
- **Settings Access**: Gear icon (⚙️) at bottom opens configuration

#### Navigation Tips
- **Hotkey**: `Ctrl+M` (Windows) or `Cmd+M` (Mac) to toggle sidebar
- **Quick Switching**: Click between sites without losing your place
- **State Preservation**: Each site remembers where you left off

### ⚙️ Site Management

Access the settings page by clicking the gear icon (⚙️) at the bottom of the sidebar.

#### Adding New Sites
1. In the settings page, scroll to "Your Sites" section
2. Enter the website URL (e.g., `https://example.com`)
3. Provide a display name (e.g., "My Favorite Tool")
4. Optionally add a custom icon URL (auto-generated if empty)
5. Click "Add Site"

#### Editing Existing Sites
1. Find the site in your collection
2. Click the pencil icon (✏️) next to it
3. Modify the URL, title, or icon as needed
4. Click "Update Site" to save changes

#### Removing Sites
1. Locate the unwanted site
2. Click the trash icon (🗑️)
3. Confirm deletion when prompted

#### Reordering Sites
1. Click and hold any site in the list
2. Drag it to your preferred position
3. Release to drop in the new location
4. Changes are saved automatically

### 🎨 Theme Customization

Toolip offers two beautiful themes to match your preference:

#### Light Mode ☀️
- Clean white backgrounds
- High contrast for daytime use
- Professional appearance
- Default setting

#### Dark Mode 🌙
- Dark backgrounds with light text
- Reduced eye strain in low light
- Modern aesthetic
- Popular for night browsing

#### Changing Themes
1. Open settings (gear icon)
2. Scroll to "Theme" section
3. Select your preferred option (Light Mode / Dark Mode)
4. Changes apply instantly to all extension pages

### 💾 Backup & Restore

Protect your customizations with comprehensive backup options:

#### Export Settings
1. Go to settings page
2. Scroll to "Backup & Restore" section
3. Click "📥 Export Settings"
4. A JSON file downloads with all your data
5. Store safely for future restoration

#### Import Settings
1. Click "📤 Import Settings"
2. Select a previously exported JSON file
3. Confirm the import when prompted
4. Your sites and theme will be restored

#### Reset to Default
1. Click "🔄 Reset to Default"
2. Confirm you want to lose custom settings
3. Extension returns to original 13-site configuration
4. Theme resets to Light Mode

---

## Default Site Collection

Toolip comes with 13 carefully curated websites across three categories:

### 🤖 AI Tools (6 sites)
Perfect for content creation, coding assistance, and research:

- **ChatGPT** (`chatgpt.com`) - OpenAI's conversational AI
- **Claude** (`claude.ai`) - Anthropic's helpful AI assistant  
- **Gemini** (`gemini.google.com`) - Google's multimodal AI
- **Google AI Studio** (`aistudio.google.com`) - AI development platform
- **Grok** (`grok.com`) - X's AI chatbot with real-time data
- **Perplexity** (`perplexity.ai`) - AI-powered search and research

### 🛠️ Development & Productivity (5 sites)
Essential tools for developers and knowledge workers:

- **Notion** (`notion.so`) - All-in-one workspace for notes and collaboration
- **GitHub** (`github.com`) - Code repository hosting and version control
- **Hugging Face** (`huggingface.co`) - Machine learning model hub
- **Google Colab** (`colab.research.google.com`) - Cloud-based Jupyter notebooks
- **RunPod** (`console.runpod.io`) - GPU cloud computing platform

### 🎵 Entertainment (2 sites)
For breaks and inspiration:

- **YouTube** (`youtube.com`) - Video streaming and learning platform
- **YouTube Music** (`music.youtube.com`) - Music streaming service

---

## Advanced Usage

### Session Persistence Explained

One of Toolip's most powerful features is session persistence:

- **Individual State**: Each website maintains its own browsing state
- **Memory Efficient**: Sites are hidden/shown rather than reloaded
- **Login Preservation**: Stay logged in across site switches
- **Form Data**: Partially filled forms remain intact
- **Scroll Position**: Resume exactly where you left off

### Keyboard Shortcuts

- **Toggle Sidebar**: `Ctrl+M` (Windows) / `Cmd+M` (Mac)
- **Settings**: Click gear icon (no keyboard shortcut)
- **Site Navigation**: Click icons (keyboard navigation planned for v1.2.0)

### Icon System

Toolip uses an intelligent icon system:

1. **Local Icons**: Predefined icons for default sites
2. **Auto-Generated**: Google's favicon service for custom sites
3. **Custom Icons**: Your own icon URLs for brand consistency
4. **Fallback**: Default placeholder if icon fails to load

### Cloud Synchronization

Your settings automatically sync across Chrome browsers:

- **Site Collection**: All added/removed sites
- **Theme Preference**: Light/dark mode choice  
- **Site Order**: Your custom arrangement
- **Instant Sync**: Changes appear on other devices within minutes

---

## Troubleshooting

### Common Issues and Solutions

#### Sites Not Loading
**Problem**: Website appears blank or shows error message
**Solutions**:
- Check your internet connection
- Some sites block iframe embedding (security feature)
- Try refreshing the extension (disable/enable in chrome://extensions/)
- Clear browser cache and try again

#### Settings Not Saving
**Problem**: Changes disappear after restarting browser
**Solutions**:
- Ensure Chrome sync is enabled in browser settings
- Check available storage space (Chrome has limits)
- Try exporting/importing settings manually as backup
- Restart Chrome completely

#### Theme Not Applying
**Problem**: Dark/light mode doesn't change appearance
**Solutions**:
- Refresh the extension pages
- Update Chrome to latest version
- Check if other extensions conflict
- Try toggling theme setting off and on

#### Extension Icon Missing
**Problem**: Can't find Toolip in toolbar
**Solutions**:
- Look in Chrome's extension menu (puzzle piece icon)
- Pin Toolip to toolbar from extensions menu
- Check if extension is enabled in chrome://extensions/
- Reinstall if completely missing

#### Performance Issues
**Problem**: Browser feels slow or unresponsive
**Solutions**:
- Close unused sites in sidebar (disable some iframes)
- Restart Chrome browser
- Check Chrome's task manager (Shift+Esc) for memory usage
- Reduce number of sites in collection temporarily

### Getting Help

If you encounter issues not covered here:

1. **Check Version**: Ensure you have the latest version (1.1.0)
2. **Browser Compatibility**: Chrome 88+ required for full functionality
3. **Extension Conflicts**: Temporarily disable other extensions to test
4. **Contact Support**: Visit developer's support page for assistance

---

## Privacy & Security

### Data Handling

Toolip respects your privacy with transparent data practices:

- **Local Storage**: Current session data stored locally on your device
- **Chrome Sync**: Site list and preferences synced via Google's secure servers
- **No External Servers**: Extension doesn't send data to third-party services
- **Minimal Data**: Only essential information (URLs, titles, icons) stored

### Permissions Explained

Toolip requests specific permissions for core functionality:

- **Side Panel**: Display the main interface sidebar
- **Storage**: Save your site collection and theme preference
- **Host Access**: Allow any website you add to load in iframe
- **Context Menus**: Right-click options for sharing and support
- **Header Modification**: Remove restrictions that prevent iframe embedding

### Security Features

- **Input Validation**: All user inputs checked for malicious content
- **Safe Iframes**: Websites load in isolated containers
- **No Script Injection**: Extension doesn't modify website content
- **CSP Compliance**: Follows Chrome's strict security policies

---

## Tips & Best Practices

### Organizing Your Collection

- **Frequency First**: Put most-used sites at the top
- **Category Grouping**: Keep similar tools together (AI, dev, etc.)
- **Limit Quantity**: 10-20 sites optimal for quick visual scanning
- **Regular Cleanup**: Remove unused sites periodically

### Maximizing Productivity

- **Workflow Integration**: Add sites that complement each other
- **Single Sign-On**: Use sites that share authentication when possible  
- **Bookmark Replacement**: Replace scattered bookmarks with organized sidebar
- **Theme Matching**: Choose theme that matches your work environment

### Performance Optimization

- **Selective Loading**: Only add sites you actively use
- **Memory Awareness**: Close Chrome completely occasionally to reset memory
- **Update Regularly**: Keep extension updated for latest optimizations
- **Browser Maintenance**: Clear cache and cookies periodically

---

## What's New in v1.1.0

### Major New Features
✅ **Dynamic Site Management**: Add, edit, delete, and reorder sites  
✅ **Light/Dark Theme System**: Choose your preferred appearance  
✅ **Advanced Settings Page**: Comprehensive configuration interface  
✅ **Backup/Restore**: Export and import your settings as JSON  
✅ **Drag & Drop Reordering**: Intuitive site organization  
✅ **Auto Favicon**: Automatic icon generation for custom sites

### Improvements from v1.0.0
✅ **Enhanced Session Persistence**: Better iframe state management  
✅ **Real-time Updates**: Changes apply instantly without restart  
✅ **Cloud Synchronization**: Settings sync across Chrome browsers  
✅ **Privacy Enhanced**: Removed Chinese services for better security  
✅ **Cleaner Interface**: Improved settings icon and layout

### Bug Fixes
✅ **Icon Display**: Fixed sizing issues with custom icons  
✅ **Theme Consistency**: Improved theme application across pages  
✅ **Storage Reliability**: More robust data saving and loading  
✅ **Performance**: Reduced memory usage and faster loading

---

## Coming Soon (v1.2.0 Preview)

### Planned Features
🔮 **Site Categories**: Organize sites by type (AI, Dev, Productivity)  
🔮 **Search Function**: Quickly filter your site collection  
🔮 **Keyboard Navigation**: Full keyboard shortcuts for power users  
🔮 **Custom Themes**: Create your own color schemes  
🔮 **Usage Statistics**: Track your most-used tools  
🔮 **Workspace Profiles**: Different site sets for work/personal

---

## Support & Community

### Getting Support
- **Documentation**: This guide covers most common scenarios
- **Developer Contact**: Visit support page for technical issues
- **Feature Requests**: Suggest improvements for future versions
- **Bug Reports**: Help improve Toolip by reporting issues

### Supporting Development
Toolip is developed and maintained by Woody Lee. If you find it helpful:

☕ **Buy a Coffee**: [buymeacoffee.com/woody.lee](https://buymeacoffee.com/woody.lee)  
⭐ **Rate Extension**: Leave positive review on Chrome Web Store  
📢 **Share**: Tell colleagues and friends about Toolip  
💡 **Contribute**: Suggest features and improvements

---

**Thank you for using Toolip! We hope it transforms your productivity and browsing experience.**

*Last updated: August 11, 2025 | Version 1.1.0*