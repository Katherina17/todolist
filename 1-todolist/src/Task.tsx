import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {IconButtonDeleteMemo} from "./Todolist";

export type TaskPropsType = {
    taskID: string;
    todoListID: string;
    checked: boolean;
    removeTask: (id: string, todoListID: string) => void;
    changeTaskStatus: (id: string, newIsDoneValue: boolean, todoListID: string) => void;
    title: string;
    changeTaskTitle: (id: string, newValue: string, todoListId: string) => void;
}


export const Task = memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.taskID, props.todoListID)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskID, newIsDoneValue, props.todoListID);
    }
    const onTitleChangeHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.taskID, newValue, props.todoListID);
    }, [props.changeTaskTitle, props.taskID, props.todoListID])
    return (
        <div className={props.checked ? "is-done" : ""}>
            <Checkbox
                checked={props.checked}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={props.title} onChange={onTitleChangeHandler}/>
            <IconButtonDeleteMemo onClickHandler={onClickHandler}/>
        </div>
    )
})
