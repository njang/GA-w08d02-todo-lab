import axios from 'axios'

class TodoModel {
  static all(){
    let request = axios.get("https://super-crud.herokuapp.com/todos");
    return request;
  }
}

export default TodoModel