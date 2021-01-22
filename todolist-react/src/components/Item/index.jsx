import React from 'react';
import './index.css';

class Item extends React.Component{

    state = {
        highlightState : false
    }

    handleChecked = (id) => {
        // 事件会给它的回调传递event, 而这个函数所返回的函数才是回调.
        return (event) => {            
            this.props.updateTodo(id, event.target.checked);
        }
    }

    handleMouse = (flag) => {
        return () => {
            this.setState({highlightState : flag});
        }
    }

    handleDelete = (id) => {
        return () => window.confirm('你确定要删除?') && this.props.deleteTodo(id)
    }

    render(){
        const {id, name, done} = this.props;
        const {highlightState} = this.state;
        const {handleChecked} = this;

        return(
            <li style = {{ backgroundColor: highlightState ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                <label>
                    <input type="checkbox" checked={done} onChange={handleChecked(id)}/>
                    <span>{name}</span>
                </label>
                <button onClick={this.handleDelete(id)} className="btn btn-danger" style={{display:highlightState ? 'block' : 'none'}}>删除</button>
            </li>
        )
    }
}

export default Item;