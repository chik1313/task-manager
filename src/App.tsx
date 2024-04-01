import React, {useState} from 'react';
import "./App.css"
import {TasksType, Todolist} from "./Todolist";

export type  FilteredValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: "JS", isDone: false},
        {id: 2, title: "TS", isDone: true},
        {id: 3, title: "CSS/HTML", isDone: false}
    ],)
    let [filter, setFilter] = useState<FilteredValuesType>("active")
    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value:FilteredValuesType) => {
        setFilter(value)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className='App'>
            <Todolist
                title={"What to watch"}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
