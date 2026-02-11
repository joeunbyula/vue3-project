<template>
  <div class="container">
  <h1>To-Do List</h1>
  <input 
    class="form-control"
    type="text" 
    v-model="searchText"
    placeholder="Search"
  >
  <hr />
  <TodoSimpleForm @add-todo="addTodo"/>
    <div style="color: red">{{ error }}</div>
    <div 
        v-if="!filteredTodos.length"
      >
        There is noting to display
    </div>
  <TodoList 
    :todos="filteredTodos" 
    @delete-todo="deleteTodo"
    @toggle-todo="toggleTodo"
  />  
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
  export default {
    components: {
      TodoSimpleForm,
      TodoList
    },

    setup() {
     
      const todos = ref([]);
      const error = ref('');
      
      const todoStyle = {
        textDecoration: 'line-through',
        color: 'gray'
      }
    
      const addTodo = async (todo) => {
        // 데이터베이스에 저장
        error.value = '';
        try {
          const res = await axios.post('http://localhost:3000/todos', {
            subject: todo.subject,
            computed: todo.completed,
          })
          todos.value.push(res.data);
        } catch(err) {
          console.error(err);
          error.value = "Something went wrong.";
        }
        // .then(res => {
        //   console.log(res)
        //   todos.value.push(res.data);
        // }).catch(err => {
        //   console.error(err);
        //   error.value = "Something went wrong.";
        // });
      };
      
      const deleteTodo = (index) => {
        todos.value.splice(index,1);
      }

      const toggleTodo = (index) => {
        todos.value[index].completed = !todos.value[index].completed;
      }

      const searchText = ref("");
      const filteredTodos = computed(() => {
        if(searchText.value) {
          return todos.value.filter(todo => {
            return todo.subject.includes(searchText.value);
          })
        } 

        return todos.value;
      }) 

      return {
        todos,
        todoStyle,
        addTodo,
        deleteTodo,
        toggleTodo,
        searchText,
        filteredTodos,
        error
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

