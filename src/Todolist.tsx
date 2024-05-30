import React, {ChangeEvent} from "react";
import {FilteredValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import UniversalSpan from "./UniversalSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title: string,
    changeFilter: (value: FilteredValuesType, todolistId: string) => void
    filter: FilteredValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}
export const Todolist = (props: PropsType) => {
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()


    const onAllClickHandler = () => props.changeFilter('all', props.todolistId)
    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId)

    let todolistTasks = tasks;
    if (props.filter === 'active') {
        todolistTasks = tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
       todolistTasks = tasks.filter(t => t.isDone === true)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTask = (title: string) => {
        const action = addTaskAC(title, props.todolistId)
        dispatch(action)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }


    return <div>
        <h3><UniversalSpan title={props.title} changeTaskTitleHandler={changeTodolistTitle}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                todolistTasks.map((t) => {
                    const onRemoveHandler = () =>
                    dispatch(removeTaskAC(props.todolistId, t.id))
                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(t.id,
                            event.currentTarget.checked,
                            props.todolistId))
                    }
                    const changeTaskTitleHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(t.id, newTitle, props.todolistId))
                    }

                    return <ListItem key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox color={'success'}
                                  checked={t.isDone}
                                  onChange={changeStatusHandler}
                        />
                        <UniversalSpan title={t.title} changeTaskTitleHandler={changeTaskTitleHandler}/>
                        <IconButton onClick={onRemoveHandler}>
                            <Delete/>
                        </IconButton>
                    </ListItem>
                })
            }


        </List>
        <div>
            <Button onClick={onAllClickHandler}
                    variant={props.filter === 'all' ? 'contained' : 'text'}

            >All
            </Button>
            <Button onClick={onActiveClickHandler}
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
            >Active
            </Button>
            <Button onClick={onCompletedClickHandler}
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
            >Completed
            </Button>
        </div>
    </div>
}
