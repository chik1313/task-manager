import React, {useCallback} from "react";
import {FilteredValuesType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import UniversalSpan from "./UniversalSpan";
import {Button, IconButton, List} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import Task from "./Task";

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
export const Todolist = React.memo((props: PropsType) => {
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()


    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolistId), [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolistId), [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolistId), [props.changeFilter, props.todolistId])

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
    const addTask = useCallback((title: string) => {
        const action = addTaskAC(title, props.todolistId)
        dispatch(action)
    }, [props.todolistId])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }, [props.changeTodolistTitle, props.todolistId])


    return <div>
        <h3><UniversalSpan title={props.title} changeTaskTitleHandler={changeTodolistTitle}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                todolistTasks.map((t) => <Task
                    todolistId={props.todolistId}
                    task={t}
                    key={t.id}
                />)
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
})
