// Dynamic site loading from storage
let SIDEBAR_ITEMS = [];
let DEFAULT_URL = 'https://chatgpt.com';

// 각 사이트별 iframe 저장
const iframes = new Map();

const openLink = async (url = DEFAULT_URL) => {
  const previewContainer = document.getElementById('preview-render');
  
  // 기존 iframe들 숨기기
  iframes.forEach((iframe) => {
    iframe.style.display = 'none';
  });
  
  // 해당 URL의 iframe이 이미 있는지 확인
  let iframe = iframes.get(url);
  
  if (!iframe) {
    // 새 iframe 생성
    iframe = document.createElement('iframe');
    iframe.frameBorder = '0';
    iframe.allow = 'camera; clipboard-write; fullscreen; microphone; geolocation';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = url;
    
    previewContainer.appendChild(iframe);
    iframes.set(url, iframe);
  } else {
    // 기존 iframe 보이기
    iframe.style.display = 'block';
  }
  
  currentUrl = url;
  updateSidebarActiveState();
  saveState();
};

const updateSidebarActiveState = () => {
  const links = document.querySelectorAll('#sidebar a:not(.settings-btn)');
  links.forEach((link) => {
    if (link.href.includes(currentUrl)) {
      link.classList.add('active');
      link.classList.remove('un-active');
    } else {
      link.classList.add('un-active');
      link.classList.remove('active');
    }
  });
};

