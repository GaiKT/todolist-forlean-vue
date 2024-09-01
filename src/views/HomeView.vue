<script setup>
  import { ref , onMounted, computed } from 'vue'
  import { useTodoStore } from '../stores/todoLists'
  import { RouterLink } from 'vue-router';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCircleXmark , faEdit , faL, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

  const todoStore = useTodoStore()
  const inputText = ref('')
  const selectStatus = ref('')
  const isLoading = ref(false)
  const toast = ref(false)

  onMounted(async () => {
    isLoading.value = true
    await todoStore.loadAllTodo()
    isLoading.value = false
  })

  const addTodo = async() => {
    isLoading.value = true
    try {
      await todoStore.createTodo(inputText.value)
      await todoStore.loadAllTodo()
      inputText.value = ''
      toast.value = true
      setTimeout(()=>{
        toast.value = false
      },2000)
      
    } catch (error) {
      console.log(error)
    }
    isLoading.value = false
  }

  const handleDone = async( id ,status ) => {
    isLoading.value = true
    try {
      let newStatus = ''
      if(status === 'Done'){
        newStatus = 'Doing'
      }else{
        newStatus = 'Done'
      }
      await todoStore.editTodo( id , {status : newStatus})
      todoStore.loadAllTodo()
      toast.value = true
      setTimeout(()=>{
        toast.value = false
      },2000)
    } catch (error) {
      console.log('error:',error)
    }
    isLoading.value = false
  }

  const delTodo = async(id) => {
    isLoading.value = true
    try {
      await todoStore.deleteTodo(id)
      await todoStore.loadAllTodo()
      toast.value = true
      setTimeout(()=>{
        toast.value = false
      },2000)
    } catch (error) {
      console.log(error)
    }
    isLoading.value =false
  }

  const filterTodo = computed(()=>{
    return selectStatus.value ? todoStore.lists.filter((todo)=>todo.status === selectStatus.value) : todoStore.lists
  })

  const changeStatus = (newStatus) => {
    selectStatus.value = newStatus
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
    <div class="flex flex-col gap-4 p-5 border rounded shadow-md md:w-1/2 w-full min-h-1/2">
      <div class="flex gap-2">
        <input type="text" v-model="inputText" placeholder="Enter your todo.." class="input input-bordered w-full">
        <button class="btn btn-neutral" @click="addTodo"> <FontAwesomeIcon :icon="faSquarePlus"/>Add list</button>
      </div>
      <div role="tablist" class="tabs tabs-lifted">
        <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="All" @click="changeStatus('')" checked/>
        <input v-for="status in todoStore.status" type="radio" name="my_tabs_2" role="tab" class="tab" :aria-label="status" @click="changeStatus(status)" :checked="status === selectStatus"/>
        <ul role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded flex flex-col p-4 pb-0 min-h-[300px]">
            <li v-if="filterTodo.length > 0" v-for="todo in filterTodo" class="relative flex items-center justify-around gap-2 mb-4 p-2 border rounded hover:bg-slate-100 hover:shadow-md transition-all cursor-pointer" >
              <input type="checkbox" @change="handleDone(todo.id , todo.status)" :checked="todo.status === 'Done'" class="checkbox">
              <span class="min-w-[120px]" :class="todo.status === 'Done' ? 'line-through' : ''">
                {{todo.item}}
              </span>
              <span class="min-w-[100px]">
                {{ todo.status }} 
              </span>
              <span>
                <RouterLink :to="{ name:'edit' , params: { id : todo.id} }">
                  <button>
                    <FontAwesomeIcon :icon="faEdit"/>
                  </button>
                </RouterLink>
                <button @click="delTodo(todo.id)" class=" absolute top-[-12px] right-[-8px] w-6 h-6">
                  <FontAwesomeIcon :icon="faCircleXmark"/>
                </button>
              </span>
            </li>
            <div v-else class="text-center">
              Don't have Todo.
            </div>
        </ul>
      </div>
    </div>
  </div>
</template>
