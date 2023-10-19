import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'TextEx',
  description: '',
  version: '1.0.0',
  manifest_version: 3,
  icons: {
    '16': 'img/textexlogo-16.png',
    '32': 'img/textexlogo-32.png',
    '48': 'img/textexlogo-48.png',
    '128': 'img/textexlogo-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/textexlogo.jpg',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.ts', 'src/content/testfile.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'img/textexlogo-16.png',
        'img/textexlogo-32.png',
        'img/textexlogo-48.png',
        'img/textexlogo-128.png',
      ],
      matches: [],
    },
  ],
  permissions: ['scripting', 'activeTab', 'contextMenus'],
  host_permissions: ['<all_urls>'],
})
