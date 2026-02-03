<template>
  <div class="name">
    {{ name }} / {{ object.id }}
  </div>
  <button 
    class="btn btn-primary"
    v-on:click="updateName"
  >click
  </button>
</template>

<script>
import { ref,reactive } from 'vue';
  export default {
    setup() {
      /**
       * let을 사용하면 값을 변경할지라도
       * 화면에서는 update가 안된다.
       * 그래서 ref 사용한다.
       * 숫자, string, object 등 어떠한 타입에도 가능하다.
       */
      const name = ref('eunbyul is me!');

      /**
       * reactive는 object나 array, Map, set에 사용가능하며,
       * value로 접근하지않아도된다.
      */
      const object = reactive({
        id: 1
      })

      // const greeting = (name) => {
      //   return 'Hello! ' + name;
      // };

      // const greet = greeting(name);

      const updateName = () => {
        //let과 다르게 ref는 .value로 접근하여 값을 변경해줘야함.
        name.value = 'eunbyul !!';
        object.id = 2;
        console.log(name.value+"/"+object.id);
      }
      return {
        name,
        object,
        updateName
        // greet,
        // greeting
      }
    }
  }
</script>

<style>
  .name {
    color: slateblue;
  }
</style>

