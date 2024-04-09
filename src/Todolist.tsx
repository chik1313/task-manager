import React, {ChangeEvent, useState} from "react";
import {FilteredValuesType} from "./App";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title: string,
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilteredValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle === '') {
            return
        }
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressEvent}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    const onRemoveHandler = () => props.removeTask(t.id)
                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, event.currentTarget.checked)
                    }
                    return <li key={t.id}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeStatusHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>-
                        </button>
                    </li>
                })
            }


        </ul>
        <div>
            <button onClick={onAllClickHandler}>All
            </button>
            <button onClick={onActiveClickHandler}>Active
            </button>
            <button onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
