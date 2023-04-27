import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, FC, memo, useState} from 'react';


type PropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan:FC<PropsType> = memo(({value, disabled, onChange}) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant="outlined"
                     value={title} onChange={changeTitle}
                     autoFocus onBlur={activateViewMode} disabled={disabled} />
        : <span onDoubleClick={activateEditMode}>{value}</span>
})
