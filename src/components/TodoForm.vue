<template>
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
                    <div class="text-red" v-if="subjectError">
                     {{ subjectError }}
                    </div>
                </div>  
            </div>
            <div class="col-6" v-if="editing">
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
            <div class="col-12">
                 <div class="form-group">
                    <label>Body</label>
                    <textarea v-model="todo.body" class="form-control" cols="30" rows="10">

                    </textarea>
                </div>  
            </div>
        </div>
       
        <button type="submit" class="btn btn-primary" :disabled="!todoUpdate">{{ editing ? 'Update' : 'Create' }}</button>
        <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage()">Cancel</button>      

    </form>
    <Transition name="fade">
        <ToastPage v-if="showToast" :message="toastMessage" :type="toastType"/>
    </Transition>
</template>
<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { ref,computed } from 'vue';
import _ from 'lodash';
import ToastPage from '@/components/ToastPage.vue';
import { useToast } from '@/composables/toast';

export default {
    components: {
        ToastPage
    },
    props: {
        editing: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const loading = ref(false);
        const originalTodo = ref(null);
        const todo = ref({
            subject: '',
            completed: false,
            body: ''
        });
        const todoId = ref('');
        const subjectError = ref('');
        const {
            showToast,
            toastMessage,
            toastType,
            triggerToast
        } = useToast();

        const getTodo = async() => {
            loading.value = true;
            todoId.value = route.params.id;
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId.value}`);
                todo.value = {...res.data};
                originalTodo.value = {...res.data};
                loading.value = false;
                //subject.value = res.data.subject;
            } catch(err) {
              console.log(err);
              triggerToast('Something went wrong','danger');      
            }
        }

        if(props.editing) {
            getTodo();
        }

        const toggleTodoStatus = async() => {
            todo.value.completed = !todo.value.completed;
        }

        const todoUpdate = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value)
        });      
        
        const saveTodo = async() => {
            try {
                let res;
                subjectError.value = '';
                const todoData = {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                    body: todo.value.body
                }

                if(!todoData.subject) {
                    subjectError.value = 'Empty Subject!';
                    triggerToast('Empty Subject!', 'danger');
                    return;
                }

                if(props.editing) {
                    res = await axios.put(`http://localhost:3000/todos/${todoId.value}`, todoData);
                    originalTodo.value = {...res.data};
                } else {
                    res = await axios.post(`http://localhost:3000/todos`, todoData);
                    todo.value.subject = '';
                    todo.value.body = '';
                }
                

                const message = props.editing ? 'Updated!' : 'Created!'
                triggerToast(`Successfully ${message}`);

                // //여기 부분 잘 안됨. -> form태그에 @submit.prevent로 이벤트 실행시켜야함.. 버블링때문에 안되는거였음..
                // router.push({
                //     name: 'Todos',
                // })
            } catch(err) {
                console.log(err);
                triggerToast('Something went wrong','danger');      
            }
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
            todoUpdate,
            showToast,
            toastMessage,
            toastType,
            subjectError,
            saveTodo,
            toggleTodoStatus,
            moveToTodoListPage
        }
    }
}
</script>

<!-- scope는 해당 컴포넌트 안에서만 사용하게끔 해주는 것..-->
<style scoped>
    .text-red {
        color: red;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
        transform: translateY(0px);

    }
</style>