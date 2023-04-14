import React, {useReducer, useState} from 'react';
import '../app/App.css';
import { Todolist} from '../common/components/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    tasksReducer,
    TaskType} from "../features/TodoListsList/tasks-reducer";
import {TodoListType} from "../common/api/todolist-api";
import {RequestStatusType} from "../app/appReducer";
import {TaskPriorities, TaskStatuses} from "common/enums/common.enums";



export type FilterValuesType = "all" | "active" | "completed";


export type ValidTodoListType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<ValidTodoListType>>([
        {addedDate: '', id: todolistId1, order: 5, title: "What to learn", filter: "all", entityStatus: 'idle'},
        {addedDate: '', id: todolistId2, order: 2, title: "What to buy", filter: "all", entityStatus: 'idle'}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                addedDate: '',
                deadline: null,
                description: null,
                id: v1(),
                order: 10,
                priority: TaskPriorities.Low,
                startDate: null,
                status: TaskStatuses.New,
                title: 'HTML&CSS',
                todoListId: todolistId1,
                completed: false,
                entityStatus: 'idle'
            },
            {
                addedDate: '',
                deadline: null,
                description: null,
                id: v1(),
                order: 10,
                priority: TaskPriorities.Low,
                startDate: null,
                status: TaskStatuses.New,
                title: 'REACT',
                todoListId: todolistId1,
                completed: true,
                entityStatus: 'idle'
            },
        ],
        [todolistId2]: [
            {
                addedDate: '',
                deadline: null,
                description: null,
                id: v1(),
                order: 10,
                priority: TaskPriorities.Low,
                startDate: null,
                status: TaskStatuses.New,
                title: 'Milk',
                todoListId: todolistId2,
                completed: false,
                entityStatus: 'idle'
            },
            {
                addedDate: '',
                deadline: null,
                description: null,
                id: v1(),
                order: 10,
                priority: TaskPriorities.Low,
                startDate: null,
                status: TaskStatuses.New,
                title: 'Juice',
                todoListId: todolistId2,
                completed: true,
                entityStatus: 'idle'
            },
        ],

    },);

    function removeTask(id: string, todolistId: string) {
       /* dispatchTasks(removeTaskAC(id,todolistId))*/
    }

    function addTask(title: string, todolistId: string) {

    }

    function changeStatus(id: string, status: number, todolistId: string) {
       /* dispatchTasks(changeTaskStatusAC(id, status, todolistId))*/
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
      /*  dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId))*/
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    /*    dispatchTasks(removeTodoListAC(id))*/
    }

    function changeTodolistTitle(id: string, title: string) {
        // найдём нужный todolist
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
       /* let newTodolist: ValidTodoListType = {addedDate: '', id: newTodolistId, order: 5, title: title, filter: "all"};
        setTodolists([newTodolist, ...todolists]);*/
       /* dispatchTasks(addTodoListAC(title))*/
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
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        filter={tl.filter}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        entityStatus={tl.entityStatus}
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

export default App;
