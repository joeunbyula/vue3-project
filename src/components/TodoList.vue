<template>

    <div 
      class="card mt-2"
      v-for="(todo, index) in todos"
      :key="todo.id"
    >
      <div 
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer;"
        @click="moveToPage(todo.id)"
      >
        <div class="flex-grow-1">
          <!-- <input 
            class="form-check-input" 
            type="checkbox"
            v-model="todo.completed"
            > -->
         <!-- props는 one-way여서 자식에서 부모의 값을 변경시킬 수 없다. -->
         <input 
            class="ml-2 mr-2" 
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
         > 
          <!-- <label 
            class="form-check-label"
            :style="todo.completed? todoStyle : {}"
          > -->
          <span 
            :class="{ todo: todo.completed }"
          >
            {{ todo.subject }}
        </span>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click.stop="openModal(todo.id)"
            >
            Delete
          </button>
        </div>       
      </div>
    </div>   
    <Modal 
      v-if="showModal"
      @close="closeModal"
      @delete-todo="onDelete"
    />
</template>

<script>

    import { useRouter } from 'vue-router';
    import Modal from './ModalPage.vue';
    import { ref } from 'vue';
    export default {
        components: {
          Modal
        },
        props: {
            todos: {
                type: Array,
                required: true //필수여부
            }
        }, 
        emits: ['toggle-todo, delete-todo', 'closeModal'],
        setup(props, { emit }) {
            const router = useRouter();
            const showModal = ref(false);
            const todoDeleteId = ref(null);

            const openModal = (id) => {
              showModal.value = true;
              todoDeleteId.value = id;
            }
            const onDelete = () => {
              emit('delete-todo', todoDeleteId.value);
              closeModal();
            }

            const toggleTodo = (index, event) => {
                emit('toggle-todo', index, event.target.checked);
            }   

            const closeModal = () => {
              todoDeleteId.value = null;
              showModal.value = false;
            }

            const moveToPage = (todoId) => {
              //router.push('/todos/'+todoId);
              router.push({
                name: 'Todo',
                params: {
                  id: todoId
                }
              })
            }
            
            return {
                showModal,
                onDelete,
                toggleTodo,
                moveToPage,
                openModal,
                closeModal
            }

        }
    }
</script>

<style>

</style>