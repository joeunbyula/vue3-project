<template>
  <!-- v-show는 조건 상관없이 전부 랜더링 후 display none,block-->
  <!-- v-if는 조건에 맞는 부분만 랜더링, -->
  <!-- <div v-if="toggle">true</div>
  <div v-else>false</div>
  <button @click="onToggle">Toggle</button> -->
  <div class="container">
  <h1>To-Do List</h1>
   <!-- e.preventDefault() == @submit.prevent -->
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
            <input 
            class="form-control"
            type="text" 
            v-model="todo"
            placeholder="Type new to-do"
          >
        </div>
        <div>
          <button 
            class="btn btn-primary"
            type="submit"
          >
            Add
          </button>
         </div>
      </div>   
      <div v-show="hasError" style="color:red">The field cannot be empty</div>
    </form>
    <div 
      class="card mt-2"
      v-for="todo in todos"
      :key="todo.id"
    >
      <div class="card-body p-2">
        {{ todo.subject }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
  export default {
    setup() {
      const toggle = ref(false);
      const todo = ref('');
      
      const todos = ref([ 
        { id:1, subject:'휴대폰 사기' },
        { id:2, subject:'장보기' }
      ]);

      const hasError = ref(false);
    
      const onSubmit = () => {
        //e.preventDefault();

        if(!todo.value.length) {
          hasError.value = true;
          return;
        } 

        hasError.value = false;
        todos.value.push({
          id: Date.now(),
          subject : todo.value
        });
        todo.value = '';
      };
      
      const onToggle = () => {
        toggle.value = !toggle.value;
      }

      return {
        todo,
        todos,
        hasError,
        onSubmit,
        onToggle
      }
    }
  }
</script>

<style>
  .name {
    color: slateblue;
  }
</style>

