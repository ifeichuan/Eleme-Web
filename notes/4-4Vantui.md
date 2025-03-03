## VantUI的特点

1. 性能
2. TypeScript编写 提供完整的类型定义
3. 支持Vue2/3 React 微信小程序
4. 支持按需引入和TreeShaking(只引入使用的代码)
5. 支持深色模式
6. 支持服务端渲染
7. 支持i18n

## 安装

```bash
npm install vant
pnpm add vant
yarn add vant
```

### 自动引入

安装 `pnpm add @vant/auto-import-resolver unplugin-vue-components unplugin-auto-import -D`

在`vite.config.ts`中引入

```ts
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

defineConfig({
	plugins: [
		AutoImport({
			resolvers: [VantResolver()],
		}),
		Components({
			resolvers: [VantResolver()],
		}),
	],
});
```

然后就可以自动引入了 通过`unplugin-vue-components`自动解析`template`并自动注册对应的组件

`@vant/auto-import-resolver` 会自动引入对应的组件样式。
