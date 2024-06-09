import React, {useCallback} from 'react';
import "./App.css"
import {TaskType, Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type  TodolistsType = {
    id: string,
    title: string,
    filter: FilteredValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type  FilteredValuesType = "all" | "active" | "completed"

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

    const changeFilter = useCallback((value: FilteredValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    },[])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    },[])
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)

    },[])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action)

    }, []);

    return (
        <div>
            <AppBar position="statSic">
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
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        removeTodolist={removeTodolist}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
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

export default AppWithRedux;
