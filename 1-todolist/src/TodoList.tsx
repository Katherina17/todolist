import React from 'react';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    title: string,
    tasks:  Array <TaskType>,
    removeTasks: (taskId: number) => void;
    changeFilter: (filter: FilterValuesType) => void;
}

 export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}



const TodoList = (props: TodoListPropsType) => {
    const taskItems = props.tasks.length ?
         props.tasks.map( (task: TaskType) => {
        return (
            <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => {props.removeTasks(task.id)}}>x</button>
        </li>
        )
         })
             : <span> Tasks list is empty </span>

    return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {taskItems}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter('all')}>All</button>
                    <button onClick={() => props.changeFilter('active')}>Active</button>
                    <button onClick={() => props.changeFilter('completed')}>Completed</button>
                </div>
            </div>
    );
};

export default TodoList;