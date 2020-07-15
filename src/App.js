import React from 'react';
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import axios from 'axios';
import './App.css';

const url = 'http://localhost:8000/api/todos/';

export default class App extends React.Component {
  state = {
    todos: [] 
  }
  
  componentDidMount () {
    axios.get(url)
      .then(res => this.setState({ todos: res.data}))
  }
  
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map( todo => {
      if(todo.id === id) {
        axios.put(`${url}${id}/complete`, {
          completed: todo.completed
        }).then(todo.completed = !todo.completed);
      }
      return todo
    })})
  }

  addTodo = (title) => {
    //const newTodo = {
      //id: 4,
      //title,
      //completed: false
    //}
    axios.post(url, {
      title,
      completed: false
    }).then(res => this.setState({
      todos: [...this.state.todos, res.data]
    }));
  }
  delTodo = async (id) => {
    //    //})
    const res = await axios.delete(url+id)
      .then(res => this.setState({ todos: [ ...this.state.todos.filter(todo => todo.id !== id)]}))
      .catch(err => console.log(err))
  }
  render () {
    return (
      <div className="App">
        <div className="container">
          <Header/>
          <AddTodo addTodo={this.addTodo}/>
          <Todos 
            todos={this.state.todos} 
            markComplete={this.markComplete} 
            delTodo={this.delTodo}
          />
        </div>
      </div>
    );
  }
}

