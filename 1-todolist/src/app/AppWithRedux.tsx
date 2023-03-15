import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoListLists} from "../features/TodoListsList/TodoListsList";


function AppWithRedux() {
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
            </AppBar>
            <Container fixed>
                    <TodoListLists/>
            </Container>
        </div>
    );
}

export default AppWithRedux;
