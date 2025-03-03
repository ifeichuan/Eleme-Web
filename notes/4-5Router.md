页面路由

`<RouterLink>` 渲染为`<a>`链接 并带有指定视图组件的路径

## Router配置

```ts
import TabsView from '@/views/tabs/TabsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
        {
            // 自动跳转到home
            path:"/",
            redirect: '/tabs/home',
        }
		{
			path: '/tabs',
            // 路由名称 在Push时可以使用 push{name:name}
			name: 'tabs',
			component: TabsView,
		},
	],
});

export default router;
```

## 目录结构

`/views/tabs` 存放关于Tabbar底部导航的视图
