import React, {useState} from 'react';
import "./App.css"
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type  FilteredValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "TS", isDone: true},
        {id: v1(), title: "CSS/HTML", isDone: false}
    ],)
    let [filter, setFilter] = useState<FilteredValuesType>("all")
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilteredValuesType) => {
        setFilter(value)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className='App'>
            <Todolist
                title={"What to watch"}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />

        </div>
    );
}

export default App;
