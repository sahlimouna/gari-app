import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gari.app',
  appName: 'Gari',
  webDir: 'public', 
  server: {
    url: 'http://YOUR_LOCAL_IP:3000',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;
