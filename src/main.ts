import './assets/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './mock/index';
import App from './App.vue';
import router from './router';
import '@/assets/common.scss'
import 'vant/lib/index.css';
import lazyload from '@/directives/lazyLoading';
import { Skeleton } from 'vant';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(lazyload);
const rootValue = 16;
const rootWidth = 390;
console.log(Skeleton)
const devceWidth = document.documentElement.clientWidth;
document.documentElement.style.fontSize = (devceWidth * rootValue) / rootWidth + 'px';
app.mount('#app');
