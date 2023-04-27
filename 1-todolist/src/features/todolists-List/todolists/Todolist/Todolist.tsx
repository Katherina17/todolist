import React, {FC, memo, useEffect} from 'react';
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Task} from "features/todolists-List/Task/Task";
import {tasksThunks, TaskType} from "features/todolists-List/Task/tasks-reducer";
import { useSelector} from "react-redux";
import {todoListActions, todoListThunks} from "features/todolists-List/todolists/todolists-reducer";
import {RequestStatusType} from "app/appReducer";
import * as todolistSelectors from 'features/todolists-List/todolists/todolistsSelectors'
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {TaskStatuses} from "common/enums/common.enums";
import {FilterValuesType} from "common/api/common.api";
import {useActions} from "common/hooks";
import {FilterTasksButtons} from "features/todolists-List/todolists/FilterTasksButtons/FilterTasksButtons";

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

    let tasks = useSelector(todolistSelectors.tasks)[id];

    const {getTasks, addTask} = useActions(tasksThunks)
    const {updateTodoListTitle, deleteTodoList} = useActions(todoListThunks)
    const {changeEntityStatus} = useActions(todoListActions)

    useEffect(() => {
        getTasks(id)
    }, [])

    if (filter === "active") {
        tasks = tasks.filter((t: TaskType) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasks = tasks.filter((t: TaskType) => t.status === TaskStatuses.Completed);
    }

    const addTaskCallBack = (title: string) => {
        addTask({todolistId: id, title: title})
        changeEntityStatus({entityStatus: 'loading', id: id})
    }

    const removeTodolistHandler = () => deleteTodoList({id: id})

    const changeTodolistTitle = (title: string) => updateTodoListTitle({id, title})

    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === 'loading'}/>
            <IconButtonDeleteMemo onClickHandler={removeTodolistHandler} disabled={entityStatus === 'loading'}/>
        </h3>
        <AddItemForm addItem={addTaskCallBack} disabled={entityStatus === 'loading'}/>
        <div>
            {
                tasks.length !== 0 ? tasks.map((t: TaskType) => {
                    return <Task key={t.id} task={t} todoListId={id}/>
                }) : <p> sorry, no tasks </p>
            }

        </div>
        <div style={{padding: '10px'}}>
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


