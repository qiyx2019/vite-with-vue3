import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from './store/index'
import antDesign from "ant-design-vue"
import { setupProdMockServer } from '../mockServer'
import "ant-design-vue/dist/antd.css";
if(true){
  setupProdMockServer()
}
createApp(App)
.use(router)
.use(store)
.use(antDesign)
.mount('#app')
