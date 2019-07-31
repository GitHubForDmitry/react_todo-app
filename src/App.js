import React from 'react';
import TodoApp from './components/TodoApp';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filterTodos: [],
    };
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  changeTodoCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id !== id
          ? todo
          : { ...todo, completed: !todo.completed }
      )),
    }));
  };

  destroyTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  destroyAllCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      filterTodos: [],
    }));
  };

  render() {
    const { todos, filterTodos } = this.state;

    return (
      <section className="todoapp">

        <TodoApp
          todos={todos}
          addTodo={this.addTodo}
          changeTodoCompleted={this.changeTodoCompleted}
          destroyTodo={this.destroyTodo}
          filterTodos={filterTodos}
        />
        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {(todos.filter(todo => !todo.completed)).length}
            <> items left</>
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

          <button
            onClick={this.destroyAllCompletedTodos}
            type="button"
            className="clear-completed"
            style={this.state.todos
              .some(todo => todo.completed)
              ? { display: 'block' }
              : { display: 'none' }}
          >
            Сlear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
