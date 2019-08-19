import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import TodoForm from "./components/TodoForm";
import aws_exports from "./aws-exports";
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import TodoList from './components/TodoList';

Amplify.configure(aws_exports);


const App = () => {
  //Hooks set component state
  const [todos, setTodos] = useState([]);

  //Hooks component equivalent to componentdidMount in Redux 
  useEffect(() => {
    //useEffect function must return a cleanup function or nothing
    (async () => {
      const result = await API.graphql(graphqlOperation(queries.listTodos));
      setTodos(result.data.listTodos.items);
    })();//IIFE

  }, [])

  
  const handleAddTodo = async value => {
    const todo = {
      text: value
    }
    //Connect Client Amplify GraphQL
    const result = await API.graphql(graphqlOperation(mutations.createTodo, { input: todo }));
    //Destructuring Assignment in ES6 
    setTodos([...todos, result.data.createTodo]);
  };

  const handleDeleteTodo = async id => {
    const todo = {
      id: id
    }
    //Connect Client Amplify GraphQL
    const result = await API.graphql(graphqlOperation(mutations.deleteTodo, { input: todo }))
    //Filters todos array and returns array that does not correspond to item.id
    const filteredTodos = todos.filter(item => item.id !== result.data.deleteTodo.id);
    //Updates state
    setTodos(filteredTodos);
  }

  return (
    < div className="App" >
      <Container>
        {/* Header */}
        <Row>
          <Col>
            <h1>Aewsome To do list</h1>
             <br/>
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoForm handleAddTodo={handleAddTodo} />
          </Col>
        </Row>
        {/*  Todos List */}
        <Row>
          <Col>
            <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} />
          </Col>
        </Row>
        {/* Add Todo Form */}
      </Container>
    </div>
  );
}

export default App;
