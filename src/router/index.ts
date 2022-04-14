import {createRouter,createWebHashHistory,RouteRecordRaw} from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path:"/",
    name:"home",
    //@ts-ignore
    component:()=>import('@/modules/main/index.tsx')
  }
] 
const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router;