import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {TaskPriorities, tasksReducer, TaskStatuses} from "../../state/tasks-reducer";
import {TodoListReducer} from "../../state/todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodoListReducer
})

const initialGlobalState = {
    todolists: [
        {addedDate: '', id: 'todolistId1', order: 5, title: "What to learn", filter: "all"},
        {addedDate: '', id: 'todolistId2', order: 2, title: "What to buy", filter: "all"}
    ],
    tasks: {
        ['todolistId1']: [
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'HTML&CSS', todoListId: 'todolistId1', completed: true
            },
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'REACT', todoListId: 'todolistId1', completed: true
            },
        ],
        ['todolistId2']: [
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Milk', todoListId: 'todolistId2', completed: false
            },
            {
                addedDate: '', deadline: null, description: null, id: v1(), order: 10, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: 'Juice', todoListId: 'todolistId2', completed: true
            },
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}