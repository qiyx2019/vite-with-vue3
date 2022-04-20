import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import antDesign from 'ant-design-vue'
import { setupProdMockServer } from '../mockServer'
import 'ant-design-vue/dist/antd.css'
import * as Rx from 'rxjs'
import * as Options from 'rxjs/operators'
const getObservable = () => {
  let RXJS = {},
    operators = {}
  for (let [key, r] of Object.entries({ ...Rx })) {
    key = '$' + key
    RXJS = { ...RXJS, ...{ [key]: r } }
  }
  for (let [key, v] of Object.entries({ ...Options })) {
    key = '$' + key
    operators = { ...operators, ...{ [key]: v } }
  }
  return {...RXJS,...operators}
}
if (true) {
  setupProdMockServer()
}

const app = createApp(App)
app.config.globalProperties = {
  ...app.config.globalProperties,
  ...getObservable()
}
app.use(router).use(store).use(antDesign).mount('#app')
