import {IconButtonDeleteMemo} from "features/TodoListsList/TodoList/Todolist";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import React from "react";
import {tasksThunks,
    TaskType,
} from "features/TodoListsList/tasks-reducer";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {TaskStatuses} from "common/enums/common.enums";

type TaskWithReduxPropsType = {
    task: TaskType,
    todoListId: string
    disabled?: boolean
}

export const Task = ({task, todoListId}: TaskWithReduxPropsType) => {
    const dispatch = useAppDispatch();
    const onTitleChangeHandler =  (newValue: string) => {
       dispatch(tasksThunks.updateTaskTitle({id: task.id, title: newValue, todoListId: todoListId}))
    }

    const onClickHandler = () => dispatch(tasksThunks.deleteTask({id: task.id, todoListId: todoListId}))
    return(
        <div className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                disabled={task.entityStatus === 'loading'}
                onChange={() =>
                    dispatch(tasksThunks.updateTaskStatus(
                        {id: task.id,
                            status: task.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed,
                            todoListId: todoListId}
                    ))}
            />
            <EditableSpan value={task.title} onChange={onTitleChangeHandler} disabled={task.entityStatus === 'loading'}/>
            <IconButtonDeleteMemo onClickHandler={onClickHandler} disabled={task.entityStatus === 'loading'}/>
        </div>
    )
}