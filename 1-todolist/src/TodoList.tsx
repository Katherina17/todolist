import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState, MouseEvent} from 'react';
import {FilterValueType} from "./App";


type TodoListProps = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (id: string) => void,
    setFilter: (filter: FilterValueType) => void,
    addNewTask: (title: string) => void

}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}


const TodoList = (props: TodoListProps) => {
    const [title, setTitle] = useState<string>('');

    const resultedTask = props.tasks.length ? props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id);
        return (<li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={removeTaskHandler}>x</button>
        </li>)
    }) : <span> Nothing to load!</span>;
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const addNewTask = () => {
        props.addNewTask(title);
        setTitle('');
    }

    const addNewTaskInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.code === 'Enter')  addNewTask();
    }

    const addNewTaskButtonHandler = () => addNewTask();

    const getOnClickSetFilteredHandler = (filter: FilterValueType) => () => props.setFilter(filter);
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyDown={addNewTaskInputHandler}
                   />
                <button onClick={addNewTaskButtonHandler}>+
                </button>
            </div>
            <ul>
                {resultedTask}
            </ul>
            <div>
                <button onClick={getOnClickSetFilteredHandler('all')}>All</button>
                <button onClick={getOnClickSetFilteredHandler('active')}>Active</button>
                <button onClick={getOnClickSetFilteredHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;