import {FilterValuesType} from "trash/App";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "components/TodoList/Todolist";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import {useSelector} from "react-redux";
import {useAppDispatch} from "app/store";
import {todoListActions, todoListThunks} from "./todolists-reducer";
import {tasksThunks} from "./tasks-reducer";
import {Navigate} from "react-router-dom";
import * as authSelectors from '../Login/authSelectors'
import * as todoListListsSelectors from './todoListsSelectors'



export const TodoListLists = () => {
    useEffect(() => {
        dispatch(todoListThunks.getTodoLists())
    }, [])

    let todolists = useSelector(todoListListsSelectors.todolists)
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(authSelectors.isLoggedIn)
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(tasksThunks.addTask({todolistId: todolistId, title: title}))
    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(tasksThunks.updateTaskTitle({id:id, title: newTitle, todoListId: todolistId}))
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(todoListActions.changeFilter({value: value, id: todolistId}))
    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(todoListThunks.updateTodoListTitle({id: id, title: title}))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(todoListThunks.addTodoList({title: title}));
    }, [])
    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }
    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    return <Grid key={tl.id} item>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                filter={tl.filter}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                entityStatus={tl.entityStatus}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    )
}