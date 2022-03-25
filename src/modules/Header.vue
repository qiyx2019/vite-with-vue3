<template>
123
    <div>{{data}}</div>
</template>

<script lang="ts">
export default {
  data(){
    return {
      data:[]
    }
  }  ,
  methods:{

  },
  created(){
    
  },
  computed:{
    getData: {
      get: function() {
      return  this.data = [1,2,3]
      },
      set:function(param) {
        this.data = [1,2,3]
      }
    }
  }
}
</script>

<style>

</style>