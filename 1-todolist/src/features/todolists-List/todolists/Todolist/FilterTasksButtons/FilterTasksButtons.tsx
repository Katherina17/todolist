import {Button} from "@mui/material";
import React, {FC, memo} from "react";
import {FilterValuesType} from "common/api/common.api";
import {useActions} from "common/hooks";
import {todoListActions} from "features/todolists-List/todolists/todolists-reducer";

type PropsType = {
    id: string,
    filter: FilterValuesType
}

export const FilterTasksButtons:FC<PropsType> = memo(({id, filter}) => {
    const {changeFilter} = useActions(todoListActions)

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeFilter({value: filter, id})
    }

    return (
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHandler('all')}
                    color={'inherit'}> All </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHandler('active')}
                    color={'primary'}> Active </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHandler('completed')}
                    color={'secondary'}> Completed </Button>
        </div>
    )
})