import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index'
import TDesign from 'tdesign-vue-next';
import api from './api/index'
import 'tdesign-vue-next/es/style/index.css';
console.log(api);
const app = createApp(App)
app.use(router)
  .use(TDesign)
  .mount('#app')
app.config.globalProperties.$api = api