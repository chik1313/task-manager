import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import UniversalSpan from "./UniversalSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "./App/api/todolists-api";

type TaskPropsType = {
    todolistId: string
    task: any
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

    return <ListItem key={props.task.id} className={props.task.status ===  TaskStatuses.Completed ? 'is-done' : ''}>
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
