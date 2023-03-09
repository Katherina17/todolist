import {IconButtonDeleteMemo} from "./Todolist";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import React from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskStatuses, TaskType} from "../state/tasks-reducer";

type TaskWithReduxPropsType = {
    task: TaskType,
    todoListId: string
}

export const TaskWithRedux = ({task, todoListId}: TaskWithReduxPropsType) => {
    const dispatch = useDispatch();
    const onTitleChangeHandler =  (newValue: string) => {
       dispatch(changeTaskTitleAC(task.id, newValue, todoListId))
    }
    const onClickHandler = () => dispatch(removeTaskAC(task.id, todoListId))
    return(
        <div className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                onChange={() => dispatch(changeTaskStatusAC(task.id, task.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed, todoListId))}
            />
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButtonDeleteMemo onClickHandler={onClickHandler}/>
        </div>
    )
}