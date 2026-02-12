<template>
    <h1>Todo Page</h1>
    <div v-if="loading">
        loading...
    </div>
    <form 
        v-else
        @submit.prevent="saveTodo"
    >
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" class="form-control" v-model="todo.subject"/>
                </div>  
            </div>
            <div class="col-6">
                 <div class="form-group">
                    <label>Status</label>
                    <div>
                        <button
                            class="btn"
                            :class="todo.completed ? 'btn-success' : 'btn-danger'"   
                            @click="toggleTodoStatus"   
                            type="button"                  
                        >
                            {{ todo.completed ? 'Completed' : 'Incomplete' }}
                        </button>
                    </div>
                </div>  
            </div>
        </div>
       
        <button type="submit" class="btn btn-primary">Save</button>
        <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage()">Cancel</button>      

    </form>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        //const subject = ref('');
        const loading = ref(true);
        const todo = ref(null);
        const todoId = ref('');

        const getTodo = async() => {
            todoId.value = route.params.id;
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId.value}`);
                todo.value = res.data;
                loading.value = false;
                //subject.value = res.data.subject;
            } catch(err) {
              console.log(err)      
            }
        }
        getTodo();

        const toggleTodoStatus = async() => {
            todo.value.completed = !todo.value.completed;
        }
        const saveTodo = async() => {
            await axios.put(`http://localhost:3000/todos/${todoId.value}`, {
              subject: todo.value.subject,
              completed: todo.value.completed
            });
            //여기 부분 잘 안됨. -> form태그에 @submit.prevent로 이벤트 실행시켜야함.. 버블링때문에 안되는거였음..
            router.push({
                name: 'Todos',
            })
        }

        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            })
        }

        return {
          //  subject,
            loading,
            todo,
            saveTodo,
            toggleTodoStatus,
            moveToTodoListPage
        }
    }
}
</script>

<style>

</style>