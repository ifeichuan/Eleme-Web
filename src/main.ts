import './assets/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './mock/index';
import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';
const app = createApp(App);

app.use(createPinia());
app.use(router);
const rootValue = 16;
const rootWidth = 390;
const devceWidth = document.documentElement.clientWidth;
document.documentElement.style.fontSize = (devceWidth * rootValue) / rootWidth + 'px';
app.mount('#app');
