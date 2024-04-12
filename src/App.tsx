import React, {useState} from 'react';
import "./App.css"
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type  TodolistsType = {
    id: string,
    title: string,
    filter: FilteredValuesType
}
type TasksType = {
    [key: string] : Array<TaskType>
}
export type  FilteredValuesType = "all" | "active" | "completed"

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "TS", isDone: true},
            {id: v1(), title: "CSS/HTML", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Audi RS6", isDone: false},
            {id: v1(), title: "House", isDone: true},

        ]
    });
    const removeTask = (id: string, todolistId: string) => {
        let currentTodolistTasks = tasks[todolistId]
        let filteredTasks = currentTodolistTasks.filter(t => t.id !== id)
        tasks[todolistId] = filteredTasks
        setTasks({...tasks})
    }

    const changeFilter = (value: FilteredValuesType, todolistId: string) => {
        let filterTodolist = todolists.find(tl => tl.id === todolistId)
        if (filterTodolist) {
            filterTodolist.filter = value
            setTodolists([...todolists])
        }
    }
    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let currentTodolistTasks = tasks[todolistId];
        let actualTasks = [newTask, ...currentTodolistTasks];
        tasks[todolistId] = actualTasks
        setTasks({...tasks})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let currentTodolistTasks = tasks[todolistId];
        let task = currentTodolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone

            setTasks({...tasks})
        }
    }

    const changeTaskTitle = (title:string,todolistId:string,taskId:string) => {
        let currentTask = tasks[todolistId].find( t => t.id === taskId)
        if (currentTask) {
            currentTask.title = title
            setTasks({...tasks})
        }
    }
    const changeTodolistTitle = (title:string,todolistId:string) => {
        let currentTodolist = todolists.find( tl => tl.id === todolistId)
        if (currentTodolist) {
            currentTodolist.title = title
            setTodolists([...todolists])
        }
    }
    const removeTodolist = (todolistId: string) => {
        let filteredTodolists = todolists.filter(t => t.id !== todolistId)
        setTodolists(filteredTodolists)
        delete tasks[todolistId]
        setTasks(tasks)
    }
    const addTodolist = (title: string) => {
        const newTodolist: TodolistsType = {id: v1(), title: title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }


    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map((tl) => {
                    let todolistTasks = tasks[tl.id];

                    if (tl.filter === 'active') {
                        todolistTasks = todolistTasks.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        todolistTasks = todolistTasks.filter(t => t.isDone === true)
                    }
                    return <Todolist
                        changeTaskTitle={changeTaskTitle}
                        key={tl.id}
                        removeTodolist={removeTodolist}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={todolistTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })}

        </div>
    );
}

export default App;
