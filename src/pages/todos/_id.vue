<template>
    <h1>Todo Page</h1>
    <form>
        <div class="form-group">
            <label>Todo Subject</label>
            <input type="text" class="form-control" v-model="subject"/>
        </div>  
        <button class="btn btn-primary" @click="saveTodo()">Save</button>      
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
        const subject = ref('');
        const todo = ref(null);

        const getTodo = async() => {
            const id = route.params.id;
            try {
                const res = await axios.get(`http://localhost:3000/todos/${id}`);
                todo.value = res.data;
                subject.value = res.data.subject;
            } catch(err) {
              console.log(err)      
            }
        }
        getTodo();

        const saveTodo = async() => {
            await axios.patch(`http://localhost:3000/todos/${todo.value.id}`, {
              subject: subject.value
            });
            //여기 부분 잘 안됨.
            router.push({
                name: 'Todos',
            })
        }

        return {
            subject,
            saveTodo
        }
    }
}
</script>

<style>

</style>