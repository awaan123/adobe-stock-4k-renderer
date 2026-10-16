import { Config } from '@remotion/cli/config';
import os from 'os';

// 4K 60fps Broadcast-Quality Master Configuration
Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setCrf(12); // Commercial-grade low compression
Config.setPixelFormat('yuv420p'); // Universal broadcast compatibility

// Platform-aware Chromium OpenGL renderer
if (os.platform() === 'win32') {
  Config.setChromiumOpenGlRenderer('angle');
} else {
  // Swiftshader software renderer for headless Linux cloud runners
  Config.setChromiumOpenGlRenderer('swiftshader');
}

Config.setConcurrency(Math.max(1, Math.floor(os.cpus().length / 2)));
