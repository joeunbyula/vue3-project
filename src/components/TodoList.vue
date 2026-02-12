<template>

    <div 
      class="card mt-2"
      v-for="(todo, index) in todos"
      :key="todo.id"
    >
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <!-- <input 
            class="form-check-input" 
            type="checkbox"
            v-model="todo.completed"
            > -->
         <!-- props는 one-way여서 자식에서 부모의 값을 변경시킬 수 없다. -->
         <input 
            class="form-check-input" 
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index)"
         > 
          <!-- <label 
            class="form-check-label"
            :style="todo.completed? todoStyle : {}"
          > -->
          <label 
            class="form-check-label"
            :class="{ todo: todo.completed }"
          >
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click="onDelete(index)"
            >
            Delete
          </button>
        </div>       
      </div>
    </div>   
</template>

<script>

    export default {
        props: {
            todos: {
                type: Array,
                required: true //필수여부
            }
        }, 
        emits: ['toggle-todo, delete-todo'],
        setup(props, { emit }) {

            const onDelete = (index) => {
                emit('delete-todo', index)
            }

            const toggleTodo = (index) => {
                emit('toggle-todo', index);
            }   
            
            return {
                onDelete,
                toggleTodo
            }

        }
    }
</script>

<style>

</style>