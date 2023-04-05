import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoListLists} from "features/TodoListsList/TodoListsList";
import {useSelector} from "react-redux";
import {useAppDispatch} from "./store";
import {CustomizedSnackbars} from "components/ErrorSnakbar/ErrorSnackbar";
import {Login} from "features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {initializeAppTC, logOutTC} from "features/Login/auth-reducer";
import * as appSelectors from './appSelectors'
import * as authSelectors from '../features/Login/authSelectors'


function AppWithRedux() {
    const status = useSelector(appSelectors.status);
    const isLoggedIn = useSelector(authSelectors.isLoggedIn)
    const isInitialized = useSelector(appSelectors.isInitialized)
    const userLogin = useSelector(appSelectors.userLogin)

    const dispatch = useAppDispatch();


    const onClickLogOutHandler = () => {
        dispatch(logOutTC())
    }
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        {isLoggedIn && userLogin}
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={onClickLogOutHandler}>LogOut</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodoListLists/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}> 404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
            <CustomizedSnackbars/>
        </div>
    );
}

export default AppWithRedux;
