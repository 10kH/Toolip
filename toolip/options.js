// Toolip Options Page
class ToolipOptions {
  constructor() {
    this.sites = [];
    this.draggedItem = null;
    this.init();
  }

  async init() {
    // Load storage utility
    await this.loadScript('storage.js');
    
    // Load current sites
    await this.loadSites();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Render sites list
    this.renderSitesList();
  }

  async loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  async loadSites() {
    this.sites = await ToolipStorage.getSites();
    await this.loadTheme();
  }

  async loadTheme() {
    const theme = await ToolipStorage.getTheme();
    document.getElementById(`theme-${theme}`).checked = true;
    document.body.className = theme + '-theme';
  }

  setupEventListeners() {
    // Add site button
    document.getElementById('add-site-btn').addEventListener('click', () => this.addSite());
    
    // Auto-detect icon
    document.getElementById('auto-icon-btn').addEventListener('click', () => this.autoDetectIcon());
    
    // Upload custom icon
    document.getElementById('upload-icon-btn').addEventListener('click', () => {
      document.getElementById('custom-icon').click();
    });
    
    document.getElementById('custom-icon').addEventListener('change', (e) => this.handleCustomIcon(e));
    
    // Icon URL input
    document.getElementById('icon-url').addEventListener('input', (e) => this.previewIconUrl(e.target.value));
    
    // Site URL input for auto-detection
    document.getElementById('site-url').addEventListener('input', (e) => {
      if (e.target.value) {
        this.autoFillSiteInfo(e.target.value);
      }
    });
    

    
    // Import/Export
    document.getElementById('export-btn').addEventListener('click', () => this.exportSettings());
    document.getElementById('import-btn').addEventListener('click', () => {
      document.getElementById('import-file').click();
    });
    document.getElementById('import-file').addEventListener('change', (e) => this.importSettings(e));
    
    // Reset
    document.getElementById('reset-btn').addEventListener('click', () => this.resetToDefault());
    
    // Theme change
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
      radio.addEventListener('change', (e) => this.changeTheme(e.target.value));
    });

    // Save/Cancel
    document.getElementById('save-btn').addEventListener('click', () => this.saveSettings());
    document.getElementById('cancel-btn').addEventListener('click', () => this.cancelChanges());
  }

  renderSitesList() {
    const container = document.getElementById('sites-list');
    container.innerHTML = '';

    this.sites.forEach((site, index) => {
      const siteElement = this.createSiteElement(site, index);
      container.appendChild(siteElement);
    });
  }

  createSiteElement(site, index) {
    const div = document.createElement('div');
    div.className = 'site-item';
    div.draggable = true;
    div.dataset.index = index;

    div.innerHTML = `
      <img src="${site.icon}" alt="${site.title}" class="site-icon" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIxMiIgeT0iMTYiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Pz88L3RleHQ+Cjwvc3ZnPgo='">
      <div class="site-info">
        <div class="site-name">${site.title}</div>
        <div class="site-url">${site.url}</div>
      </div>
      <div class="site-actions">
        <button class="edit-btn" onclick="toolipOptions.editSite(${index})">✏️</button>
        <button class="delete-btn" onclick="toolipOptions.deleteSite(${index})">🗑️</button>
      </div>
    `;

    // Drag and drop
    div.addEventListener('dragstart', (e) => this.handleDragStart(e, index));
    div.addEventListener('dragover', (e) => this.handleDragOver(e));
    div.addEventListener('drop', (e) => this.handleDrop(e, index));
    div.addEventListener('dragend', () => this.handleDragEnd());

    return div;
  }

  async addSite() {
    const url = document.getElementById('site-url').value.trim();
    const name = document.getElementById('site-name').value.trim();
    const iconUrl = document.getElementById('icon-url').value.trim();

    if (!url || !name) {
      alert('Please fill in both URL and name fields.');
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      alert('Please enter a valid URL.');
      return;
    }

    const newSite = {
      id: ToolipStorage.generateId(),
      url: url,
      title: name,
      icon: iconUrl || ToolipStorage.getAutoIcon(url),
      category: 'custom'
    };

    this.sites.push(newSite);
    this.renderSitesList();
    this.clearAddForm();
  }

  editSite(index) {
    const site = this.sites[index];
    document.getElementById('site-url').value = site.url;
    document.getElementById('site-name').value = site.title;
    document.getElementById('icon-url').value = site.icon;
    this.previewIconUrl(site.icon);
    
    // Remove the site and let user re-add it
    this.deleteSite(index);
  }

  deleteSite(index) {
    if (confirm('Are you sure you want to remove this site?')) {
      this.sites.splice(index, 1);
      this.renderSitesList();
    }
  }

  autoDetectIcon() {
    const url = document.getElementById('site-url').value.trim();
    if (!url) {
      alert('Please enter a URL first.');
      return;
    }

    try {
      const iconUrl = ToolipStorage.getAutoIcon(url);
      document.getElementById('icon-url').value = iconUrl;
      this.previewIconUrl(iconUrl);
    } catch (error) {
      alert('Could not auto-detect icon for this URL.');
    }
  }

  async autoFillSiteInfo(url) {
    try {
      const domain = new URL(url).hostname;
      const siteName = domain.replace('www.', '').split('.')[0];
      const capitalizedName = siteName.charAt(0).toUpperCase() + siteName.slice(1);
      
      if (!document.getElementById('site-name').value) {
        document.getElementById('site-name').value = capitalizedName;
      }
      
      if (!document.getElementById('icon-url').value) {
        const iconUrl = ToolipStorage.getAutoIcon(url);
        document.getElementById('icon-url').value = iconUrl;
        this.previewIconUrl(iconUrl);
      }
    } catch (error) {
      // Invalid URL, ignore
    }
  }

  handleCustomIcon(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      document.getElementById('icon-url').value = dataUrl;
      this.previewIconUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  previewIconUrl(url) {
    const preview = document.getElementById('preview-icon');
    if (url) {
      preview.src = url;
      preview.style.display = 'block';
    } else {
      preview.style.display = 'none';
    }
  }



  async exportSettings() {
    try {
      const exportData = await ToolipStorage.exportSites();
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `toolip-settings-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to export settings.');
    }
  }

  async importSettings(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const success = await ToolipStorage.importSites(text);
      
      if (success) {
        await this.loadSites();
        this.renderSitesList();
        alert('Settings imported successfully!');
      } else {
        alert('Invalid settings file.');
      }
    } catch (error) {
      alert('Failed to import settings.');
    }
  }

  async resetToDefault() {
    if (!confirm('Reset to default sites? This will remove all your custom sites.')) return;

    this.sites = await ToolipStorage.resetToDefault();
    this.renderSitesList();
  }

  async saveSettings() {
    try {
      await ToolipStorage.saveSites(this.sites);
      
      // Show success message
      const saveBtn = document.getElementById('save-btn');
      const originalText = saveBtn.textContent;
      saveBtn.textContent = '✅ Saved!';
      saveBtn.style.background = '#27ae60';
      
      setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
      }, 2000);
      
    } catch (error) {
      alert('Failed to save settings.');
    }
  }

  async cancelChanges() {
    if (confirm('Discard changes and reload original settings?')) {
      await this.loadSites();
      this.renderSitesList();
      this.clearAddForm();
    }
  }

  async changeTheme(theme) {
    await ToolipStorage.saveTheme(theme);
    // Apply theme immediately to current page
    document.body.className = theme + '-theme';
    
    // Notify main panel to update theme
    chrome.runtime.sendMessage({type: 'themeChanged', theme: theme});
  }

  clearAddForm() {
    document.getElementById('site-url').value = '';
    document.getElementById('site-name').value = '';
    document.getElementById('icon-url').value = '';
    document.getElementById('preview-icon').style.display = 'none';
  }

  // Drag and Drop functionality
  handleDragStart(e, index) {
    this.draggedItem = index;
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  handleDrop(e, targetIndex) {
    e.preventDefault();
    
    if (this.draggedItem === null || this.draggedItem === targetIndex) return;

    // Reorder array
    const draggedSite = this.sites[this.draggedItem];
    this.sites.splice(this.draggedItem, 1);
    this.sites.splice(targetIndex, 0, draggedSite);

    this.renderSitesList();
  }

  handleDragEnd() {
    this.draggedItem = null;
    document.querySelectorAll('.site-item').forEach(item => {
      item.classList.remove('dragging');
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.toolipOptions = new ToolipOptions();
});