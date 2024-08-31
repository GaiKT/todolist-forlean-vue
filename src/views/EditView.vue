<script setup>
  import { RouterLink , useRoute } from 'vue-router';
  import { onMounted, reactive, ref } from 'vue';
  import { useTodoStore } from '@/stores/todoLists';
  const todoStore = useTodoStore()
  const route = useRoute()
  let todoID = ref(-1)
  const todoData = reactive({
    item : '',
    status : ''
  })

  onMounted(async()=>{
    try {
      todoID = parseInt(route.params.id)
      await todoStore.loadTodoById(todoID)
      todoData.item = todoStore.selectedTodo.item
      todoData.status = todoStore.selectedTodo.status
    } catch (error) {
      console.log('error:', error)
    }
  })

  const updateTodo = async() => {
    try {
      await todoStore.editTodo(todoID , todoData)
      alert('updated complete!')
    } catch (error) {
      console.log('error:',error)
    }
  }

  console.log(todoData)
  
</script>

<template>
  <h1>This is an edit page</h1>
  <RouterLink :to="{ name : 'home'}">
    <button>back</button>
  </RouterLink>
  <div>
    <div>
      <p>Item name</p>
      <input type="text" v-model="todoData.item">
    </div>
    <div>
      <p>Status</p>
      <select v-model="todoData.status">
        <option 
        v-for="status in todoStore.status"
        :value="status"
        :key="status"
        >
        {{ status }}
        </option>
      </select>
    </div>
    <div>
      <button @click="updateTodo()">
        update
      </button>
    </div>
  </div>
</template>
