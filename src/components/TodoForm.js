import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Input, Row } from 'reactstrap';

const TodoForm = props => {
    //Set State for Todo form
    const [value, setValue] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        //Executes props function addTodo
        props.handleAddTodo(value);
        //Clears the todo form state
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit} >
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Row>
                    <Col sm={6}>
                        <Input
                            type="text"
                            name="todo"
                            id="todo"
                            className="input"
                            placeholder="Add your todo here"
                            onChange={e => {
                                //Set event on change to value state for todo form                                
                                setValue(e.target.value)                                
                            }}
                        />
                    </Col>
                    <Col sm={2}>
                        <Button color="primary" className="float-left">+</Button>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    );

}

export default TodoForm;