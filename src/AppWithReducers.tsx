import React, {useReducer, useState} from 'react';
import "./App.css"
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type  TodolistsType = {
    id: string,
    title: string,
    filter: FilteredValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type  FilteredValuesType = "all" | "active" | "completed"

function AppWithReducers() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "CSS/HTML", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Audi RS6", isDone: false},
            {id: v1(), title: "House", isDone: false},

        ]
    });
    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    const changeFilter = (value: FilteredValuesType, todolistId: string) => {
        dispatchToTodolistReducer(changeTodolistFilterAC(todolistId,value))
    }
    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchToTasksReducer(action)
    }

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(title, todolistId, taskId))
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatchToTodolistReducer(changeTodolistTitleAC(todolistId, title))
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistReducer(action)
    }
    const addTodolist = (title: string) => {
        dispatchToTodolistReducer(addTodolistAC(title))
        dispatchToTasksReducer(addTodolistAC(title))
    }


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todolists.map((tl) => {
                            let todolistTasks = tasks[tl.id];

                            if (tl.filter === 'active') {
                                todolistTasks = todolistTasks.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                todolistTasks = todolistTasks.filter(t => t.isDone === true)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
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
                                </Paper>
                            </Grid>
                        })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
