import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState} from 'react';
import {FilterValueType} from "./App";


type TodoListProps = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (id: string) => void,
    setFilter: (filter: FilterValueType) => void,
    addTask: (title: string) => void
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}


const TodoList = (props: TodoListProps) => {
    const [title, setTitle] = useState<string>('');
    const resultedTask = props.tasks.length ? props.tasks.map(t => {
        const onClickRemoveTaskHandler = () => props.removeTask(t.id);
        return (<li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickRemoveTaskHandler}>x</button>
        </li>)
    }) : <span> Nothing to load!</span>;

    const onClickAddTaskToTodoListHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    const onChangeSetLocalTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const onKeyDownAddTaskToTodoListHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTaskToTodoListHandler();

    const getOnClickSetFilteredHandler = (filter: FilterValueType) => () => props.setFilter(filter);
return (
    <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeSetLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskToTodoListHandler}/>
            <button onClick={onClickAddTaskToTodoListHandler}>+
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