import axios from 'axios'

class TodoModel {
	static create(todo) {
	  let request = axios.post("https://super-crud.herokuapp.com/todos", todo);
	  return request;
	}
  static all(){
    let request = axios.get("https://super-crud.herokuapp.com/todos");
    return request;
  }
}

export default TodoModel