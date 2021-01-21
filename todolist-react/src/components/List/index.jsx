import React from 'react'
import './index.css'
import Item from '../Item/index.jsx'

class List extends React.Component{

    render(){

        const {todos, updateTodo, deleteTodo} = this.props;

        return(
            <ul className="todo-main">
                {
                    todos.map((todo) => {
                        return <Item key = {todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
                    })
                }
            </ul>
        )
    }
}

export default List;