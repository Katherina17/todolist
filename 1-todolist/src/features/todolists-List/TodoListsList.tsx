import {Grid, Paper} from "@mui/material";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {todoListThunks} from "features/todolists-List/todolists/todolists-reducer";
import {Navigate} from "react-router-dom";
import * as authSelectors from '../Login/authSelectors'
import * as todoListListsSelectors from './todoListsSelectors'
import {AddItemForm, Todolist} from "common/components";
import {useActions} from "common/hooks";

export const TodoListLists = () => {
    const {getTodoLists, addTodoList} = useActions(todoListThunks);

    let todolists = useSelector(todoListListsSelectors.todolists);
    const isLoggedIn = useSelector(authSelectors.isLoggedIn);

    useEffect(() => {
        if(!isLoggedIn){
            return;
        }
       getTodoLists({})
    }, [])

    const addTodolistCallBack = (title: string) => addTodoList({title: title}).unwrap();
    if(!isLoggedIn){
        return <Navigate to={'/Login'}/>
    }
    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolistCallBack}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    return <Grid key={tl.id} item>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                entityStatus={tl.entityStatus}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    )
}