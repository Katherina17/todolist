import {useSelector} from "react-redux";
import * as todolistSelectors from "features/todolists-List/todolists/todolistsSelectors";
import React, {FC, memo} from "react";
import {FilterValuesType} from "common/api/common.api";
import {TaskType} from "features/todolists-List/todolists/Todolist/Tasks/Task/tasks-reducer";
import {TaskStatuses} from "common/enums";
import {Task} from "features/todolists-List/todolists/Todolist/Tasks/Task/Task";

type PropsType = {
    id: string,
    filter: FilterValuesType
}

export const Tasks:FC<PropsType> = memo(({id, filter}) => {
    let tasks = useSelector(todolistSelectors.tasks)[id];

    if (filter === "active") {
        tasks = tasks.filter((t: TaskType) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasks = tasks.filter((t: TaskType) => t.status === TaskStatuses.Completed);
    }
    return (
        <div>
            {
                tasks.length !== 0 ? tasks.map((t: TaskType) => {
                    return <Task key={t.id} task={t} todoListId={id}/>
                }) : <p> no tasks </p>
            }

        </div>
    )
})