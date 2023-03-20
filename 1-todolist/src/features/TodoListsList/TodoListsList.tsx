import {FilterValuesType} from "../../trash/App";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "../../components/TodoList/Todolist";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    addTodoListsTC,
    changeFilterAC,
    getTodoListsTC,
    TodolistType,
    updateTodoListTitleTC
} from "./todolists-reducer";
import {addTaskTC, changeTaskTitleAC} from "./tasks-reducer";



export const TodoListLists = () => {
    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodoListsTC())
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterAC(value, todolistId))
    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(updateTodoListTitleTC(id, title))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListsTC(title));
    }, [])
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