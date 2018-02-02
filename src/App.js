import React, { Component } from 'react';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import TodosContainer from './containers/TodosContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
        <Header />
        <Switch>
        	<Route exact path='/' component={ Home }/>
        	<Route path='/todos' component={ TodosContainer }/>
        </Switch>
      </div>
    );
  }
}

export default App;
