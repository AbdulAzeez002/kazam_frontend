import axios from 'axios'
export const baseUrl='http://localhost:5000'

export const getAllTodos=async()=>{

    try {
       const {data}=await axios.get(`${baseUrl}/fetchAllTasks`)  
       if(data){
        return data
       }
    } catch (error) {
        console.log(error,'error')
    }
}