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
    filter:FilteredValuesType
}
export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string>('')
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (event.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
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
                   className={error ? 'error' : ""}
            />
            <button onClick={addTask}>+</button>
            {
                error &&
                <div className='error-message'>{error}</div>
            }
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    const onRemoveHandler = () => props.removeTask(t.id)
                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, event.currentTarget.checked)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
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
            <button onClick={onAllClickHandler}
            className={props.filter === 'all' ? 'active-filter' : ''}
            >All
            </button>
            <button onClick={onActiveClickHandler}
                    className={props.filter === 'active' ? 'active-filter' : ''}
            >Active
            </button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === 'completed' ? 'active-filter' : ''}
            >Completed
            </button>
        </div>
    </div>
}
