import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            // 对接 kratos-self 后端
            target: 'http://localhost:18800',
            ws: true,
          },
        },
      },
    },
  };
});
