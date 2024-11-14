import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Te Llevo!',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Geolocation: {
      enabled: true
    }
  }
};

export default config;