import {TasksType} from "../App";
import {v1} from "uuid";

type removeTaskAcType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string
}
type AddTaskAcType = {
    type: "ADD-TASK",
    title: string,
    todolistId: string,
}
type ActionsType = AddTaskAcType | removeTaskAcType

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            const copyState = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            copyState[action.todolistId] = filteredTasks
            return copyState
        }
        case "ADD-TASK" : {
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            copyState[action.todolistId] = newTasks
            return copyState
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): removeTaskAcType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAcType => {
    return {type: "ADD-TASK", title, todolistId}
}
