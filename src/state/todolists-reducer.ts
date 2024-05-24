import {FilteredValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title:string
        todolistId: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
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

type ActionsType =
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | removeTodolistActionType


export const todolistsReducer = (state: TodolistsType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}]

        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl))
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', payload: {title, todolistId: v1()}}
}
export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', payload: {todolistId}}
}
