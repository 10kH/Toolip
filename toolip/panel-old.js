const DEFAULT_URL = 'https://chatgpt.com';
const SIDEBAR_ITEMS = [
  {
    url: 'https://chatgpt.com',
    title: 'ChatGPT',
    icon: 'logos/chat_gpt.png',
  },
  {
    url: 'https://claude.ai/new',
    title: 'Claude',
    icon: 'logos/claude.png',
  },
  {
    url: 'https://gemini.google.com/app',
    title: 'Gemini',
    icon: 'logos/gemini.png',
  },
  {
    url: 'https://aistudio.google.com/',
    title: 'Google AI Studio',
    icon: 'logos/aistudio.png',
  },
  {
    url: 'https://grok.com',
    title: 'Grok',
    icon: 'logos/grok.png',
  },
  {
    url: 'https://www.perplexity.ai/',
    title: 'Perplexity',
    icon: 'logos/perplexity.png',
  },
  {
    url: 'https://www.kimi.com/',
    title: 'Kimi',
    icon: 'logos/kimi.png',
  },
  {
    url: 'https://chat.qwen.ai/',
    title: 'Qwen',
    icon: 'logos/qwen.png',
  },
  {
    url: 'https://chat.deepseek.com',
    title: 'Deepseek',
    icon: 'logos/deepseek.png',
  },
  {
    url: 'https://manus.im/app',
    title: 'Manus',
    icon: 'logos/manus.png',
  },
  {
    url: 'https://www.notion.so',
    title: 'Notion',
    icon: 'logos/notion.png',
  },
  {
    url: 'https://github.com',
    title: 'Github',
    icon: 'logos/github.png',
  },
  {
    url: 'https://huggingface.co/',
    title: 'Hugging Face',
    icon: 'logos/huggingface.png',
  },
  {
    url: 'https://colab.research.google.com/',
    title: 'Colab',
    icon: 'logos/colab.png',
  },
  {
    url: 'https://console.runpod.io/',
    title: 'RunPod',
    icon: 'logos/runpod.png',
  },
  {
    url: 'https://www.youtube.com',
    title: 'YouTube',
    icon: 'logos/youtube.png',
  },
  {
    url: 'https://music.youtube.com/',
    title: 'YouTube Music',
    icon: 'logos/youtube_music.png',
  },
  {
    url: 'https://www.buymeacoffee.com/woody.lee',
    title: 'Buy Me A Coffee',
    icon: 'logos/buy_me_a_coffee.png',
  },
];

let currentUrl = DEFAULT_URL;

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
  const links = document.querySelectorAll('#sidebar a');
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
  settingsLink.innerHTML = '⚙️';
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

// Fallback defaults
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
      id: 'github',
      url: 'https://github.com',
      title: 'GitHub',
      icon: 'logos/github.png'
    }
  ];
};

const loadState = async () => {
  // Load sites first
  await loadSites();
  
  // Create sidebar with loaded sites
  createSidebarItems(SIDEBAR_ITEMS);
  
  // Load saved URL or use default
  const savedUrl = localStorage.getItem('currentUrl');
  openLink(savedUrl || DEFAULT_URL);
};

document.addEventListener('DOMContentLoaded', () => {
  loadState();
});

// Listen for storage changes to refresh sidebar
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.toolip_sites) {
    loadState();
  }
});