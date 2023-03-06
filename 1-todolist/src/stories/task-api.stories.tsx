import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {taskAPI} from "../api/task-api";

export default {
    title: 'API'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = 'b6312150-4ffe-41e2-b32e-c4216529f203';
    useEffect(() => {
        taskAPI.getTasks(todolistID).then(response => {
            console.log(response)
                setState(response.data.items)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const title = 'C++'
    const todolistID = 'b6312150-4ffe-41e2-b32e-c4216529f203';
    useEffect(() => {
        taskAPI.createTask(todolistID, title).then(response => {
            setState(response.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = 'b6312150-4ffe-41e2-b32e-c4216529f203';
    const taskID = '2a6b9362-7ceb-4636-9d54-5c20cfe4a7d5'
    useEffect(() => {
        taskAPI.deleteTask(todolistID, taskID).then(res => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = 'b6312150-4ffe-41e2-b32e-c4216529f203';
    const taskID = '99a26920-fcb8-434d-ad2e-456ed4a0b6a3'
    const title = '.net'
    useEffect(() => {
       taskAPI.updateTaskTitle(todolistID, taskID, title).then(res => {
           setState(res.data)
       })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

