import {IconButtonDeleteMemo} from "features/todolists-List/todolists/todolist/Todolist";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "common/components/editableSpan/EditableSpan";
import React from "react";
import {tasksThunks, TaskType} from "features/todolists-List/task/tasks-reducer";
import {TaskStatuses} from "common/enums/common.enums";
import {useActions} from "common/hooks";
import s from './task.module.css'

type PropsType = {
    task: TaskType,
    todoListId: string
    disabled?: boolean
}

export const Task = ({task, todoListId}: PropsType) => {

    const {deleteTask, updateTaskTitle, updateTaskStatus} = useActions(tasksThunks)

    const changeTitleHandler =  (newTitle: string) => {
      updateTaskTitle({id: task.id, title: newTitle, todoListId: todoListId})
    }

    const updateTaskStatusHandler = () => {
        updateTaskStatus(
            {id: task.id,
                status: task.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed,
                todoListId: todoListId}
        )
    }

    const removeTaskHandler = () => deleteTask({id: task.id, todoListId: todoListId})
    return(
        <div className={task.status === TaskStatuses.Completed ? s.done : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                disabled={task.entityStatus === 'loading'}
                onChange={updateTaskStatusHandler}
            />
            <EditableSpan value={task.title} onChange={changeTitleHandler} disabled={task.entityStatus === 'loading'}/>
            <IconButtonDeleteMemo onClickHandler={removeTaskHandler} disabled={task.entityStatus === 'loading'}/>
        </div>
    )
}