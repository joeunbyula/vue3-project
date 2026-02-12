<template>
  <router-view/>
  <div class="container">
  <h1>To-Do List</h1>
  <input 
    class="form-control"
    type="text" 
    v-model="searchText"
    placeholder="Search"
    @keyup.enter="searchTodo"
  >
  <hr />
  <TodoSimpleForm @add-todo="addTodo"/>
    <div style="color: red">{{ error }}</div>
    <div 
        v-if="!todos.length"
      >
        There is noting to display
    </div>
  <TodoList 
    :todos="todos" 
    @delete-todo="deleteTodo"
    @toggle-todo="toggleTodo"
  />  
  <hr/>
  <nav v-if="todos.length" aria-label="Page navigation example">
    <ul class="pagination">
      <li 
        v-if="currentPage !== 1" 
        class="page-item"
      >
        <a class="page-link" style="cursor:pointer" @click="getTodos(currentPage-1)">Previous</a>
      </li>
      <li 
        class="page-item" 
        v-for="page in numberOfPages"
        :key="page"
        :class="currentPage === page ? 'active' : ''"
      >
        <a class="page-link" style="cursor:pointer" @click="getTodos(page)">{{ page }}</a>
      </li>
      <li 
        v-if="numberOfPages !== currentPage"
        class="page-item"
      >
        <a class="page-link" style="cursor:pointer" @click="getTodos(currentPage+1)">Next</a>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
  export default {
    components: {
      TodoSimpleForm,
      TodoList
    },

    setup() {
     
      const todos = ref([]);
      const numberOfTodos = ref(0);
      const limit = 5;
      const currentPage = ref(1);
      const numberOfPages = computed(() => {
        return Math.ceil(numberOfTodos.value / limit);
      })
      const searchText = ref('');
      const error = ref('');

      const todoStyle = {
        textDecoration: 'line-through',
        color: 'gray'
      }
    
      const getTodos = async (page = currentPage.value) => {
        try {
          currentPage.value = page;
          const res = await axios.get(`http://localhost:3000/todos?subject_like=${searchText.value}&_page=${currentPage.value}&_limit=${limit}&_sort=id&_order=desc`);
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
          await axios.post('http://localhost:3000/todos', {
            subject: todo.subject,
            completed: todo.completed,
          })
          //todos.value.push(res.data);
          getTodos(1);
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
          //todos.value.splice(index,1);
          getTodos();
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

      let timeout = null;
      const searchTodo = () => {
        clearTimeout(timeout);
        getTodos(1);
      }
      watch(searchText,() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          getTodos(1);
        },1000);  
      })
      // const filteredTodos = computed(() => {
      //   if(searchText.value) {
      //     return todos.value.filter(todo => {
      //       return todo.subject.includes(searchText.value);
      //     })
      //   } 

      //   return todos.value;
      // }) 

      return {
        todos,
        todoStyle,
        addTodo,
        deleteTodo,
        toggleTodo,
        searchText,
        //filteredTodos,
        getTodos,
        searchTodo,
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

