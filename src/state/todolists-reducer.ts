import {TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type:string,
    [key:string] : any
}

export const todolistsReducer = (state:TodolistsType[] , action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [...state ,  { id: v1(), title: action.payload.title, filter: 'all' }]
        }
        default:
            throw new Error("I don't understand this action type")
    }
}
