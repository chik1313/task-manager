import {TodolistsType} from "../App";

type ActionType = {
    type:string,
    [key:string] : any
}

export const todolistsReducer = (state:TodolistsType[] , action: ActionType) => {
    switch (action.type) {
        default:
            throw new Error("I don't understand this action type")
    }
}
