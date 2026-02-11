<template>
     <nav aria-label="Page navigation example">
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
</template>

<script>

import { ref, computed } from 'vue';


export default {
    props: {
        numberOfTodos: {
            type: [Number, String],
            required: true //필수여부
        }
    }, 
    emits : ['get-todo'],
    setup(props, { emit }) {
        const limit = 5;
        const currentPage = ref(1);
        
        // 값이 바뀔 때마다 실행하고 싶을 때!
        const numberOfPages = computed(() => {
            // 전달받은 값이 문자열일 경우를 대비해 Number로 변환
            const total = Number(props.numberOfTodos);
            if (!total || total <= 0) return 1;
            
            return Math.ceil(total / limit);
        });

        const getTodos = (page) => {
            currentPage.value = page;
            emit('get-todo', currentPage.value)
        }

        return {
            numberOfPages,
            currentPage,
            getTodos
        }
    }
}

</script>
