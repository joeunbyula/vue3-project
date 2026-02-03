<template>
  <div class="name">
    {{ greet }}
  </div>

  <!-- <div class="name">
    //함수쓰는법!
    {{ greeting(name) }}
  </div> -->

</template>

<script>
  export default {
    setup() {
      const name = 'eunbyul is me!';

      const greeting = (name) => {
        return 'Hello! ' + name;
      };

      const greet = greeting(name);

      return {
        name,
        greet,
        greeting
      }
    }
  }
</script>

<style>
  .name {
    color: slateblue;
  }
</style>

