import React from 'react';
import { Table, Spinner, Button, Card } from 'reactstrap';

const TodoList = props => {

    return (       
            <div>
                 <Card>
                {props.todos.length > 0 ?
                    <Table>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>ITEM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.todos.map((item) =>
                                <tr key={item.id}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.text}
                                    </td>
                                    <td>
                                        <Button color="danger" onClick={() => props.handleDeleteTodo(item.id)}>X</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    : (<Spinner style={{ width: '3rem', height: '3rem' }} />)
                }
            </Card>
        </div >
    );
}

export default TodoList;