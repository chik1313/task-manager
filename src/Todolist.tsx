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
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilteredValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilteredValuesType
    todolistId: string
    removeTodolist:(todolistId:string) => void
}
export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string>('')
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const AddTaskOnKeyPressEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (event.charCode === 13) {
            props.addTask(newTaskTitle, props.todolistId)
            setNewTaskTitle('')
        }
    }
    const addTaskOnClick = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.todolistId)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.todolistId)
    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId)
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }


    return <div>
        <h3>{props.title}
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={AddTaskOnKeyPressEvent}
                   className={error ? 'error' : ""}
            />
            <button onClick={addTaskOnClick}>+</button>
            {
                error &&
                <div className='error-message'>{error}</div>
            }
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    const onRemoveHandler = () => props.removeTask(t.id, props.todolistId)
                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, event.currentTarget.checked, props.todolistId)
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
