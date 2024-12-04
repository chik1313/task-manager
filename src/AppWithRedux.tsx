import React, {useCallback, useEffect, useState} from 'react';
import "./App.css"
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistsTC,
    FilteredValuesType,
    removeTodolistAC,
    TodolistsDomainType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskType} from "./App/api/todolists-api";
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from "redux";

export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const todolists = useSelector<AppRootState, TodolistsDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    },[])

    const changeFilter = useCallback((value: FilteredValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    },[dispatch])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    },[dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)

    },[dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action)

    }, [dispatch]);

    const [jest , setJest] = useState({id:1 , name: 'vlad'})
    setJest(jest.name = "zalupa")
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
