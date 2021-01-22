import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

    countDone = () => {
        let done = 0
        this.props.todos.forEach( (item) => item.done === true && done++ )
        return done;
    }

    handleCheckAll = (event) => {
        this.props.checkAllTodo(event.target.checked);
    }

    handleCheckAllDone = () => {
        this.props.clearAllDoneTodo();
    }

    render() {
        const done = this.countDone();
        const length = this.props.todos.length;

        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" onChange={this.handleCheckAll} checked={done === length && length !== 0  ? true : false} />
                </label>
                <span>
                    <span>已完成{done}</span> / 全部{length}
                </span>
                <button className="btn btn-danger" onClick = {this.handleCheckAllDone}>清除已完成任务</button>
            </div>       
        )
    }
}
