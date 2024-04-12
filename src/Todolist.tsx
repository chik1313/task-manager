import React, {ChangeEvent} from "react";
import {FilteredValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import UniversalSpan from "./UniversalSpan";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilteredValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilteredValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (title:string,todolistId:string,taskId:string) => void
    changeTodolistTitle: (title:string,todolistId:string) => void
}
export const Todolist = (props: PropsType) => {
    const onAllClickHandler = () => props.changeFilter('all', props.todolistId)
    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId)
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const changeTodolistTitle = (title:string) => {
        props.changeTodolistTitle(title,props.todolistId)
    }




    return <div>
        <h3><UniversalSpan title={props.title} changeTaskTitleHandler={changeTodolistTitle}/>
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map((t) => {
                    const onRemoveHandler = () => props.removeTask(t.id, props.todolistId)
                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, event.currentTarget.checked, props.todolistId)
                    }
                    const changeTaskTitleHandler = (newTitle:string) => {
                        props.changeTaskTitle(newTitle,props.todolistId,t.id)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeStatusHandler}
                        />
                        <UniversalSpan title={t.title} changeTaskTitleHandler={changeTaskTitleHandler}/>
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
