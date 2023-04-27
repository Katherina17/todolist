import React, {FC, memo} from "react";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {IconButtonDeleteMemo} from "features/todolists-List/todolists/Todolist/Todolist";
import {useActions} from "common/hooks";
import {todoListThunks} from "features/todolists-List/todolists/todolists-reducer";
import {RequestStatusType} from "app/appReducer";

type PropsType = {
    id: string
    title: string
    entityStatus: RequestStatusType
}

export const TodolistTitle:FC<PropsType> = memo(({title, id, entityStatus}) => {

    const {deleteTodoList, updateTodoListTitle} = useActions(todoListThunks)

    const removeTodolistHandler = () => deleteTodoList({id: id})

    const changeTodolistTitle = (title: string) => updateTodoListTitle({id, title})

    return (
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === 'loading'}/>
            <IconButtonDeleteMemo onClickHandler={removeTodolistHandler} disabled={entityStatus === 'loading'}/>
        </h3>
    )
})