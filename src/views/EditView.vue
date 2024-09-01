<script setup>
  import { RouterLink , useRoute , useRouter} from 'vue-router';
  import { onMounted, reactive, ref } from 'vue';
  import { useTodoStore } from '@/stores/todoLists';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

  const todoStore = useTodoStore()
  const route = useRoute()
  const router = useRouter()
  let todoID = ref(-1)
  const isLoading = ref(false)
  const toast = ref(false)
  const todoData = reactive({
    item : '',
    status : ''
  })

  onMounted(async()=>{
    isLoading.value = true
    try {
      todoID = parseInt(route.params.id)
      await todoStore.loadTodoById(todoID)
      todoData.item = todoStore.selectedTodo.item
      todoData.status = todoStore.selectedTodo.status
    } catch (error) {
      console.log('error:', error)
    }
    isLoading.value = false
  })

  const updateTodo = async() => {
    isLoading.value = true
    try {
      await todoStore.editTodo(todoID , todoData)
      toast.value = true
      setTimeout(()=>{
        toast.value = false
      },2000)
      // router.push({name : 'home'})
    } catch (error) {
      console.log('error:',error)
    }
    isLoading.value = false
  }
  
</script>

<template>
  <div class="w-full h-full flex justify-center">
      <div v-if="isLoading" class=" absolute top-0 left-0 w-full h-full bg-black flex flex-col gap-5 justify-center items-center z-50 bg-opacity-20">
        <span className="loading loading-spinner loading-lg"></span>
        loading...
      </div>
      <div className="toast toast-end">
        <div v-if="toast" className="alert bg-black bg-opacity-40 text-white font-bold">
          <span>Update todo successfully.</span>
        </div>
      </div>
      <div class="relative flex flex-col gap-4 p-5 border rounded shadow-md w-1/2 h-1/2 items-center justify-center">
        <div class=" absolute top-5 left-5">
          <RouterLink :to="{ name : 'home'}">
            <button><FontAwesomeIcon :icon="faAngleLeft"/> Back</button>
          </RouterLink>
        </div>
        <h1 class="font-bold text-xl">Edit Todo</h1>
        <div class="flex gap-4 w-full justify-around">
          <div>
            <p class="mb-2">Item name</p>
            <input type="text" v-model="todoData.item" className="input input-bordered w-full max-w-xs">
          </div>
          <div>
            <p class="mb-2">Status</p>
            <select v-model="todoData.status" className="select select-bordered w-full max-w-xs">
              <option 
              v-for="status in todoStore.status"
              :value="status"
              :key="status"
              >
              {{ status }}
              </option>
            </select>
          </div>
          <div class="flex items-center">
            <button @click="updateTodo()" class="btn btn-neutral">
              Update
            </button>
          </div>
        </div>
      </div>
  </div>
</template>
