import {
    TaskPriorities, tasksActions,
    tasksReducer,
    TaskStatuses, tasksThunks, TaskType
} from './tasks-reducer'
import {TasksStateType} from 'trash/App'
import {todoListActions, todoListThunks} from "features/TodoListsList/todolists-reducer";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'HTML&CSS', todoListId: 'todolistId1', completed: true, entityStatus: 'idle'
            }, {
                addedDate: '', deadline: null, description: null, id: '2', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'REDUX', todoListId: 'todolistId1', completed: true, entityStatus: 'idle'
            },
        ],
        'todolistId2': [
            {
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Milk', todoListId: 'todolistId2', completed: false, entityStatus: 'idle'
            },
        ]
    }
})


test('correct task should be deleted from correct array', () => {
    const action = tasksThunks.deleteTask.fulfilled({id: '2', todoListId: 'todolistId1'}, 'requestedId',{id: '2', todoListId: 'todolistId1'} )
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        'todolistId1': [
            {
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'HTML&CSS', todoListId: 'todolistId1', completed: true, entityStatus: 'idle'
            }
        ],
        'todolistId2': [
            {
                addedDate: '', deadline: null, description: null, id: '1', order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Milk', todoListId: 'todolistId2', completed: false, entityStatus: 'idle'
            }
        ]
    })
})

test('correct task should be added to correct array', () => {

    const task: TaskType = {
        addedDate: '', deadline: null, description: null, id: '3', order: 10, priority: TaskPriorities.Low,
        startDate: null, status: TaskStatuses.New, title: 'juice', todoListId: 'todolistId1', completed: true, entityStatus: 'idle'
    }
    const action = tasksThunks.addTask.fulfilled({task}, 'requestedId', {title: task.title, todolistId: task.todoListId})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(1)
    expect(endState['todolistId1'][0].id).toBeDefined()
    expect(endState['todolistId1'][0].title).toBe('juice')
    expect(endState['todolistId1'][0].status).toBe(0)
})

test('status of specified task should be changed', () => {
    const action = tasksThunks.updateTaskStatus.fulfilled( {id: '1', status:2, todoListId: 'todolistId2'},'requestedId', {id: '1', status:2, todoListId: 'todolistId2'})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].status).toBe(2)
    expect(endState['todolistId1'][0].status).toBe(0)
})

test('a title of specified task should be changed', () => {
    const action = tasksThunks.updateTaskTitle.fulfilled({id: '1', newTitle: 'HTML', todoListId: 'todolistId1'}, 'requestedId', {id: '1', title: 'HTML&CSS', todoListId: 'todolistId1'})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].title).toBe('HTML')
    expect(endState['todolistId2'][0].title).toBe('Milk')
})

test('new array should be added when new todolist is added', () => {
    const action = todoListThunks.addTodoList.fulfilled({newTodolistId: '32423',
        todoList: {addedDate: '', id: 'todolists11', order: 5, title: "What to learn"}}, 'requestedId', {title: 'What to learn'})
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('entity status should be changed', () => {
    const endState = tasksReducer(startState, tasksActions.changeEntityTaskStatus({entityStatus: 'loading', id: '2', todolistId:'todolistId1'}));
    expect(endState['todolistId1'][0].entityStatus).toBe('idle')
    expect(endState['todolistId1'][1].entityStatus).toBe('loading')
    expect(endState['todolistId2'][0].entityStatus).toBe('idle')

});

