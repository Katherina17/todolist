import React, {memo, useCallback, useEffect} from 'react';
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Task} from "features/TodoListsList/TodoList/Task/Task";
import {tasksThunks, TaskType} from "features/TodoListsList/tasks-reducer";
import { useSelector} from "react-redux";
import {todoListActions, todoListThunks} from "features/TodoListsList/todolists-reducer";
import {RequestStatusType} from "app/appReducer";
import * as todolistSelectors from 'features/TodoListsList/TodoList/todolistSelectors'
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {TaskStatuses} from "common/enums/common.enums";
import {FilterValuesType} from "common/api/common.api";



type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    entityStatus: RequestStatusType
}

export const Todolist = memo((props: PropsType) => {
    let tasks = useSelector(todolistSelectors.tasks)[props.id];
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(tasksThunks.getTasks(props.id))
    }, [])

    if (props.filter === "active") {
        tasks = tasks.filter((t: TaskType) => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter((t: TaskType) => t.status === TaskStatuses.Completed);
    }

    const addTask = useCallback( (title: string) => {
        dispatch(tasksThunks.addTask({todolistId: props.id, title: title}))
        dispatch(todoListActions.changeEntityStatus({entityStatus: 'loading', id: props.id}))
    }, [props.id])

    const removeTodolist = useCallback(() => {
        dispatch(todoListThunks.deleteTodoList({id: props.id}))
    }, [props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)}, [props.id, props.changeTodolistTitle]);


    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} disabled={props.entityStatus === 'loading'}/>
            <IconButtonDeleteMemo onClickHandler={removeTodolist} disabled={props.entityStatus === 'loading'}/>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
        <div>
            {
                tasks.length !== 0 ? tasks.map((t: TaskType) => {
                    return <Task key={t.id} task={t} todoListId={props.id}/>
                }) : <p> sorry, no tasks </p>
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
    onClickHandler: () => void,
    disabled?: boolean
}

export const IconButtonDeleteMemo = memo(({onClickHandler, disabled}: IconButtonDeleteMemoPropsType) => {
    return <IconButton onClick={onClickHandler} disabled={disabled}>
        <Delete />
    </IconButton>
})


