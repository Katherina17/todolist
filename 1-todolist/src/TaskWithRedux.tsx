import {IconButtonDeleteMemo, TaskType} from "./Todolist";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

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
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={() => dispatch(changeTaskStatusAC(task.id, !task.isDone, todoListId))}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButtonDeleteMemo onClickHandler={onClickHandler}/>
        </div>
    )
}