const createSidebarItems = (items) => {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = '';
  
  items.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.title = item.title;
    link.className = 'un-active';
    link.innerHTML = `<img src="${item.icon}" alt="${item.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiByeD0iNCIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIxNSIgeT0iMjAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Pz88L3RleHQ+Cjwvc3ZnPgo='" />`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLink(item.url);
    });
    sidebar.appendChild(link);
  });

  // Add settings button
  const settingsLink = document.createElement('a');
  settingsLink.href = '#';
  settingsLink.title = 'Settings';
  settingsLink.className = 'settings-btn';
  settingsLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334zM12 13.667c-1.012 0-1.834-.822-1.834-1.833s.822-1.834 1.834-1.834 1.833.823 1.833 1.834-.821 1.833-1.833 1.833z"/>
    <path d="M19.682 12.6l-1.904-.615c-.085-.404-.227-.786-.418-1.139l.985-1.732c.147-.258.122-.578-.064-.808l-1.273-1.273c-.23-.186-.55-.211-.808-.064l-1.732.985c-.353-.191-.735-.333-1.139-.418L12.714 5.6c-.043-.277-.267-.49-.548-.49h-1.799c-.281 0-.505.213-.548.49l-.615 1.904c-.404.085-.786.227-1.139.418l-1.732-.985c-.258-.147-.578-.122-.808.064L4.252 7.774c-.186.23-.211.55-.064.808l.985 1.732c-.191.353-.333.735-.418 1.139L2.851 12.068c-.277.043-.49.267-.49.548v1.799c0 .281.213.505.49.548l1.904.615c.085.404.227.786.418 1.139l-.985 1.732c-.147.258-.122.578.064.808l1.273 1.273c.23.186.55.211.808.064l1.732-.985c.353.191.735.333 1.139.418l.615 1.904c.043.277.267.49.548.49h1.799c.281 0 .505-.213.548-.49l.615-1.904c.404-.085.786-.227 1.139-.418l1.732.985c.258.147.578.122.808-.064l1.273-1.273c.186-.23.211-.55.064-.808l-.985-1.732c.191-.353.333-.735.418-1.139l1.904-.615c.277-.043.49-.267.49-.548v-1.799c0-.281-.213-.505-.49-.548z"/>
  </svg>`;
  settingsLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
  sidebar.appendChild(settingsLink);
};

const saveState = () => {
  localStorage.setItem('currentUrl', currentUrl);
};

// Load sites from storage
const loadSites = async () => {
  try {
    // Load storage utility
    if (typeof ToolipStorage === 'undefined') {
      await loadScript('storage.js');
    }
    
    // Get sites from storage
    SIDEBAR_ITEMS = await ToolipStorage.getSites();
    
    // Set default URL to first site
    if (SIDEBAR_ITEMS.length > 0) {
      DEFAULT_URL = SIDEBAR_ITEMS[0].url;
    }
    
    return SIDEBAR_ITEMS;
  } catch (error) {
    console.error('Error loading sites:', error);
    // Fallback to hardcoded default if storage fails
    SIDEBAR_ITEMS = getHardcodedDefaults();
    return SIDEBAR_ITEMS;
  }
};

// Load external script
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

  // Fallback defaults (원래 사이트 모두 포함)
const getHardcodedDefaults = () => {
  return [
    {
      id: 'chatgpt',
      url: 'https://chatgpt.com',
      title: 'ChatGPT',
      icon: 'logos/chat_gpt.png'
    },
    {
      id: 'claude',
      url: 'https://claude.ai/new',
      title: 'Claude',
      icon: 'logos/claude.png'
    },
    {
      id: 'gemini',
      url: 'https://gemini.google.com/app',
      title: 'Gemini',
      icon: 'logos/gemini.png'
    },
    {
      id: 'aistudio',
      url: 'https://aistudio.google.com/',
      title: 'Google AI Studio',
      icon: 'logos/aistudio.png'
    },
    {
      id: 'grok',
      url: 'https://grok.com',
      title: 'Grok',
      icon: 'logos/grok.png'
    },
    {
      id: 'perplexity',
      url: 'https://www.perplexity.ai/',
      title: 'Perplexity',
      icon: 'logos/perplexity.png'
    },
    {
      id: 'kimi',
      url: 'https://www.kimi.com/',
      title: 'Kimi',
      icon: 'logos/kimi.png'
    },
    {
      id: 'qwen',
      url: 'https://chat.qwen.ai/',
      title: 'Qwen',
      icon: 'logos/qwen.png'
    },
    {
      id: 'deepseek',
      url: 'https://chat.deepseek.com',
      title: 'Deepseek',
      icon: 'logos/deepseek.png'
    },
    {
      id: 'manus',
      url: 'https://manus.im/app',
      title: 'Manus',
      icon: 'logos/manus.png'
    },
    {
      id: 'notion',
      url: 'https://www.notion.so',
      title: 'Notion',
      icon: 'logos/notion.png'
    },
    {
      id: 'github',
      url: 'https://github.com',
      title: 'Github',
      icon: 'logos/github.png'
    },
    {
      id: 'huggingface',
      url: 'https://huggingface.co/',
      title: 'Hugging Face',
      icon: 'logos/huggingface.png'
    },
    {
      id: 'colab',
      url: 'https://colab.research.google.com/',
      title: 'Colab',
      icon: 'logos/colab.png'
    },
    {
      id: 'runpod',
      url: 'https://console.runpod.io/',
      title: 'RunPod',
      icon: 'logos/runpod.png'
    },
    {
      id: 'youtube',
      url: 'https://www.youtube.com',
      title: 'YouTube',
      icon: 'logos/youtube.png'
    },
    {
      id: 'youtube_music',
      url: 'https://music.youtube.com/',
      title: 'YouTube Music',
      icon: 'logos/youtube_music.png'
    }
  ];
};

const loadState = async () => {
  // Load sites first
  await loadSites();
  
  // Load and apply theme
  await loadTheme();
  
  // Create sidebar with loaded sites
  createSidebarItems(SIDEBAR_ITEMS);
  
  // Load saved URL or use default
  const savedUrl = localStorage.getItem('currentUrl');
  openLink(savedUrl || DEFAULT_URL);
};

// Load and apply theme
const loadTheme = async () => {
  try {
    if (typeof ToolipStorage !== 'undefined') {
      const theme = await ToolipStorage.getTheme();
      document.body.className = theme + '-theme';
    }
  } catch (error) {
    console.error('Error loading theme:', error);
    document.body.className = 'light-theme';
  }
};

let currentUrl = DEFAULT_URL;

document.addEventListener('DOMContentLoaded', () => {
  loadState();
});

// Listen for storage changes to refresh sidebar
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.toolip_sites) {
      loadState();
    }
    if (changes.toolip_theme) {
      loadTheme();
    }
  }
});

// Listen for theme change messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'themeChanged') {
    document.body.className = message.theme + '-theme';
  }
});