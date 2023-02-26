import {Button} from "../stories/Button";
import {ComponentMeta} from "@storybook/react";
import {AddItemForm} from "./AddItemForm";
import {action, actions} from "@storybook/addon-actions";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,

} as ComponentMeta<typeof AddItemForm>;

const callBack = action('you added a message')
const getMistake = action('Title is required')

export const AddItemFormBaseExample = () =>  <AddItemForm addItem={callBack}/>
export const AddItemFormWithMistake = () => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string>("Title is required")

    const addItem = () => {
        if (title.trim() !== "") {
            getMistake();
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={getMistake}>
            <AddBox/>
        </IconButton>
    </div>

}