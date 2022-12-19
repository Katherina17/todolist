import React from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
    console.log(typeof v1())
    const todoList_title: string = 'what to learn';

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
        {id: v1(), title: "ANGULAR", isDone: true}]);

    const [filter, setFilter] = useState<FilterValueType>('all');

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    }

    const getFilteredTasksForRender = (filter: FilterValueType) => {
         switch(filter){
             case 'active':
                 return tasks.filter(t => !t.isDone);
             case "completed":
                 return tasks.filter(t => t.isDone);
             default:
                 return tasks;
         }
    }

    const addTask = (title: string) => {
        const newTask : TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <TodoList title={todoList_title}
                      tasks={getFilteredTasksForRender(filter)}
                      removeTask={removeTask}
                      setFilter = {setFilter}
                    addTask={addTask}/>
        </div>
    );
}

export default App;
