import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://66d1631d62816af9a4f37224.mockapi.io' 

export const useTodoStore = defineStore('todo', {
  state : ()=>({
    lists : [],
    selectedTodo : {},
    status : ['Pending' , 'Doing' , 'Done']
  }),
  actions : {
    async loadAllTodo(){
      try {        
        const result = await axios.get( BASE_URL + '/todolists')
        this.lists = result.data
      } catch (error) {
        console.log('error :' , error)
      }
    },
    async loadTodoById( id ){
      try {        
        const result = await axios.get( BASE_URL + '/todolists/' + id)
        this.selectedTodo = result.data
      } catch (error) {
        console.log('error :' , error)
      }
    },
    async createTodo( todoText ) {
      const data = {
        item : todoText ,
        status : this.status[0]
      }
      try {        
        await axios.post( BASE_URL + '/todolists' , data)
      } catch (error) {
        console.log('error :' , error)
      }      
    },
    async editTodo( id , data ) {
      try {        
        await axios.put( BASE_URL + '/todolists/' + id , data)
      } catch (error) {
        console.log('error :' , error)
      }      
    },
    async deleteTodo( id ) {
      try {        
        await axios.delete( BASE_URL + '/todolists/' + id)
      } catch (error) {
        console.log('error :' , error)
      }      
    }
  }
})
