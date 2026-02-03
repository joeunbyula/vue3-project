<template>
  <!-- v-bind: => : 로 표기-->
  <div :class="nameClass">
    {{ name }} 
  </div>
  <input :type="type" :value="name"/>
  <!-- v-on: => @로 표기-->
  <button 
    class="btn btn-primary"
    @click="updateName"
  >click
  </button>
</template>

<script>
import { ref } from 'vue';
  export default {
    setup() {
      /**
       * let을 사용하면 값을 변경할지라도
       * 화면에서는 update가 안된다.
       * 그래서 ref 사용한다.
       * 숫자, string, object 등 어떠한 타입에도 가능하다.
       */
      const name = ref('eunbyul is me!');
      const type = ref('number');
      const nameClass = ref('name');

    
      const updateName = () => {
        //let과 다르게 ref는 .value로 접근하여 값을 변경해줘야함.
        name.value = 'eunbyul !!';
        type.value = 'text';
        nameClass.value = 'skyblue';
      }
      return {
        name,
        type,
        nameClass,
        updateName
      }
    }
  }
</script>

<style>
  .name {
    color: slateblue;
  }

  .skyblue {
    color: skyblue;
  }
</style>

