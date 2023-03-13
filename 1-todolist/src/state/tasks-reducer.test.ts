import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, TaskPriorities,
    tasksReducer,
    TaskStatuses
} from './tasks-reducer'
import {TasksStateType} from '../App'
import {addTodoListAC} from "./todolists-reducer";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'HTML&CSS', todoListId: 'todolistId1', completed: true
            }, {
                addedDate: '', deadline: null, description: null, id: '2', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'REDUX', todoListId: 'todolistId1', completed: true
            },
        ],
        'todolistId2': [
            {
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Milk', todoListId: 'todolistId2', completed: false
            },
        ]
    }
})


test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId1')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'HTML&CSS', todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Milk', todoListId: 'todolistId2'
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
        startDate: null, status: TaskStatuses.New, title: 'juice', todoListId: 'todolistId1', completed: true
    })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(0)
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('1', 2, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].status).toBe(2)
    expect(endState['todolistId1'][0].status).toBe(0)
})

test('a title of specified task should be changed', () => {
    const action = changeTaskTitleAC('1', 'HTML', 'todolistId1')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].title).toBe('HTML')
    expect(endState['todolistId2'][0].title).toBe('Milk')
})

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC( {addedDate: '', id: 'tdolists1', order: 5, title: "What to learn"}, '32423')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

