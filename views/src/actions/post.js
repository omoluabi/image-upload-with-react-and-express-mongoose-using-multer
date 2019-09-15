import axios from 'axios'
export const ADD_POST = 'ADD_POST'

export const addPost = (data)=>dispatch=>{
  axios.post('api/posts', data)
  .then(res=>console.log(res))
  .catch((err) =>console.log(err))
}


export default null
