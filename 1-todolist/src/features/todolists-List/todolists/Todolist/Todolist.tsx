import React, {FC, memo, useEffect} from 'react';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {tasksThunks} from "features/todolists-List/todolists/Todolist/Tasks/Task/tasks-reducer";
import {todoListActions} from "features/todolists-List/todolists/todolists-reducer";
import {RequestStatusType} from "app/appReducer";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {FilterValuesType} from "common/api/common.api";
import {useActions} from "common/hooks";
import {FilterTasksButtons} from "features/todolists-List/todolists/Todolist/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/todolists-List/todolists/Todolist/Tasks/Tasks";
import {TodolistTitle} from "features/todolists-List/todolists/Todolist/TodolistTitle/TodolistTitle";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const Todolist:FC<PropsType> = memo((
    {   id,
        title,
        entityStatus,
        filter}) => {

    const {getTasks, addTask} = useActions(tasksThunks)
    const {changeEntityStatus} = useActions(todoListActions)

    useEffect(() => {
        getTasks(id)
    }, [])

    const addTaskCallBack = (title: string) => {
        changeEntityStatus({entityStatus: 'loading', id: id})
        return addTask({todolistId: id, title: title}).unwrap();
    }

    return <div>
            <TodolistTitle id={id} title={title} entityStatus={entityStatus}/>
            <AddItemForm addItem={addTaskCallBack} disabled={entityStatus === 'loading'}/>
            <Tasks id={id} filter={filter}/>
            <div>
                <FilterTasksButtons filter={filter} id={id}/>
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


