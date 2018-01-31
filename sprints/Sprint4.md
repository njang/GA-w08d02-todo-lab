## Sprint 4: Creating Todos
We're going to want to create a component that handles the form for creating todos. Before we build this feature out, How can we pass state from a child component to a parent? The opposite is easy, because we're able to just pass properties to our child components. Child state to parent state is much more difficult because we can't pass properties like that. Its unidirectional. The answer? Callbacks.

Lets write this feature to shed some more light on it.

Let's create a file `src/components/CreateTodoForm.js` and fill it out with the following:

```js
import React, {Component} from 'react'

class CreateTodoForm extends Component {
  constructor(){
    super()
    //sets the initial state via the constructor! that's the constructor's job :)
    this.state = {
      todo: ''
    }
    // Don't let this part scare you; it does something simple. 
    // When we go into a new function, that normally changes our context therefore changing what 'this' points to.
    // The next to lines use the function .bind so that 'this' in onInputChange and onFormSubmit still points to 'this' here in CreateTodoForm. More on bind below: 
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onInputChange(event){
    this.setState({
      todo: event.target.value
    })
  }
  onFormSubmit(event){
    event.preventDefault()
    let todo = this.state.todo
    this.props.createTodo(todo)
    this.setState({
      todo: ""
    })
  }
  render(){
    return (
      <div className='createForm todoForm'>
        <h2>Create Todo Here!</h2>
        <form onSubmit={ this.onFormSubmit }>
          <input
            onChange={ this.onInputChange }
            placeholder='Write a todo here ...'
            type='text'
            value={this.state.todo} />
          <button type='submit'>Create Todo!</button>
        </form>
      </div>
    )
  }
}

export default CreateTodoForm
```
- [More on .bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)
- [Bind in this context](https://medium.com/shoutem/react-to-bind-or-not-to-bind-7bf58327e22a)

Ok, First let's look at what we're rendering:

```js
render(){
  return (
    <div className='createForm todoForm'>
      <h2>Create Todo Here!</h2>
      <form onSubmit={ this.onFormSubmit }>
        <input
          onChange={ this.onInputChange }
          placeholder='Write a todo here ...'
          type='text'
          value={this.state.todo} />
        <button type='submit'>Create Todo!</button>
      </form>
    </div>
  )
}
```

We define the initial state of the form in the constructor.

Looks like a form. When it gets submitted we run a function (we're using es6 arrow function here to pass an anonymous function with an event argument). That function is the `.onFormSubmit` function defined in this component.

Similarly when the `input` is changed we run `.onInputChange`.


Let's take a look at the `onInputChange` function first:

```js
onInputChange(event){
  this.setState({
    todo: event.target.value
  })
}
```

Basically whenever this input changes, we're going to set the state of this component to have a property of `todo` and it's value is whatever the input field's value is.

`onFormSubmit`:

```js
onFormSubmit(event){
  event.preventDefault()
  let todo = this.state.todo
  this.props.createTodo(todo)
  this.setState({
    todo: ""
  })
}
```

First off, prevent the default action as form submission will cause a request to fire. Then instantiate a variable todo from the state. Lastly we also set the todo property of the state as an empty string. We skipped one line though, `this.props.createTodo(todo)` What does that tell us about where `createTodo` comes from?

It needs to be supplied from its parent component. Let's update the `src/containers/TodosContainer.js` so that we can successfully create todos:

In `src/containers/TodosContainer.js`:  

```js
// At the top import the component
import CreateTodoForm from '../components/CreateTodoForm'

...
constructor() {
  ... your existing code here...
  this.createTodo = this.createTodo.bind(this);
}
createTodo(todo) {
    let newTodo = {
        body: todo,
        completed: false
    }
    TodoModel.create(newTodo).then((res) => {
        let todos = this.state.todos
        let newTodos = todos.push(res.data)
        this.setState({newTodos})
    })
}
render(){
  return (
    <div className="todosComponent">
      <Todos
        todos={this.state.todos} />
      <CreateTodoForm
        createTodo={ this.createTodo }
        />
    </div>
  )
}
```

We see that we pass the `createTodo` function of THIS container component TO the `CreateTodoForm` component. We have to `bind(this)` in the `constructor` function so that `this` is bound to the container component.

In the actual `createTodo` function. We can see that we construct everything we need about a todo in an object and store it in a variable. We then pass that object to a `.create` method on our `TodoModel` that ... hasn't been defined yet. Let's define it now. In `src/models/Todo.js`:

```js
static create(todo) {
  let request = axios.post("https://super-crud.herokuapp.com/todos", todo)
  return request
}
```

Using axios, we create the todo. In the promise, we fetch all the todos and set the state to encapsulates those `todos` from the `res`ponse.

## Backtrack - How did we pass state from child to parent?

Remember that in the submit event of the form, we used a function `this.props.createTodo()`:

In `src/components/CreateTodoForm`:

```js
onFormSubmit(event){
  event.preventDefault()
  let todo = this.state.todo
  this.props.createTodo(todo)
  this.setState({
    todo: ""
  })
}
```

We pass `createTodo` from the container as `props`. In `src/containers/TodosContainer.js`:

```js
constructor() {
  super();
  this.createTodo = this.createTodo.bind(this);
}
render(){
  return (
    <div className="todosComponent">
      <Todos
        todos={this.state.todos} />
      <CreateTodoForm
        createTodo={ this.createTodo }
        />
    </div>
  )
}
```

The argument passed in at the `CreateTodoForm` level(child) was state from that component. And now it updates state at the `TodosContainer` level(parent).
