import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/homePage.vue'
import Todos from '../pages/todos/todosPage.vue'
 
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