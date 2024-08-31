<script setup>
  import { ref , onMounted } from 'vue'
  import { useTodoStore } from '../stores/todoLists'
  import { RouterLink } from 'vue-router';

  const todoStore = useTodoStore()
  const inputText = ref('')

  onMounted(async () => {
    await todoStore.loadAllTodo()
  })

  const addTodo = async() => {
    try {
      await todoStore.createTodo(inputText.value)
      await todoStore.loadAllTodo()
      inputText.value = ''
    } catch (error) {
      console.log(error)
    }
  }

  const delTodo = async(id) => {
    try {
      await todoStore.deleteTodo(id)
      await todoStore.loadAllTodo()
    } catch (error) {
      console.log(error)
    }
  }

</script>

<template>
  <main>
    <div>
      <input type="text" v-model="inputText">
      <button @click="addTodo">Add list</button>
    </div>
    
    <div>
      item lists
        <ul>
          <li v-for="todo in todoStore.lists" >
            {{todo.item}} {{ todo.status }} 
            <span>
              <RouterLink :to="{ name:'edit' , params: { id : todo.id} }">
                <button>edit</button>
              </RouterLink>
              <button @click="delTodo(todo.id)">delete</button>
            </span>
          </li>
        </ul>
    </div>
  </main>
</template>
