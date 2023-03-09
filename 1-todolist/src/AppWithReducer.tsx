import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, TaskPriorities,
    tasksReducer, TaskStatuses
} from "./state/tasks-reducer";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    TodoListReducer
} from "./state/todolists-reducer";



export type FilterValuesType = "all" | "active" | "completed";


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodoList] = useReducer(TodoListReducer, [
        {addedDate: '', id: todolistId1, order: 5, title: "What to learn", filter: "all"},
        {addedDate: '', id: todolistId2, order: 2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'HTML&CSS', todoListId: todolistId1
            },
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'REACT', todoListId: todolistId1
            },
        ],
        [todolistId2]: [
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Milk', todoListId: todolistId2
            },
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Juice', todoListId: todolistId2
            },
        ],
    }, );

    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(id,todolistId))
    }

    function addTask(title: string, todolistId: string) {
      dispatchTasks(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, status: number, todolistId: string) {
        dispatchTasks(changeTaskStatusAC(id, status, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodoList(changeFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {
        dispatchTodoList(removeTodoListAC(id))
        dispatchTasks(removeTodoListAC(id))
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatchTodoList(changeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        let action =  addTodoListAC(title);
        dispatchTodoList(action);
        dispatchTasks(action)
    }
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
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === 0);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === 2);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
