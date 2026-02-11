<template>
  <div class="container">
  <h4>Count: {{ count }}</h4>
  <h4>double Count computed : {{ doubleCountComputed }}</h4>
  <h4>double Count Method : {{ doubleCountMethod(2) }}</h4>
  <button @click="count++">Add One</button>
  <h1>To-Do List</h1>
  <TodoSimpleForm @add-todo="addTodo"/>
    <div 
        v-if="!todos.length"
      >
        추가된 Todo가 없습니다.
    </div>
  <TodoList 
    :todos="todos" 
    @delete-todo="deleteTodo"
    @toggle-todo="toggleTodo"
  />  
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
  export default {
    components: {
      TodoSimpleForm,
      TodoList
    },

    setup() {
     
      const todos = ref([]);
      
      const todoStyle = {
        textDecoration: 'line-through',
        color: 'gray'
      }
    
      const addTodo = (todo) => {
        todos.value.push(todo);
      };
      
      const deleteTodo = (index) => {
        todos.value.splice(index,1);
      }

      const toggleTodo = (index) => {
        todos.value[index].completed = !todos.value[index].completed;
      }

      const count = ref(1);
      /**
       * 함수랑 다른 점은 
       * 인자를 받을 수 없음
       * computed함수 안에 들어있는  reactive state가 있을때만 그리고 변할때만 저장
       * computed는 값을 캐시처리함(저장해놓음)
       */
      const doubleCountComputed = computed(() => {
        return count.value * 2;
      });

      const doubleCountMethod = (name) => {
        return count.value * name;
      }

      return {
        todos,
        todoStyle,
        count,
        doubleCountComputed,
        doubleCountMethod,
        addTodo,
        deleteTodo,
        toggleTodo,
      }
    }
  }
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>

