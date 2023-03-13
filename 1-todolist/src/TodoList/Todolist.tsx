import React, {memo, useCallback, useEffect} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {TaskWithRedux} from "./TaskWithRedux";
import {addTaskTC, getTasksTC, TaskStatuses} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TasksStateType} from "../AppWithRedux";
import {deleteTodoListsTC} from "../state/todolists-reducer";



type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)[props.id];
    let dispatch:any = useDispatch();
    useEffect(() => {
        dispatch(getTasksTC(props.id))
    }, [])

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }


    const addTask = useCallback( (title: string) => {
        dispatch(addTaskTC(title, props.id))
    }, [props.id])

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodoListsTC(props.id))
    }, [props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)}, [props.id, props.changeTodolistTitle]);


    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButtonDeleteMemo onClickHandler={removeTodolist}/>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.length !== 0 ? tasks.map(t => {
                    return <TaskWithRedux key={t.id} task={t} todoListId={props.id}/>
                }) : 'sorry, no tasks'
            }

        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


type IconButtonDeleteMemoPropsType = {
    onClickHandler: () => void
}

export const IconButtonDeleteMemo = memo(({onClickHandler}: IconButtonDeleteMemoPropsType) => {
    return <IconButton onClick={onClickHandler}>
        <Delete />
    </IconButton>
})


