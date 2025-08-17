# 🌷 Toolip - AI Tools & Website Hub

> Access your favorite AI tools and websites instantly from one convenient sidebar. Built for developers and productivity enthusiasts.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen?logo=google-chrome)](https://chromewebstore.google.com/detail/toolip/mpbdcbhlbjomcpiddlngknopajjfnmcg)
[![Version](https://img.shields.io/badge/Version-1.1.0-blue)](./TECHNICAL_DOCUMENTATION.md)
[![License](https://img.shields.io/badge/License-MIT-yellow)](#license)
[![Developer](https://img.shields.io/badge/Developer-Woody%20Lee-purple)](https://buymeacoffee.com/woody.lee)

## ✨ What is Toolip?

Toolip is a sophisticated Chrome extension that transforms your browsing experience by providing instant access to your favorite AI tools, development resources, and productivity websites through a sleek sidebar interface. No more bookmark hunting or tab switching—everything you need is just one click away.

### 🎯 Key Features

- **🚀 Instant Access**: One-click launch from persistent sidebar
- **💾 Session Persistence**: Each site maintains its state between visits
- **⚙️ Dynamic Management**: Add, edit, remove, and reorder sites
- **🎨 Theme System**: Light/Dark mode with real-time switching
- **☁️ Cloud Sync**: Settings synchronize across Chrome browsers
- **📦 Backup/Restore**: Export/import your configuration

## 🚀 Quick Start

### Installation

#### Chrome Web Store

1. Visit [Chrome Web Store (Toolip)](https://chromewebstore.google.com/detail/toolip/mpbdcbhlbjomcpiddlngknopajjfnmcg)
2. Click "Add to Chrome"
3. Grant necessary permissions
4. Look for Toolip icon in your toolbar

#### Manual Installation

```bash
# Clone this repository
git clone https://github.com/10kH/toolip.git

# Or download the ZIP file and extract it
```

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked" and select the `toolip` folder
4. Extension will appear in your toolbar

### First Use

1. **Open Sidebar**: Click Toolip icon or press `Ctrl+M` (`Cmd+M` on Mac)
2. **Explore Sites**: Click any icon to open that website
3. **Customize**: Click gear icon (⚙️) to access settings
4. **Add Sites**: Use the settings page to add your favorite tools

## 🌟 Default Site Collection

Toolip comes with 13 carefully curated websites:

### 🤖 AI Tools (6 sites)

- **ChatGPT** - OpenAI's conversational AI
- **Claude** - Anthropic's AI assistant
- **Gemini** - Google's multimodal AI
- **Google AI Studio** - AI development platform
- **Grok** - X's AI chatbot with real-time data
- **Perplexity** - AI-powered search engine

### 🛠️ Development & Productivity (5 sites)

- **Notion** - All-in-one workspace
- **GitHub** - Code repository hosting
- **Hugging Face** - Machine learning model hub
- **Google Colab** - Cloud Jupyter notebooks
- **RunPod** - GPU cloud computing

### 🎵 Entertainment (2 sites)

- **YouTube** - Video streaming platform
- **YouTube Music** - Music streaming service

## 🔧 Technical Overview

### Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Background    │    │   Side Panel    │    │  Options Page   │
│   Service       │◄──►│   (Main UI)     │◄──►│   (Settings)    │
│   Worker        │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Tech Stack

- **Framework**: Chrome Extension Manifest V3
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Storage**: Chrome Storage Sync API + localStorage
- **Icons**: PNG/SVG with automatic fallbacks
- **Build**: No build process required

### Key Features Implementation

#### Session Persistence

```javascript
// Individual iframe management for state preservation
const iframes = new Map();

const openLink = async (url) => {
  // Hide all existing iframes
  iframes.forEach(iframe => iframe.style.display = 'none');
  
  // Show or create iframe for the URL
  let iframe = iframes.get(url);
  if (!iframe) {
    iframe = createNewIframe(url);
    iframes.set(url, iframe);
  } else {
    iframe.style.display = 'block';
  }
};
```

#### Dynamic Site Management

```javascript
// Real-time site collection updates
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.toolip_sites) {
    loadSites();
    renderSidebar();
  }
});
```

#### Theme System

```javascript
// Instant theme switching
const changeTheme = async (theme) => {
  await ToolipStorage.saveTheme(theme);
  document.body.className = theme + '-theme';
  chrome.runtime.sendMessage({type: 'themeChanged', theme});
};
```

## 📁 Project Structure

```
toolip/
├── manifest.json              # Extension configuration
├── background.js              # Background service worker
├── panel.html/js/css          # Main sidebar interface
├── options.html/js/css        # Settings page
├── storage.js                 # Data management utility
├── removeHeader.json          # iframe embedding rules
├── images/                    # Extension icons (16-128px)
├── logos/                     # Website favicons
└── docs/
    ├── TECHNICAL_DOCUMENTATION.md    # Complete technical specs
    ├── TECHNICAL_DOCUMENTATION_KR.md # Korean technical docs
    ├── USER_GUIDE.md                 # User manual
    └── USER_GUIDE_KR.md             # Korean user manual
```

## 🎨 Customization

### Adding New Sites

1. Open settings (gear icon in sidebar)
2. Enter website URL and display name
3. Optionally add custom icon URL
4. Sites are automatically synced across devices

### Theme Customization

- **Light Mode**: Clean, professional appearance for daytime use
- **Dark Mode**: Reduced eye strain for low-light environments
- **Instant Switch**: Changes apply immediately without restart

### Backup & Restore

```json
// Export format
{
  "version": "1.1.0",
  "timestamp": "2025-08-11T...",
  "sites": [...],
  "theme": "light",
  "metadata": {...}
}
```

## 🔒 Privacy & Security

### Data Handling

- **Local First**: Session data stored locally on your device
- **Chrome Sync**: Settings synced via Google's secure infrastructure
- **No Third-Party Servers**: Extension doesn't send data externally
- **Minimal Data**: Only essential information stored

### Permissions Explained

- **`sidePanel`**: Display the main sidebar interface
- **`storage`**: Save your site collection and preferences
- **`declarativeNetRequestWithHostAccess`**: Allow iframe embedding
- **`contextMenus`**: Right-click menu integration
- **`<all_urls>`**: Access any website you add to collection

## 🚀 Version History

### v1.1.0 (August 11, 2025) - Current

**Major Release: Dynamic Management & Theme System**

✅ **New Features**:

- Dynamic site management (add/edit/delete/reorder)
- Light/Dark theme system with real-time switching
- Advanced settings page
- Backup/restore functionality
- Drag & drop reordering
- Auto favicon integration

✅ **Improvements**:

- Enhanced session persistence
- Real-time updates
- Cloud synchronization
- Privacy enhanced (removed Chinese services)
- Cleaner interface

### v1.0.0 (August 10, 2025)

**Initial Release: Core Foundation**

✅ **Foundation Features**:

- Sidebar interface with website navigation
- Session persistence system
- Custom branding and professional UI
- Chrome Web Store ready

## 🛠️ Development

### Prerequisites

- **Chrome**: 88+ (Manifest V3 support)
- **Node.js**: Optional (for development tools)
- **Git**: For version control

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/toolip.git
cd toolip

# Load in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select the toolip folder
```

### Development Workflow

1. **Make Changes**: Edit files in your preferred editor
2. **Test Locally**: Reload extension in Chrome
3. **Debug**: Use Chrome DevTools + Extension Inspector
4. **Package**: Create ZIP file for distribution

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Performance

### Metrics

- **Memory Usage**: ~10-15MB base + active iframes
- **CPU Impact**: Minimal (<1% average)
- **Storage**: <1MB for extension + user data
- **Load Time**: <200ms initial load

### Optimization

- Efficient iframe management (hide/show vs reload)
- Lazy loading for better performance
- Minimal DOM manipulation
- Chrome Storage API for cloud sync

## 🐛 Troubleshooting

### Common Issues

**Sites not loading?**

- Some websites block iframe embedding (security feature)
- Check internet connection
- Try refreshing the extension

**Settings not saving?**

- Ensure Chrome sync is enabled
- Check available storage space
- Try manual export/import

**Theme not applying?**

- Update Chrome to latest version
- Refresh extension pages
- Check for conflicting extensions

**Performance issues?**

- Close unused sites in sidebar
- Restart Chrome browser
- Reduce number of sites temporarily

### Getting Help

1. Check the [User Guide](./USER_GUIDE.md) for detailed instructions
2. Review [Technical Documentation](./TECHNICAL_DOCUMENTATION.md) for implementation details
3. Search existing issues on GitHub
4. Create a new issue with detailed information

## 🤝 Support

### Community

- **Documentation**: Comprehensive guides available
- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Share tips and use cases

### Professional Support

For business inquiries or custom development:

- **Email**: writerwoody@gmail.com
- **Support**: Buy me a coffee to support development

## ☕ Support Development

If Toolip enhances your productivity, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-☕-orange?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://buymeacoffee.com/woody.lee)

Your support helps:

- 🔧 Maintain and improve existing features
- ✨ Develop new functionality
- 🐛 Fix bugs and issues
- 📚 Create better documentation

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Woody Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🏷️ Tags

`chrome-extension` `productivity` `ai-tools` `sidebar` `javascript` `manifest-v3` `developer-tools` `browser-extension` `workflow` `automation`

---

## 📞 Contact

- **Developer**: [Woody Lee](https://www.linkedin.com/in/writerwoody/)
- **GitHub**: [10kH](https://github.com/10kH)
- **Support**: [Buy me a coffee](https://buymeacoffee.com/woody.lee)
- **Extension Page**: [Chrome Web Store (Toolip)](https://chromewebstore.google.com/detail/toolip/mpbdcbhlbjomcpiddlngknopajjfnmcg)

---

**⭐ Star this repository if Toolip helps boost your productivity!**

*Built with ❤️ for developers and productivity enthusiasts*

*Last updated: August 11, 2025 | Version 1.1.0*
