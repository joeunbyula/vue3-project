import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/homePage.vue'
import Todos from '../pages/todos/todoListPage.vue'
import Todo from '../pages/todos/_id.vue'
import TodoCreate from '../pages/todos/create/TodoCreate.vue'

 
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        },
        {
            path: '/todos/create',
            name: 'TodoCreate',
            component: TodoCreate
        },
        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo
        },
    ]
})

/**
 * 화면 url 구성
 * 1. /home
 * 2. /todos
 * 3. /todos/create
 * 4. /todos/${id}
 */
export default router;