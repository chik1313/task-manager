import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import UniversalSpan from "./UniversalSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const onRemoveHandler = () =>
        dispatch(removeTaskAC(props.todolistId, props.task.id))
    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id,
            event.currentTarget.checked,
            props.todolistId))
    }
    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newTitle, props.todolistId))
    }, [props.todolistId, props.task.id])

    return <ListItem key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox color={'success'}
                  checked={props.task.isDone}
                  onChange={changeStatusHandler}
        />
        <UniversalSpan title={props.task.title} changeTaskTitleHandler={changeTaskTitleHandler}/>
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </ListItem>
});

export default Task;
