import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodoList()
            .then((response) => {
              setState(response.data)
          })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'javaScript'
    useEffect(() => {
        todolistAPI.createTodoList(title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = '9cc221b6-9966-4eb3-b895-32b9984bc904'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistID)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = '9cc221b6-9966-4eb3-b895-32b9984bc904'
    const title = 'juice'
    useEffect(() => {
       todolistAPI.updateTodolistTitle(todolistID, title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

