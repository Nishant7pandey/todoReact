import React from 'react';
import Todosearch from '../Todosearch';
import Todolistdetail from '../Todolistdetail';

const TodoList = () => {
    return (
        <div style={{
            backgroundImage: "linear-gradient(to right, #DECBA4, #3E5151)", minHeight:"100vh"
          }}>
            <Todosearch/>
            <Todolistdetail/>
        </div>
    );
}

export default TodoList;
