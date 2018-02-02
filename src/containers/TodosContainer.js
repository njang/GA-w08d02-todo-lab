import React, { Component } from 'react';
import TodoModel from '../models/Todo'

class TodosContainer extends Component {
  constructor(){
    super()
    this.state = {
      todos: []
    }
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    TodoModel.all().then( (res) => {
      this.setState ({
        todos: res.data.todos,
        todo: ''
      })
    })
  }
  render() {

  	TodoModel.all().then( (res) => {
  		console.log(res);
  	})
    return (
      <div className="todosContainer">
				<Todos
          todos={this.state.todos} />
      </div>
    )
  }
}

export default TodosContainer;
