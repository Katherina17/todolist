import {TasksStateType, ValidTodoListType} from "../App";
import {addTodoListAC, removeTodoListAC, TodoListReducer} from "./todolists-reducer";
import {TaskPriorities, tasksReducer, TaskStatuses} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<ValidTodoListType> = []

    const action = addTodoListAC('new todolist')

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
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'HTML&CSS', todoListId: 'todolistId1'
            }, {
                addedDate: '', deadline: null, description: null, id: '2', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'REDUX', todoListId: 'todolistId1'
            },
        ],
        'todolistId2': [
            {
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Milk', todoListId: 'todolistId2'
            },
        ]
    }

    const action = removeTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
