import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState, MouseEvent} from 'react';
import {FilterValueType} from "./App";


type TodoListProps = {
    title: string,
    tasks: Array<TasksType>,
    removeTask: (id: string) => void,
    setFilter: (filter: FilterValueType) => void,
    addNewTask: (title: string) => void;
    changeStatus: (taskId: string, isDone: boolean) => void;
    filter: FilterValueType

}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}


const TodoList = (props: TodoListProps) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string>('');

    const resultedTask = props.tasks.length ? props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id);
        const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked);
        const isDoneClasses = t.isDone ? 'isDone' : 'notIsDone';
        return (<li key={t.id}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeCheckbox}/>
            <span className={isDoneClasses}>{t.title}</span>
            <button onClick={removeTaskHandler}>x</button>
        </li>)
    }) : <span> Nothing to load!</span>;
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError('');
    }

    const addNewTask = () => {
        let trimmedTitle = title.trim();
        if(trimmedTitle){
            props.addNewTask(trimmedTitle)
        } else {
            setError('Ошибка! Введите значение')
        }
        setTitle('');
    }

    const addNewTaskInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.code === 'Enter')  addNewTask();
    }

    const addNewTaskButtonHandler = () => addNewTask();

    const getOnClickSetFilteredHandler = (filter: FilterValueType) => () => props.setFilter(filter);
    const errorMessage = <p style={{color: 'hotpink', margin: '0'}}>Please, enter task</p>
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyDown={addNewTaskInputHandler}
                    className={error ? 'inputError' : ''}
                   />
                <button onClick={addNewTaskButtonHandler}>+
                </button>
                {error && errorMessage}
            </div>
            <ul>
                {resultedTask}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''}
                        onClick={getOnClickSetFilteredHandler('all')}>All</button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={getOnClickSetFilteredHandler('active')}>Active</button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={getOnClickSetFilteredHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;