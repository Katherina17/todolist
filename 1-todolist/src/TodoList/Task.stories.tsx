import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {TaskWithRedux} from "./TaskWithRedux";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../state/tasks-reducer";

export default {
    title: 'TODOLIST/Task',
    component: TaskWithRedux,
} as ComponentMeta<typeof TaskWithRedux>;


const changeTaskStatus = action('you changes the task status')
const changeTaskTitle= action('you changes the task title')
const deleteTask = action('you deleted the task')

const baseArgs = {
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle,
    removeTask: deleteTask
}
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux{...args} />;

export const TaskIsNotDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDone.args = {
    todoListId: 'todoListID1',
    task: {addedDate: '',
        deadline: null,
        description: null,
        id: '515',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: null,
        status: TaskStatuses.New,
        title: 'bread',
        todoListId: 'todoListID1',
        completed: true
    },
        ...baseArgs
};


const Template1: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux{...args} />;

export const TaskIsDone = Template1.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDone.args = {
    todoListId: 'todoListID2',
    task: {addedDate: '',
        deadline: null,
        description: null,
        id: '515',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: null,
        status: TaskStatuses.New,
        title: 'juice',
        todoListId: 'todoListID2',
        completed: false
    },
    ...baseArgs
};