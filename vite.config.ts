import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve} from "path"
import {viteMockServe} from "vite-plugin-mock"
import JSX from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),JSX(),
    viteMockServe({ 
      supportTs: true,
      mockPath: 'mock',
      localEnabled: true,
        
    })
  ],
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  },
  server:{
    port:3000,
    open:true,
    // proxy:{ 
    //   '/api':{
    //     target:'http://localhost:3000/',
    //     changeOrigin:true,
    //     rewrite:(path)=>path.replace(/^\/api/, '')
    //   }
    // }
  }
})
