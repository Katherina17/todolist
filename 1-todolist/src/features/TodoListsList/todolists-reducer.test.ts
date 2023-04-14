import {v1} from "uuid";
import {FilterValuesType, ValidTodoListType} from "trash/App";
import {todoListActions, TodoListReducer, todoListThunks} from "./todolists-reducer";

let todolistId1:string;
let todolistId2:string;
let newTodolistTitle:string;

let startState: Array<ValidTodoListType> = [];

beforeEach(() => {
     todolistId1 = v1();
     todolistId2 = v1();
    newTodolistTitle = "New Todolist"
     startState= [
         {addedDate: '', id: todolistId1, order: 5, title: "What to learn", filter: "all", entityStatus: 'idle'},
         {addedDate: '', id: todolistId2, order: 2, title: "What to buy", filter: "all", entityStatus: 'idle'}
    ]
})


test('correct todolist should be removed', () => {
    const endState = TodoListReducer(startState,
        todoListThunks.deleteTodoList.fulfilled(
            {id: todolistId1},
            'requestedId',
            {id: todolistId1}))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const action = todoListThunks.addTodoList.fulfilled(
        {todoList: {addedDate: '', id: 'todolisst3', order: 5, title: "What to learn"},
        newTodolistId: 'todolist3'},
        'requestedId',
        {title: "What to learn"})

    const endState = TodoListReducer(startState, action)
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('What to learn');
});

test('correct todolist should change its name', () => {

    const action = todoListThunks.updateTodoListTitle.fulfilled({id: todolistId2, title: newTodolistTitle}, 'requestedId', {id: todolistId2, title: newTodolistTitle})
    const endState = TodoListReducer(startState, action);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";


    const endState = TodoListReducer(startState, todoListActions.changeFilter({id: todolistId2, value: newFilter}));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('entity status should be changed', () => {
    const endState = TodoListReducer(startState,
        todoListActions.changeEntityStatus({entityStatus: 'loading', id: todolistId2}));
    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe("loading");
});