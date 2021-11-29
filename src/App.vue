<script  lang="ts">
import { computed, defineComponent} from 'vue'
import {useState,useGetters,useMutations} from "./utils/hooks"

export default defineComponent({
  name:"main",
  setup(){
    const store =  useState(['count',"list"])
    const {increment} = useMutations(['increment']) as any
    return {
     ...store,
     increment
    }
  }
   
})
</script>

<template>
  <div>{{count}}</div>
  <button type="button" @click='increment'>button</button>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
