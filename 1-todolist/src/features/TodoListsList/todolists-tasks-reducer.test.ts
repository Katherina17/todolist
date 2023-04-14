import {TasksStateType, ValidTodoListType} from "trash/App";
import {todoListActions, TodoListReducer, todoListThunks} from "./todolists-reducer";
import {TaskPriorities, tasksReducer, TaskStatuses} from "./tasks-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<ValidTodoListType> = []

    const action = todoListThunks.addTodoList.fulfilled(
        {todoList:{addedDate: '', id: '3437' , order: 5, title: "What to learn"}, newTodolistId: '3437' },
        'requestedID',
        {title: 'What to learn'})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = TodoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id
    expect(idFromTasks).toBe(action.payload.newTodolistId)
    expect(idFromTodolists).toBe(action.payload.newTodolistId)
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'HTML&CSS', todoListId: 'todolistId1', completed: false, entityStatus: 'idle'
            },
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'REACT', todoListId: 'todolistId1', completed: true, entityStatus: 'idle'
            },
        ],
        'todolistId2': [
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Milk', todoListId: 'todolistId2', completed: false, entityStatus: 'idle'
            },
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Juice', todoListId: 'todolistId2', completed: true, entityStatus: 'idle'
            },
        ],
    }

    const action = todoListThunks.deleteTodoList.fulfilled(
            {id: 'todolistId2'},
            'requestedId',
            {id: 'todolistId2'})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
