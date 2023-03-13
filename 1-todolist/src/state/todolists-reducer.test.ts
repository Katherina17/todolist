import {v1} from "uuid";
import {FilterValuesType, ValidTodoListType} from "../App";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    TodoListReducer
} from "./todolists-reducer";

let todolistId1:string;
let todolistId2:string;
let newTodolistTitle:string;

let startState: Array<ValidTodoListType> = [];

beforeEach(() => {
     todolistId1 = v1();
     todolistId2 = v1();
    newTodolistTitle = "New Todolist"
     startState= [
         {addedDate: '', id: todolistId1, order: 5, title: "What to learn", filter: "all"},
         {addedDate: '', id: todolistId2, order: 2, title: "What to buy", filter: "all"}
    ]
})


test('correct todolist should be removed', () => {
    const endState = TodoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const endState = TodoListReducer(startState, addTodoListAC( {addedDate: '', id: todolistId1, order: 5, title: "What to learn"}, '1todoList'))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    const endState = TodoListReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";


    const endState = TodoListReducer(startState, changeFilterAC(newFilter,todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});