import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {TaskWithRedux} from "./TaskWithRedux";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'TODOLIST/Task',
    component: Task,
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
const Template: ComponentStory<typeof Task> = (args) => <Task{...args} />;

export const TaskIsNotDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDone.args = {
    taskID: 'firstTask',
    todoListID: 'todoListID1',
    checked: false,
    title: 'bread',
        ...baseArgs
};


const Template1: ComponentStory<typeof Task> = (args) => <Task{...args} />;

export const TaskIsDone = Template1.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDone.args = {
    taskID: 'secondTask',
    todoListID: 'todoListID1',
    checked: true,
    title: 'milk',
    ...baseArgs
};