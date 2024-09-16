import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import {getTodos, addTodo, updateTodo, deleteTodo} from "./BackendService"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      todos: [],
    };
  }

  async componentDidMount() {
    this.setState({todos: await getTodos()});
  }

  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  async addItem() {
    if (this.state.userInput !== "") {
      const todo = await addTodo(this.state.userInput);

      const todos = [...this.state.todos];
      todos.push(todo);

      this.setState({
        todos,
        userInput: "",
      });
    }
  }

  async deleteItem(id) {
    const todos = [...this.state.todos];
    const todo = await deleteTodo(id);
    const updatedList = todos.filter((i) => i.id !== id);
    this.setState({ todos: updatedList });
  }

  async editItem(id) {
    const todos = [...this.state.todos];
    const todoToEdit = todos.find((t) => t.id === id);
    const editedValue = prompt("Edit", todoToEdit.text);
    if (editedValue !== null && editedValue.trim() !== "") {
      const todo = await updateTodo(todoToEdit.id, editedValue);
      todoToEdit.text = todo.text;
      this.setState({ todos: todos });
    }
  }

  render() {
    return (
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          TODO LIST
        </Row>

        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
              
              <InputGroup>
              <FormControl
                placeholder="add item . . . "
                size="mt-2"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
                <Button
                  variant="dark"
                  className="mt-0"
                  onClick={async () => await this.addItem()}
                >
                  ADD
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {/* map over and print items */}
              {this.state.todos.map((item, index) => {
                return (
                  <div key={item.id}>
                    <ListGroup.Item
                      variant="dark"
                      action
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.text}
                      <span>
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="light"
                          onClick={async () => await this.deleteItem(item.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="light"
                          onClick={async () => await this.editItem(item.id)}
                        >
                          Edit
                        </Button>
                      </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
