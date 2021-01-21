import React, { Component } from 'react'
import Header from './components/Header/index.jsx'
import List from './components/List/index.jsx'
import Footer from './components/Footer/index.jsx'
import './App.css'

export default class App extends Component {
    
    state = { 
        todos : [
            {id:'001', name:'eating', done:true},
            {id:'002', name:'sleeping', done:true},
            {id:'003', name:'coding', done:false}
        ]   
    }

    // 修改todo的done属性
    updateTodo = (id, done) => {
        this.setState({
            todos : this.state.todos.map((item) => {
                return item.id === id ? {...item, done} : item;
            })
        });
    }

    
    // 得到新的todo标签
    createTodo = (todo) => {
        // add newItem to todos
        this.setState({
            todos: [todo, ...this.state.todos]
        });
    }

    deleteTodo = (id) => {
        const {todos} = this.state;
        const result =  todos.filter((item) => {
            return item.id !== id;
        })
        
        this.setState({
            todos: result
        })
    }

    render() {
        const {todos} = this.state;
        const {createTodo, updateTodo, deleteTodo} = this;
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header createTodo = {createTodo} />
                    <List todos = {todos} updateTodo = {updateTodo} deleteTodo={deleteTodo} />
                    <Footer />
                </div>
            </div>
        )
    }
}
