import React, {useState} from 'react';
import "./App.css"
import {TasksType, Todolist} from "./Todolist";

function App() {
    let [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: "JS", isDone: false},
        {id: 2, title: "TS", isDone: false},
        {id: 3, title: "CSS/HTML", isDone: false}
    ],)

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    return (
        <div className='App'>
            <Todolist title={"What to watch"} tasks={tasks} removeTask={removeTask}/>

        </div>
    );
}

export default App;
