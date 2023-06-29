import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 去除请求路径中的 '/api' 前缀
      }
    }
  }
});
