import React from 'react'
import {nanoid} from 'nanoid'
import './index.css'

class Header extends React.Component{

    handleKeyUp = (event) => {
        const {keyCode, target} = event;
        const {createTodo} = this.props;
        event.preventDefault();

        if(keyCode !== 13)  return;
        
        if(target.value.trim() === ''){
            alert('为空');
            return;
        }
        
        const name = target.value;
        const item = {id:nanoid(), name:name, done:false}

        target.value = '';
        
        // call test from app
        createTodo(item);
    }
    
    render(){
        
        return(
            <div className="todo-header">
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
            </div>
        )

    }
}

export default Header;