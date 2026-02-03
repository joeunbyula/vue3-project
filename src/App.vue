<template>
  <!-- 양방향바인딩 v1 -->
  <!-- <input 
    type="text" 
    :value="name"
    @input="updateName"
  > -->
  <!-- 양방향 바인딩 : v-model 사용 -->
  <input 
    type="text" 
    v-model="name"
  >
  <button 
    class="btn btn-primary"
    @click="onSubmit"
  >click
  </button>
</template>

<script>
import { ref } from 'vue';
  export default {
    setup() {
      const name = ref('eunbyul is me!');
    
      const onSubmit = () => {
        console.log(name.value);
      };

      //양방향바인딩 v1
      // const updateName = (e) => {
      //   name.value = e.target.value;
      // };

      return {
        name,
        onSubmit,
        //updateName //양방향바인딩 v1
      }
    }
  }
</script>

<style>
  .name {
    color: slateblue;
  }
</style>

