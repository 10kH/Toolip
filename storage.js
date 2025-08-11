// Storage management for Toolip sites
class ToolipStorage {
  static STORAGE_KEY = 'toolip_sites';
  static DEFAULT_SITES_KEY = 'toolip_default_sites';

  // Get user sites from storage or return defaults
  static async getSites() {
    try {
      const result = await chrome.storage.sync.get([this.STORAGE_KEY]);
      if (result[this.STORAGE_KEY] && result[this.STORAGE_KEY].length > 0) {
        return result[this.STORAGE_KEY];
      }
      return this.getDefaultSites();
    } catch (error) {
      console.error('Error loading sites:', error);
      return this.getDefaultSites();
    }
  }

  // Save sites to storage
  static async saveSites(sites) {
    try {
      await chrome.storage.sync.set({ [this.STORAGE_KEY]: sites });
      return true;
    } catch (error) {
      console.error('Error saving sites:', error);
      return false;
    }
  }

  // Get default sites configuration (원래 순서대로 복원)
  static getDefaultSites() {
    return [
      {
        id: 'chatgpt',
        url: 'https://chatgpt.com',
        title: 'ChatGPT',
        icon: 'logos/chat_gpt.png',
        category: 'ai'
      },
      {
        id: 'claude',
        url: 'https://claude.ai/new',
        title: 'Claude',
        icon: 'logos/claude.png',
        category: 'ai'
      },
      {
        id: 'gemini',
        url: 'https://gemini.google.com/app',
        title: 'Gemini',
        icon: 'logos/gemini.png',
        category: 'ai'
      },
      {
        id: 'aistudio',
        url: 'https://aistudio.google.com/',
        title: 'Google AI Studio',
        icon: 'logos/aistudio.png',
        category: 'ai'
      },
      {
        id: 'grok',
        url: 'https://grok.com',
        title: 'Grok',
        icon: 'logos/grok.png',
        category: 'ai'
      },
      {
        id: 'perplexity',
        url: 'https://www.perplexity.ai/',
        title: 'Perplexity',
        icon: 'logos/perplexity.png',
        category: 'ai'
      },
      {
        id: 'notion',
        url: 'https://www.notion.so',
        title: 'Notion',
        icon: 'logos/notion.png',
        category: 'productivity'
      },
      {
        id: 'github',
        url: 'https://github.com',
        title: 'Github',
        icon: 'logos/github.png',
        category: 'development'
      },
      {
        id: 'huggingface',
        url: 'https://huggingface.co/',
        title: 'Hugging Face',
        icon: 'logos/huggingface.png',
        category: 'development'
      },
      {
        id: 'colab',
        url: 'https://colab.research.google.com/',
        title: 'Colab',
        icon: 'logos/colab.png',
        category: 'development'
      },
      {
        id: 'runpod',
        url: 'https://console.runpod.io/',
        title: 'RunPod',
        icon: 'logos/runpod.png',
        category: 'development'
      },
      {
        id: 'youtube',
        url: 'https://www.youtube.com',
        title: 'YouTube',
        icon: 'logos/youtube.png',
        category: 'entertainment'
      },
      {
        id: 'youtube_music',
        url: 'https://music.youtube.com/',
        title: 'YouTube Music',
        icon: 'logos/youtube_music.png',
        category: 'entertainment'
      }
    ];
  }



  // Generate icon URL from domain
  static getAutoIcon(url) {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (error) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIxMiIgeT0iMTYiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Pz88L3RleHQ+Cjwvc3ZnPgo=';
    }
  }

  // Generate unique ID for site
  static generateId() {
    return 'site_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Reset to default sites
  static async resetToDefault() {
    const defaultSites = this.getDefaultSites();
    await this.saveSites(defaultSites);
    return defaultSites;
  }

  // Theme management
  static async getTheme() {
    try {
      const result = await chrome.storage.sync.get(['toolip_theme']);
      return result.toolip_theme || 'light';
    } catch (error) {
      return 'light';
    }
  }

  static async saveTheme(theme) {
    try {
      await chrome.storage.sync.set({ toolip_theme: theme });
      return true;
    } catch (error) {
      console.error('Error saving theme:', error);
      return false;
    }
  }

  // Export sites as JSON
  static async exportSites() {
    const sites = await this.getSites();
    const exportData = {
      version: '1.1.0',
      timestamp: new Date().toISOString(),
      sites: sites
    };
    return JSON.stringify(exportData, null, 2);
  }

  // Import sites from JSON
  static async importSites(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      if (data.sites && Array.isArray(data.sites)) {
        await this.saveSites(data.sites);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing sites:', error);
      return false;
    }
  }
}

// Make available globally
if (typeof window !== 'undefined') {
  window.ToolipStorage = ToolipStorage;
}