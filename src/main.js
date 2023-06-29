import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router'
import TDesign from 'tdesign-vue-next';
import service from "./utils/request.js";
import 'tdesign-vue-next/es/style/index.css';

createApp(App)
  .use(router)
  .use(TDesign)
  .mount('#app')
