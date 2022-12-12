import React, {useEffect} from 'react';
import './App.css';
import TodoList, {TaskType}from "./TodoList";
import {useState} from "react";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const todoListTitle_1: string = 'What to learn';
    const todoListTitle_2: string = 'What to buy';
    const [tasks_1, setTasks] = useState([{id: 1, title: "HTML & CSS", isDone: true},
                        {id: 2, title: "ES6 & TS", isDone: true},
                        {id: 3, title: "REACT", isDone: false},
                        {id: 4, title: "ANGULAR", isDone: true}]);
    //function

    const tasks_2: Array<TaskType> = [
        {id: 1, title: "juice", isDone: true},
        {id: 2, title: "carrot", isDone: false},
        {id: 3, title: "orange", isDone: false},
        {id: 4, title: "milk", isDone: true},
    ];

    const [filter, setFilter] = useState<FilterValuesType>("active");


    const removeTask = (taskId: number) => {
        setTasks(tasks_1.filter(t => t.id !== taskId)); //уходит 5-10мс
        console.log(tasks_1) // почему показывает 4, хотя должно быть 3. не обновляет state синхронно.
        // поэтому мы выкидываем предыдущий state, так как state работает асинхронно
    };

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    const getFilteredTasksForRender= () => {
        let tasksForRender;
        switch(filter){
            case "active":
                return tasks_1.filter(t => t.isDone === false);
            case "completed":
                return tasks_1.filter(t => t.isDone === true);
            default:
                return tasks_1;
        }

        return tasksForRender;
    }

    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender();

/*    useEffect(() => {
        console.log(tasks_1)
    }, [tasks_1]); //работает синхронно*/

    return (
        <div className="App">
            <TodoList title={todoListTitle_1}  tasks={filteredTasksForRender} removeTasks={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
