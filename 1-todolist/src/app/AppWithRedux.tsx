import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoListLists} from "../features/TodoListsList/TodoListsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./appReducer";
import {CustomizedSnackbars} from "../components/ErrorSnakbar/ErrorSnackbar";


function AppWithRedux() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                    {status === 'loading'  && <LinearProgress color="secondary" />}
            </AppBar>
            <Container fixed>
                <TodoListLists/>
            </Container>
            <CustomizedSnackbars/>
        </div>
    );
}

export default AppWithRedux;
