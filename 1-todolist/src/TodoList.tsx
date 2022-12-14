import React from 'react';
import {FilterValueType} from "./App";


type TodoListProps = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (id: number) => void,
    setFilter: (filter: FilterValueType) => void
}

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}


const TodoList = (props: TodoListProps) => {
   const resultedTask =  props.tasks.length ? props.tasks.map(t => {
        return(<li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => props.removeTask(t.id)}>x</button>
        </li>)
    }) : <span> Nothing to load!</span>;
    return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {resultedTask}
                </ul>
                <div>
                    <button onClick={() => props.setFilter('all')}>All</button>
                    <button onClick={() => props.setFilter('active')}>Active</button>
                    <button onClick={() => props.setFilter('completed')}>Completed</button>
                </div>
            </div>
    );
};

export default TodoList;