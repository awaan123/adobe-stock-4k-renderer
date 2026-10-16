import { Config } from '@remotion/cli/config';

// 4K 60fps Broadcast-Quality Master Configuration
Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setCrf(12); // Commercial-grade low compression
Config.setPixelFormat('yuv420p'); // Universal broadcast compatibility
Config.setChromiumOpenGlRenderer('angle');
Config.setConcurrency(Math.max(1, Math.floor(require('os').cpus().length / 2)));
