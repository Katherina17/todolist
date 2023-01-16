import {ChangeEvent, useState} from "react";

type PropsType = {
    title: string;
    callBack: (newTitle: string) => void;
}

export const EditableSpan = (props: PropsType) => {
    const[edit, setEdit] = useState(false);
    const[newTitle, setNewTitle] = useState(props.title);
    const onDoubleClickHandler = () => {
        setEdit(!edit);
        addTask();
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    const addTask = () => {
        props.callBack(newTitle)
    }

    return(
        edit ? <input type={'text'} value={newTitle}
                      onBlur={onDoubleClickHandler}
                      autoFocus
                      onChange={onChangeInputHandler}
            />
                : <span onDoubleClick={onDoubleClickHandler}> {props.title}</span>
    )
}