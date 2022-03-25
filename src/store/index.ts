import { createStore } from "vuex";
import {getData} from  "../servers/main.server"
const defaultState = {
  count:0,
  list:[]
}

const store = createStore({
  state() {
    return {
      count:110,
      list:[]
    }
  },
  mutations:{
    increment: (state :typeof defaultState)=> {
      state.count++
    },
    updateList: (state,payload)=> {
      state.list = payload
    }
  },
  actions:{
    getData: async({commit,state})=> {
      let {code,message,data} = await getData();
      console.log(code,data)
      if(code==0) {
         commit({
           type:"updateList",
           payload:data
         })
      }
    }
  }
})

export default store;