import { fileURLToPath, URL } from 'node:url';
// import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { defineConfig } from 'vite';
import pxtorem from 'postcss-pxtorem';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vite.dev/config/
export default defineConfig({

  base: '/',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 16,
          propList: ['*'],
          selectorBlackList: [':root'], // CSS选择器黑名单，防止部分选择器被转换
          exclude: /\/node_modules\//i, //防止文件转
        }),
      ],
    },
  },
  publicDir: 'public',  // 修改这里，移除开头的斜杠
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
  // server: {
  // 	proxy: {
  // 		api: {
  // 			target: 'http://localhost:5173',
  // 			changeOrigin: true,
  // 			bypass: (req) => {
  // 				if (req.url === '/api/user') return req.url;
  // 			},
  // 		},
  // 	},
  // },
});
