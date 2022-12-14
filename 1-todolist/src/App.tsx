import React, {useEffect} from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";
import {useState} from "react";

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
    const todoList_title: string = 'what to learn';

    const [tasks, setTasks] = useState<Array<TasksType>>([{id: 1, title: "HTML & CSS", isDone: true},
            {id: 2, title: "ES6 & TS", isDone: true},
            {id: 3, title: "REACT", isDone: false},
            {id: 4, title: "ANGULAR", isDone: true}]);

    const [filter, setFilter] = useState<FilterValueType>('all');

    const removeTask = (id:number) => {
        setTasks(tasks.filter(t => t.id !== id));
    }

    const getFilteredTasksForRender = (filter: FilterValueType) => {
         switch(filter){
             case 'active':
                 return tasks.filter(t => t.isDone === false);
             case "completed":
                 return tasks.filter(t => t.isDone === true);
             default: return tasks;
         }
    }


    return (
        <div className="App">
            <TodoList title={todoList_title}
                      tasks={getFilteredTasksForRender(filter)}
                      removeTask={removeTask}
                      setFilter = {setFilter}/>
        </div>
    );
}

export default App;
