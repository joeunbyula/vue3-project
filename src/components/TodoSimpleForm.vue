<template>
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
</template>

<script>

import { ref } from 'vue';
export default {
    emits: ['add-todo'],
    setup(props, { emit }) {
        const todo = ref('');
        const hasError = ref(false);

        const onSubmit = () => {
            
            if(!todo.value.length) {
                hasError.value = true;
                return;
            } 
            hasError.value = false;

            //부모 컴포넌트로 이벤트를 보냄
            emit('add-todo', {
                 id: Date.now(),
                 subject : todo.value,
                 completed: false
            }); 
            todo.value = '';

      };

        return {
            todo,
            hasError,
            onSubmit
        }
    }
}
</script>

<style>

</style>