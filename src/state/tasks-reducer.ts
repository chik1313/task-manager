import {TasksType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, removeTodolistActionType} from "./todolists-reducer";

type removeTaskAcType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string
}
type changeTasksStatusAcType = {
    type: "CHANGE-TASK-STATUS",
    isDone: boolean,
    taskId: string,
    todolistId: string
}

type changeTasksTitleAcType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}

type AddTaskAcType = {
    type: "ADD-TASK",
    title: string,
    todolistId: string,
}
type ActionsType =
    AddTaskAcType
    | removeTaskAcType
    | changeTasksStatusAcType
    | changeTasksTitleAcType
    | addTodolistActionType
    | removeTodolistActionType

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
        case "CHANGE-TASK-STATUS": {
            const copyState = {...state}
            const task = copyState[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = {...state}
            const task = copyState[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return copyState
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
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

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTasksStatusAcType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTasksTitleAcType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}
