import {v1} from "uuid";
import {todolistsApi, TodolistsType} from "../App/api/todolists-api";
import {Dispatch} from "redux";

export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        todolistId: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilteredValuesType
    }
}
export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistId: string
    }
}
export type setTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistsType[]
}
export type  FilteredValuesType = "all" | "active" | "completed"

export type TodolistsDomainType = TodolistsType & {
    filter: FilteredValuesType
}
type ActionsType =
    | addTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | removeTodolistActionType
    | setTodolistsActionType

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: TodolistsDomainType[] = [
    /*    {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}*/
]

export const todolistsReducer = (state: TodolistsDomainType[] = initialState, action: ActionsType): TodolistsDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl))
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(t => t.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }
        default:
            return state
    }
}

export const addTodolistAC = (title: string): addTodolistActionType => {
    return {type: 'ADD-TODOLIST', payload: {title, todolistId: v1()}}
}
export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', payload: {todolistId}}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, title}}
}
export const changeTodolistFilterAC = (id: string, filter: FilteredValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}}
}
export const setTodolistsAC = (todolists: TodolistsType[]): setTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}



export const fetchTodolistsTC = () => {
    return  (dispatch:Dispatch) => {
        todolistsApi.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
}}