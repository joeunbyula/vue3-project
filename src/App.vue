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
  <hr/>
  <TodoPagenation 
    :numberOfTodos="numberOfTodos"
    @get-todo="getTodos"
  />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import TodoPagenation from './components/TodoPagenation.vue';
  export default {
    components: {
      TodoSimpleForm,
      TodoList,
      TodoPagenation
    },

    setup() {
     
      const todos = ref([]);
      const numberOfTodos = ref(0);

      const limit = 5;
      const currentPage = ref(1);
      const numberOfPages = computed(() => {
        return Math.ceil(numberOfTodos.value / limit);
      })

      const error = ref('');
      
      const todoStyle = {
        textDecoration: 'line-through',
        color: 'gray'
      }
    
      const getTodos = async (page) => {
        try {
          const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`);
          numberOfTodos.value = res.headers['x-total-count'];
          todos.value = res.data;
        } catch (err) {
          console.log(err);
        }
      }
      getTodos();

      const addTodo = async (todo) => {
        // 데이터베이스에 저장
        error.value = '';
        try {
          const res = await axios.post('http://localhost:3000/todos', {
            subject: todo.subject,
            completed: todo.completed,
          })
          todos.value.push(res.data);
        } catch(err) {
          console.error(err);
          error.value = "Something went wrong.";
        }
      };
      
      const deleteTodo = async (index) => {
        try {
          error.value = '';
          const id = todos.value[index].id;
          await axios.delete('http://localhost:3000/todos/'+id);
          todos.value.splice(index,1);
          //getTodos();
        } catch (err) {
          console.log(err);
        }
      }

      const toggleTodo = async (index) => {
        try {
          error.value = '';
          const id = todos.value[index].id;
          await axios.patch('http://localhost:3000/todos/'+id, {
              completed: !todos.value[index].completed
          });
          todos.value[index].completed = !todos.value[index].completed;
        } catch (err) {
          console.log(err);
        }
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
        getTodos,
        numberOfPages,
        currentPage,
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

