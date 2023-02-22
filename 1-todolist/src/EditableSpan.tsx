import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, memo, useCallback, useState} from 'react';


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(props.value);
    }, [props.value])
    const activateViewMode = useCallback(() => {
        setEditMode(false);
        props.onChange(title);
    }, [props.onChange])
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant="outlined"
                     value={title} onChange={changeTitle}
                     autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})