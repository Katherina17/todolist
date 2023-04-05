import {IconButtonDeleteMemo} from "../Todolist";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import React from "react";
import {deleteTaskTC,
    TaskStatuses,
    TaskType, updateTaskStatusTC, updateTaskTitleTC
} from "features/TodoListsList/tasks-reducer";
import {useAppDispatch} from "app/store";

type TaskWithReduxPropsType = {
    task: TaskType,
    todoListId: string
    disabled?: boolean
}

export const TaskWithRedux = ({task, todoListId}: TaskWithReduxPropsType) => {
    const dispatch = useAppDispatch();
    const onTitleChangeHandler =  (newValue: string) => {
       dispatch(updateTaskTitleTC(task.id, newValue, todoListId))
    }

    const onClickHandler = () => dispatch(deleteTaskTC(task.id, todoListId))
    return(
        <div className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                disabled={task.entityStatus === 'loading'}
                onChange={() => dispatch(updateTaskStatusTC(task.id, task.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed, todoListId))}
            />
            <EditableSpan value={task.title} onChange={onTitleChangeHandler} disabled={task.entityStatus === 'loading'}/>
            <IconButtonDeleteMemo onClickHandler={onClickHandler} disabled={task.entityStatus === 'loading'}/>
        </div>
    )
}